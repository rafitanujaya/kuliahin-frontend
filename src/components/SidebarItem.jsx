import { Link, useLocation } from "react-router-dom";

export const SidebarItem = ({ icon: Icon, label, to}) => {
  const { pathname } = useLocation();
  const isActive = pathname === to || pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      className={`flex items-center w-full px-4 py-3 mb-1 rounded-lg transition-all duration-200 group ${
        isActive 
          ? 'bg-indigo-50 text-indigo-700 font-medium' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon size={20} className={`mr-3 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
      <span>{label}</span>
    </Link>
  );
}
