import { 
  Bell, 
  Sparkles, 
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import { useState } from 'react';

const NotificationPage = () => {
      const initialNotifications = [
    { id: 1, title: "Tugas 'Sistem Pakar' Segera Tenggat", message: "Deadline tugas tinggal 2 jam lagi. Segera kumpulkan!", time: "Baru saja", type: "urgent", read: false },
    { id: 2, title: "Perubahan Ruangan Kuliah", message: "Mata kuliah 'Kecerdasan Buatan' hari ini pindah ke Ruang 405 (Gedung B).", time: "1 jam yang lalu", type: "info", read: false },
    { id: 3, title: "Tugas Berhasil Dikumpulkan", message: "Tugas 'Makalah Etika Profesi' berhasil diupload.", time: "3 jam yang lalu", type: "success", read: true },
    { id: 4, title: "Pengingat Jadwal Belajar", message: "AI menyarankan kamu mulai mereview materi 'Basis Data' sekarang untuk persiapan kuis besok.", time: "5 jam yang lalu", type: "warning", read: true },
    { id: 5, title: "Pesan Baru dari Dosen", message: "Pak Handoko: 'Jangan lupa lampirkan referensi jurnal pada tugas akhir.'", time: "Kemarin", type: "message", read: true },
  ];

  const [notifications, _] = useState(initialNotifications);
//   const markAllRead = () => {
//       setNotifications(notifications.map(n => ({ ...n, read: true })));
//     };

    const getIcon = (type) => {
      switch(type) {
        case 'urgent': return <AlertCircle size={20} className="text-rose-500" />;
        case 'success': return <CheckCircle size={20} className="text-emerald-500" />;
        case 'info': return <Info size={20} className="text-blue-500" />;
        case 'message': return <MessageCircle size={20} className="text-violet-500" />;
        default: return <Sparkles size={20} className="text-amber-500" />;
      }
    };

    const getBgColor = (type) => {
      switch(type) {
        case 'urgent': return 'bg-rose-50 border-rose-100';
        case 'success': return 'bg-emerald-50 border-emerald-100';
        case 'info': return 'bg-blue-50 border-blue-100';
        case 'message': return 'bg-violet-50 border-violet-100';
        default: return 'bg-amber-50 border-amber-100';
      }
    };

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              Notifikasi <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">{notifications.filter(n => !n.read).length} Baru</span>
            </h1>
            <p className="text-slate-500 mt-1">Update terbaru seputar kuliah dan tugasmu.</p>
          </div>
        </div>

        <div className="space-y-4 w-full">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`relative p-5 rounded-2xl border transition-all hover:shadow-md cursor-pointer ${
                notif.read ? 'bg-white border-slate-100 opacity-80' : 'bg-white border-indigo-100 shadow-sm ring-1 ring-indigo-50'
              }`}
            >
              {!notif.read && (
                <div className="absolute top-5 right-5 w-2 h-2 bg-rose-500 rounded-full"></div>
              )}
              
              <div className="flex gap-4 items-start">
                <div className={`p-3 rounded-xl shrink-0 ${getBgColor(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1 pr-4">
                    <h3 className={`text-sm font-bold ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-xs text-slate-400 font-medium whitespace-nowrap ml-2">{notif.time}</span>
                  </div>
                  <p className={`text-sm leading-relaxed ${notif.read ? 'text-slate-500' : 'text-slate-600'}`}>
                    {notif.message}
                  </p>
                  
                  {notif.type === 'urgent' && (
                    <div className="mt-3">
                      <button className="text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 px-3 py-1.5 rounded-lg transition-colors">
                        Lihat Tugas
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {notifications.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Bell size={48} className="mx-auto mb-4 opacity-20" />
              <p>Belum ada notifikasi baru.</p>
            </div>
          )}
        </div>
      </div>
    );
}

export default NotificationPage
