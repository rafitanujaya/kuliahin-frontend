import {
  LayoutGrid,
  CalendarRange,
  ListTodo,
  Library,
  Settings,
  LogOut,
  Bell,
  Book,
  PieChart,
} from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarItem } from "../components/SidebarItem";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

const AppLayout = () => {
  const navigate = useNavigate();

  const {user, logout, refreshUser} = useUser()

  useEffect(() => {
    refreshUser()
  }, [])

  const handleLogout = () => {
    logout();         
    navigate("/login");   
};

  return (
    <div className="h-dvh w-full bg-slate-100 flex">
      {/* SIDEBAR */}
      <aside className="w-64 h-full bg-white border-r border-gray-300 p-4 flex flex-col justify-between">
        {/* TOP */}
        <div>
          {/* LOGO */}
          <div className="flex justify-center items-center gap-2.5">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              Kuliah<span className="text-indigo-500">In</span>
            </span>
          </div>

          <div className="h-px border border-gray-200 my-4" />

          <nav className="flex-1 py-6 overflow-y-auto">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
            
            <SidebarItem icon={LayoutGrid} label="Dashboard" to="/dashboard" />
            <SidebarItem icon={CalendarRange} label="Jadwal Kuliah" to="/jadwal" />
            <SidebarItem icon={Book} label="Tugas" to="/tugas" />
            <SidebarItem icon={ListTodo} label="Todo" to="/todo" />
            <SidebarItem icon={Library} label="Ruang Belajar" to="/learning" />
            {/* <SidebarItem icon={Bell} label="Notifikasi" to="/notifikasi" /> */}
            <SidebarItem icon={Settings} label="Pengaturan" to="/pengaturan" />
            
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6">Analytics</p>
            <SidebarItem icon={PieChart} label="statistik" to="/statistik" />
        </nav>
        </div>

        {/* BOTTOM */}
        <div className="space-y-3">
          <div className="h-px border border-gray-200" />

          {/* PROFILE */}
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 cursor-pointer">
            <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-md">
              {user?.avatarInitial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-slate-900 capitalize truncate">
                {user?.fullname}
              </div>
              <div className="text-xs text-slate-500 truncate">
                {user?.major || '-'}
              </div>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-colors p-1">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet  />
      </main>
    </div>
  );
};

export default AppLayout;
