import { ChevronRight, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CommingSoonPage = ({ title }) => {
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-300 shadow-sm border border-indigo-100">
                <LayoutDashboard size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Halaman {title}</h2>
            <p className="text-gray-500 max-w-md leading-relaxed">
                Fitur ini sedang dalam pengembangan oleh tim Kuliahin.
            </p>
            <button 
                onClick={() => navigate('/learning')}
                className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2"
            >
                Ke Ruang Belajar <ChevronRight size={16}/>
            </button>
        </div>
    );
}
