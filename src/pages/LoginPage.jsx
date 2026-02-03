import { loginApi } from "@/api/authApi";
import { ENV } from "@/config";
import { sleep } from "@/utils/sleep";
import { Lock, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorForm, setErrorForm] = useState({});
  const [rememberEmail, setRememberEmail] = useState(false)
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem('remember_email')

    if (savedEmail) {
      setEmail(savedEmail)
      setRememberEmail(true)
    }

    inputRef.current.focus()
  }, [])

    useEffect(() => {
        const error = searchParams.get("error");

        if (error === "email") {
            queueMicrotask(() => {
              toast.error(
                "Email sudah terdaftar, silakan login dengan email & password",
                { position: "top-center" }
              );
            });
          navigate("/login", { replace: true });
        }
        
    }, []);

  function handleChange(setter, field) {
    return (e) => {
      setter(e.target.value);
      setErrorForm((prev) => ({ ...prev, [field]: null }));
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {}

    if(!email.trim()) {
      errors.email = 'Email Wajib diisi'
    } else if(!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Format email tidak valid'
    }

    if(!password) {
      errors.password = 'Password Wajib diisi'
    } else if (password.length < 8) {
      errors.password = 'Password minimal 8 karakter'
    }

    if(Object.keys(errors).length > 0) {
      setErrorForm(errors)
      return
    }

    setLoading(true)

    try {
      await sleep(1000)
      const data = await loginApi({email, password});
      localStorage.setItem('token', data.data.token)
      if (rememberEmail) {
        localStorage.setItem('remember_email', email)
      } else {
        localStorage.removeItem('remember_email')
      }

      toast.success('Berhasil Masuk', {
        position: 'top-center',
        duration: 1200,
        onAutoClose: () => navigate('/dashboard'),
      });

    } catch (error) {
      if(error.status == 404){
        toast.error('Email atau Password salah',
          { position: 'top-center'}
        )
        return
      }
      toast.error('Gagal Masuk',
          { position: 'top-center'}
        )
      return
    } finally {
      setLoading(false)
    }

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md  p-12 rounded-2xl border border-slate-200 bg-white">
        <h1 className="text-xl font-semibold mb-2">
          Kuliah<span className="text-indigo-500">In</span>
        </h1>
        <h2 className="text-3xl mb-1 font-semibold">Selamat datang kembali </h2>
        <p className="text-sm mb-5 text-gray-600">
          Masuk untuk melanjutkan progress belajar kamu hari ini
        </p>

        <button
          type="button" onClick={() => window.location.href = `${ENV.API_BASE_URL}auth/google`}
          className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Google
        </button>

        <div className="h-px border my-6 mx-2 border-slate-200 relative">
          <span className="bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 text-sm text-slate-500 truncate">
            atau masuk dengan email
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3" action="">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${errorForm.email ? 'text-red-500' : 'text-gray-400'}`}></Mail>
              <input
                id="email"
                ref={inputRef}
                value={email}
                onChange={handleChange(setEmail, 'email')}
                type="text"
                placeholder="example@gmail.com"
                className={`w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 ${errorForm.email ? 'border-red-500 focus:ring-red-200 bg-red-50 text-red-500' : 'focus:border-indigo-500 border-gray-300 focus:ring-indigo-500/20'} `}
              />
            </div>
            {errorForm.email && (<p className="mt-1 text-xs text-red-500">{errorForm.email}</p>)}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${errorForm.password ? 'text-red-500' : 'text-gray-400'}`}></Lock>
              <input
              id="password"
                type="password"
                value={password}
                onChange={handleChange(setPassword, 'password')}
                placeholder="password"
                className={`w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 ${errorForm.password ? 'border-red-500 focus:ring-red-200 bg-red-50 text-red-500' : 'focus:border-indigo-500 border-gray-300 focus:ring-indigo-500/20'} `}
              />
            </div>
            {errorForm.password && (<p className="mt-1 text-xs text-red-500">{errorForm.password}</p>)}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                checked={rememberEmail}
                onChange={(e) => setRememberEmail(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              Ingat saya
            </label>

            <Link
              to="/forgot-password"
              className="text-indigo-600 hover:underline"
            >
              Lupa password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-white  ${loading ? 'cursor-not-allowed bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'}`}
          >
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
