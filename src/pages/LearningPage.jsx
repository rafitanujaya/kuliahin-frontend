import { useEffect, useState } from 'react';
import { 

  Plus, 
  Brain, 
  X, 
  Trash2, 
  Edit3,
  FolderPlus,
  CalendarDays
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { createLearningApi, deleteLearningApi, getListLearningApi, updateLearningApi } from '@/api/LearningApi';
import { toast } from 'sonner';

export const LearningPage = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [_, setLoading] = useState(true)

  const [learningRooms, setLearningRooms] = useState([]);
    
    // Form State untuk Room
    const [roomForm, setRoomForm] = useState({
      id: null,
      title: '',
      description: '',
      createdAt: ''
    });

    const convertDate = (isoDate) => {
       return new Date(isoDate).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      })}

    const openAddModal = () => {
      setIsEditing(false);
      const today = new Date();
      const dateString = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })} ${today.getFullYear()}`;
      
      setRoomForm({
        id: null,
        title: '',
        description: '',
        date: dateString
      });
      setIsModalOpen(true);
    };

    const openEditModal = (room) => {
      setIsEditing(true);
      setRoomForm({ ...room });
      setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
      if (window.confirm('Hapus ruang belajar ini beserta isinya?')) {
        try {
          await deleteLearningApi(id)
          toast.success('Berhasil menghapus ruang belajar')
          setLearningRooms(learningRooms.filter(r => r.id !== id));
        } catch {
          toast.error('Gagal menghapus ruang belajar')
        }
      }
    };

    const handleSave = async (e) => {
      e.preventDefault();

      const payload = {
        title: roomForm.title,
        description: roomForm.description,
      }

      try {
        if (isEditing) {
          payload.id = roomForm.id
          await updateLearningApi(payload.id, payload);

          const data  = {
            id: payload.id,
            title: payload.title,
            description: payload.description,
            createdAt: convertDate(roomForm.createdAt)
          }

          setLearningRooms(prev => prev.map(r => r.id === payload.id ? data : r))
          toast.success('Ruang Belajar Berhasil Diubah')
        } else {
          const data = await createLearningApi(payload)
          setLearningRooms(prev => [{
            id: data.data.id,
            title: data.data.title,
            description: data.data.description,
            createdAt: convertDate(new Date())
          }, ...prev])
          toast.success('Ruang Belajar Berhasil Dibuat')
        }
        setIsModalOpen(false);
      } catch {
        toast.error('Gagal menyimpan ruang belajar')
      }
    };

    const loadLearningRoom = async () => {
      try {
        setLoading(true)
        const data = await getListLearningApi();
        setLearningRooms(data.data.map(d => ({
          id: d.id,
          title: d.title,
          description: d.description,
          createdAt: convertDate(d.created_at)
        })))
      } catch {
        toast.error('Gagal Memuat Ruang Belajar')
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      loadLearningRoom()
    },[])


  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Ruang Belajar</h1>
            <p className="text-slate-500 mt-1">Kelola topik pembelajaranmu dalam satu tempat yang terstruktur.</p>
          </div>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
          >
            <FolderPlus size={18} /> Buat Ruang Baru
          </button>
        </div>

        {/* AI Insight Banner */}
        <div className="mb-8 p-5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl text-white shadow-lg relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative z-10">
             <div className="flex items-center gap-2 mb-2 text-indigo-100 text-xs font-semibold uppercase tracking-wider">
               <Brain size={14} /> AI Learning Insight
             </div>
             <p className="font-medium text-sm md:text-base leading-relaxed">
               "Dalam Tahap Pengembangan"
             </p>
          </div>
          <button disabled={true} className="disabled:cursor-not-allowed relative z-10 whitespace-nowrap bg-white text-indigo-600 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors shadow-sm">
            Cek Progres
          </button>
          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full translate-x-1/4 -translate-y-1/2 blur-3xl"></div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningRooms.map((room) => (
            <div key={room.id} onClick={() => navigate(`/learning/${room.id}`)} className="group flex flex-col bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 relative">
              
              {/* Action Buttons */}
              <div className="absolute top-5 right-5 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    openEditModal(room)
                  }}
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Edit3 size={16} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(room.id)
                  }}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 mb-3 pr-16 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {room.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">
                  {room.description}
                </p>
              </div>
              
              <div className="mt-auto pt-4 border-t border-slate-50 flex items-center gap-2 text-xs font-medium text-slate-400">
                <CalendarDays size={14} />
                <span>Dibuat pada {room.createdAt}</span>
              </div>
            </div>
          ))}

          {/* Empty State / Add New Card Placeholder */}
          <button 
            onClick={openAddModal}
            className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all text-slate-400 hover:text-indigo-500 min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-white transition-colors">
              <Plus size={24} />
            </div>
            <span className="text-sm font-semibold">Tambah Ruang Belajar</span>
          </button>
        </div>

        {/* Modal Create/Edit */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-800">{isEditing ? 'Edit Ruang' : 'Buat Ruang Belajar'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Judul Ruang / Topik</label>
                  <input 
                    required
                    type="text" 
                    value={roomForm.title}
                    onChange={(e) => setRoomForm({...roomForm, title: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                    placeholder="Contoh: Skripsi Bab 1"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Deskripsi Singkat</label>
                  <textarea 
                    required
                    rows="4"
                    value={roomForm.description}
                    onChange={(e) => setRoomForm({...roomForm, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                    placeholder="Jelaskan tujuan ruang belajar ini..."
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors">
                    {isEditing ? 'Simpan Perubahan' : 'Buat Ruang'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
  )
}

    // const initialRooms = [
    //     { id: 1, title: "Persiapan UAS Kecerdasan Buatan", description: "Kumpulan materi, ringkasan jurnal, dan catatan latihan soal untuk persiapan ujian akhir.", date: "12 Okt 2025" },
    //     { id: 2, title: "Skripsi - Bab 1 & 2", description: "Drafting latar belakang masalah, rumusan masalah, dan tinjauan pustaka terkait Sistem Pakar.", date: "10 Okt 2025" },
    //     { id: 3, title: "Proyek Pemrograman Web", description: "Dokumentasi API, desain database, dan progress frontend untuk tugas besar akhir semester.", date: "05 Okt 2025" },
    // ];