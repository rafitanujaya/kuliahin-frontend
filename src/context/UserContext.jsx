import { createContext, useEffect, useState } from "react"
import { getProfileApi } from "@/api/userApi"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await getProfileApi()
      console.log(res);
      setUser(res.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  )
}


export {
    UserContext,
}