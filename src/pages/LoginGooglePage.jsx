import { useUser } from "@/hooks/useUser";
import { decodeJWT } from "@/utils/jwt";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const LoginGooglePage = () => {
   const [params] = useSearchParams();
    const navigate = useNavigate();
    const {setUser} = useUser()

    useEffect(() => {
        const token = params.get('token');
        if(token) {
            localStorage.setItem('token', token);
            const payload = decodeJWT(token);
            setUser(payload)
            navigate("/dashboard", { replace: true });
        } else {
            navigate("/login", { replace: true });
        }
    }, [])

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-600">Menyambungkan akun kamu...</p>
    </div>
  )
}
