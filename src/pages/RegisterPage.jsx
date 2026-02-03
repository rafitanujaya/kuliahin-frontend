import { registerApi } from "@/api/authApi";
import { sleep } from "@/utils/sleep";
import { Lock, Mail, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisterPage = () => {

  const navigate = useNavigate();

  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorForm, setErrorForm] = useState({});
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  function handleChange(setter, field) {
    return (e) => {
      setter(e.target.value)
      setErrorForm((prev) => ({ ...prev, [field]: null }))
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorForm({})

    const errors = {}

    if(!fullname.trim()) {
      errors.fullname = 'Nama Lengkap Wajib diisi'
    }

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

    if(!confirmPassword) {
      errors.confirmPassword = 'konfirmasi password Wajib diisi'
    } else if ( password != confirmPassword) {
      errors.confirmPassword = 'Password tidak sama'
    }

    if (Object.keys(errors).length > 0) {
      setErrorForm(errors)
      return
    }
    setLoading(true)

    try {
      await sleep(1000)
      await registerApi({fullname, password, email});
      toast.success('Berhasil Mendaftarkan Akun', {
        position: 'top-center',
        duration: 1200,
        onAutoClose: () => navigate('/login'),
      });
    } catch (err){
      if(err.data?.errors.includes('Email Already Exists')) {
        errors.email = 'Email Sudah Digunakan'
        setErrorForm(errors)
      }
      toast.error('Gagal Mendaftarkan Akun',
        { position: 'top-center'}
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md  p-8 rounded-2xl border border-slate-200 bg-white">
        <h1 className="text-xl font-semibold mb-2">
          Kuliah<span className="text-indigo-500">In</span>
        </h1>
        <h2 className="text-3xl mb-1 font-semibold">Buat akun baru </h2>
        <p className="text-sm mb-5 text-gray-600">
          Gabung sekarang dan rasakan kemudahan kuliah dengan bantuan AI.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3" action="">
          <div>
            <label
              htmlFor="fullname"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Nama Lengkap
            </label>
            <div className="relative">
              <User className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${errorForm.fullname ? 'text-red-500' : 'text-gray-400'}`} ></User>
              <input
                id="fullname"
                ref={inputRef}
                type="text"
                value={fullname}
                onChange={handleChange(setFullname, 'fullname')}
                placeholder="jhon due"
                className={`w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 ${errorForm.fullname ? 'border-red-500 focus:ring-red-200 bg-red-50 text-red-500' : 'focus:border-indigo-500 border-gray-300 focus:ring-indigo-500/20'} `}
              />
            </div>
            {errorForm.fullname && (<p className="mt-1 text-xs text-red-500">{errorForm.fullname}</p>)}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${errorForm.email ? 'text-red-500' : 'text-gray-400'} `}></Mail>
              <input
                id="email"
                type="text"
                value={email}
                onChange={handleChange(setEmail, 'email')}
                placeholder="example@gmail.com"
                className={`w-full rounded-xl border  py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 ${errorForm.email ? 'border-red-500 focus:ring-red-200 bg-red-50 text-red-500' : 'focus:border-indigo-500 border-gray-300 focus:ring-indigo-500/20 '} `}
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
                value={password}
                onChange={handleChange(setPassword, 'password')}
                type="password"
                placeholder="password"
                className={`w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 ${errorForm.password ? 'border-red-500 focus:ring-red-200 bg-red-50 text-red-500' : 'focus:border-indigo-500 border-gray-300 focus:ring-indigo-500/20'} `}
              />
            </div>
            {errorForm.password && (<p className="mt-1 text-xs text-red-500">{errorForm.password}</p>)}

          </div>

          <div>
            <label
              htmlFor="confirm"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Konfirmasi Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${errorForm.confirmPassword ? 'text-red-500' : 'text-gray-400'}`}></Lock>
              <input
                id="confirm"
                type="password"
                value={confirmPassword}
                onChange={handleChange(setConfirmPassword, 'confirmPassword')}
                placeholder="konfirmasi password"
                className={`w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 ${errorForm.confirmPassword ? 'border-red-500 focus:ring-red-200 bg-red-50 text-red-500' : 'focus:border-indigo-500 border-gray-300 focus:ring-indigo-500/20'} `}
              />
            </div>
            {errorForm.confirmPassword && (<p className="mt-1 text-xs text-red-500">{errorForm.confirmPassword}</p>)}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-white  ${loading ? 'cursor-not-allowed bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'}`}
          >
            {loading ? 'Mendaftarkan...' : 'Daftar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
