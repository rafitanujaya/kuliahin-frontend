import { useEffect, useState } from 'react';
import { 
  Plus, 
  X, 
  Trash2, 
  Edit3,
  CalendarDays,
  Briefcase,
  CalendarClock,
  CheckCircle2,
} from 'lucide-react';
import { createTaskApi, deleteTaskApi, getListTaskApi, updateTaskApi } from '@/api/taskApi';
import { toast } from 'sonner';
import { getListCourseApi } from '@/api/courseApi';

export const TaskPage = () => {
    const [filterStatus, setFilterStatus] = useState('todo'); // pending, completed

    // Mock Data Tugas
    const [tasks, setTasks] = useState([]);
    const [courses, setCourses] = useState([])
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [newTask, setNewTask] = useState({
       title: '', 
       subject: '', 
       deadline: '', 
       priority: 'medium', 
       courseId: '',
       description: '',
       type: 'individu'
    });

    // Logic Create & Update
    const openAddModal = () => {
      setNewTask({
       title: '',
       subject: '', 
       courseId: '',
       deadline: '', 
       priority: 'medium', 
       description: '',
       type: 'individu' 
      })

      setIsModalOpen(true)
      setIsEditing(false)
    };

    const openEditModal = (task) => {
    setIsEditing(true)
    const course = courses.find(t => t.name == task.matkul);
    task = {
      ...task,
      courseId: course.id
    }
    setCurrentTaskId(task.id)
    task.deadline = task.deadline?.slice(0, 16)
    setNewTask(task)
    setIsModalOpen(true)
  }

    const handleSaveTask = async (e) => {
      e.preventDefault();

      const payload = {
        title: newTask.title, 
        courseId: newTask.courseId, 
        deadline: newTask.deadline, 
        priority: newTask.priority, 
        description: newTask.description,
        type: newTask.type
      }
      try {
        if(isEditing) {
          const taskEdit = tasks.find(task => task.id == currentTaskId)
          payload.status = taskEdit.status
          const updated = await updateTaskApi(currentTaskId, payload)
          setTasks((prev) =>
            prev.map((t) => (t.id === currentTaskId ? updated.data : t))
          )
          toast.success('Tugas diperbarui')
        } else {
          payload.status = 'todo'
          let task = await createTaskApi(payload)
          const course = courses.find(t => t.id == task.data.courseId);
          task.data = {
            ...task.data,
            matkul: course.name
          }
          setTasks((prev) => [task.data, ...prev])
          toast.success('Tugas berhasil dibuat')
        }
        setIsModalOpen(false)
      } catch(err) {
        console.log(err);
        toast.error('Gagal menyimpan tugas')
      }
    };

    const toggleStatus = async (task) => {
      const newStatus = task.status === 'todo' ? 'done' : 'todo'
      console.log(task);
      const course = courses.find(t => t.name == task.matkul);

      const payload = {
        title: task.title, 
        courseId: course.id, 
        deadline: task.deadline, 
        priority: task.priority, 
        description: task.description,
        status: newStatus,
        type: task.type
      }

      try {
        const updated = await updateTaskApi(task.id, payload)
        setTasks((prev) =>
          prev.map((t) =>
            t.id === task.id
              ? {
                  ...updated.data,
                  matkul: task.matkul // ⬅️ WAJIB dipertahankan
                }
              : t
          )
        )
      } catch {
        toast.error('Gagal update status')
      }
    };

    const handleDelete = async (id) => {
      if (!confirm('Hapus tugas ini?')) return

      try {
        await deleteTaskApi(id)
        setTasks((prev) => prev.filter((t) => t.id !== id))
        toast.success('Tugas dihapus')
      } catch {
        toast.error('Gagal menghapus tugas')
      }
    };

    const getDaysLeft = (deadline) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset jam agar hitungan hari akurat
      const due = new Date(deadline);
      due.setHours(0, 0, 0, 0);
      
      const diffTime = due.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays;
    };

    const getPriorityColor = (p) => {
      if (p === 'high') return 'text-rose-600 bg-rose-50 border-rose-100';
      if (p === 'medium') return 'text-amber-600 bg-amber-50 border-amber-100';
      return 'text-blue-600 bg-blue-50 border-blue-100';
    };

    // Helper untuk style badge deadline
    const getDeadlineStyle = (daysLeft) => {
      if (daysLeft < 0) return 'bg-rose-100 text-rose-700 border-rose-200'; // Terlambat
      if (daysLeft === 0) return 'bg-orange-100 text-orange-700 border-orange-200'; // Hari ini
      if (daysLeft <= 3) return 'bg-amber-100 text-amber-700 border-amber-200'; // Mendesak (<= 3 hari)
      return 'bg-emerald-50 text-emerald-600 border-emerald-200'; // Aman (> 3 hari)
    };

    const handleChange = (field, value) => (e) => {
      if(field == 'type') {
        setNewTask({ ...newTask, [field]: value })
        setErrors((prev) => ({ ...prev, [field]: null }))
      } else {
        setNewTask({ ...newTask, [field]: e.target.value })
        setErrors((prev) => ({ ...prev, [field]: null }))
      }
    }

    const loadTasks = async () => {
      try {
        setLoading(true)
        const data = await getListTaskApi();
        const course = await getListCourseApi();
        setTasks(data.data)
        setCourses(course.data)
      } catch {
        toast.error('Gagal Memuat Tugas Kuliah', {position:'top-center'})
      } finally {
        setLoading(false)
      }
    }

    const convertDate = (isoDate) => {
       return new Date(isoDate).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      })}

    useEffect(() => {
      loadTasks()
    }, [])
    console.log(tasks);

    const filteredTasks = tasks.filter(t => t.status === filterStatus);
    console.log(filteredTasks);
  return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Tugas Kuliah</h1>
            <p className="text-slate-500 mt-1">Pantau deadline dan prioritas tugas akademikmu.</p>
          </div>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
          >
            <Plus size={18} /> Tambah Tugas
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6 border-b border-slate-200 pb-1">
          <button 
            onClick={() => setFilterStatus('todo')}
            className={`pb-3 px-2 text-sm font-bold transition-all relative ${filterStatus === 'todo' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Belum Selesai ({tasks.filter(t => t.status === 'todo').length})
            {filterStatus === 'pending' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full"></span>}
          </button>
          <button 
            onClick={() => setFilterStatus('done')}
            className={`pb-3 px-2 text-sm font-bold transition-all relative ${filterStatus === 'done' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Selesai ({tasks.filter(t => t.status === 'done').length})
            {filterStatus === 'completed' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full"></span>}
          </button>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks.map((task) => {
            console.log(task);
            const daysLeft = getDaysLeft(task.deadline);
            const isLate = daysLeft < 0;

            return (
              <div key={task.id} className={`group bg-white p-5 rounded-2xl border transition-all hover:shadow-md flex flex-col sm:flex-row gap-4 ${task.status === 'done' ? 'border-slate-100 opacity-60' : 'border-slate-100 hover:border-indigo-200'}`}>
                
                {/* Status Checkbox Area */}
                <button 
                  onClick={() => toggleStatus(task)}
                  className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                    task.status === 'done' 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : 'border-slate-300 hover:border-indigo-500 text-transparent'
                  }`}
                >
                  <CheckCircle2 size={14} fill="currentColor" />
                </button>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                         <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{task.matkul}</span>
                         <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getPriorityColor(task.priority)}`}>
                           {task.priority}
                         </span>
                      </div>
                      <h3 className={`text-lg font-bold ${task.status === 'done' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                        {task.title}
                      </h3>
                    </div>
                    
                    {/* Deadline Badge - Diperbarui */}
                    <div className='flex gap-4'>
                      <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border bg-slate-100 text-slate-700 border-slate-200'>{task.type}</div>
                    {task.status !== 'done' && (
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${getDeadlineStyle(daysLeft)}`}>
                         <CalendarClock size={14} />
                         {isLate ? `Terlambat ${Math.abs(daysLeft)} hari` : 
                          daysLeft === 0 ? 'Hari ini!' : 
                          daysLeft <= 3 ? `${daysLeft} hari lagi` : 
                          `Sisa ${daysLeft} hari`}
                       </div>
                    )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{task.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <CalendarDays size={14} />
                      Deadline: {convertDate(task.deadline)}
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* Tombol Edit Baru */}
                      <button 
                        onClick={() => openEditModal(task)}
                        className="text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg transition-colors"
                        title="Edit Tugas"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(task.id)} 
                        className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition-colors"
                        title="Hapus Tugas"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredTasks.length === 0 && (
             <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                 <Briefcase size={24} />
               </div>
               <p className="text-slate-500 font-medium">Tidak ada tugas dengan status ini.</p>
             </div>
          )}
        </div>

        {/* Modal Add/Edit Task */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
               <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-800">{isEditing ? 'Edit Tugas' : 'Tambah Tugas Baru'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSaveTask} className="p-6 space-y-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Judul Tugas</label>
                    <input required type="text" className="w-full px-4 py-2 border rounded-xl text-sm" placeholder="Contoh: Makalah AI" 
                      value={newTask.title} onChange={handleChange('title')} />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Mata Kuliah</label>
                    <select className="w-full px-4 py-2 border rounded-xl text-sm" value={newTask.courseId} onChange={handleChange('courseId')}>
                          <option value="" disabled>
                            Pilih mata kuliah
                          </option>
                          {courses.map((course) => (<option value={course.id} className='capitalize'>{course.name}</option>))}
                      </select>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Deadline</label>
                      <input required type="datetime-local" className="w-full px-4 py-2 border rounded-xl text-sm"
                         value={newTask.deadline} onChange={handleChange('deadline')} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Prioritas</label>
                      <select className="w-full px-4 py-2 border rounded-xl text-sm"
                         value={newTask.priority} onChange={handleChange('priority')}>
                         <option value="low">Low</option>
                         <option value="medium">Medium</option>
                         <option value="high">High</option>
                      </select>
                    </div>
                 </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">
                      Jenis Tugas
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      {/* INDIVIDU */}
                      <label
                        className={`flex w-full items-center gap-3 px-4 py-4 rounded-xl border cursor-pointer transition-all
                          ${newTask.type === 'individual'
                            ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                        `}
                      >
                        <input
                          type="radio"
                          name="taskType"
                          value="individu"
                          checked={newTask.type === 'individu'}
                          onChange={handleChange('type', 'individu')}
                          className="hidden"
                        />

                        <span
                          className={`w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center
                            ${newTask.type === 'individu'
                              ? 'border-indigo-600'
                              : 'border-slate-300'}
                          `}
                        >
                          {newTask.type === 'individu' && (
                            <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                          )}
                        </span>

                        <span className="text-sm font-semibold text-slate-700">
                          Individu
                        </span>
                      </label>

                      {/* KELOMPOK */}
                      <label
                        className={`flex w-full items-center gap-3 px-4 py-4 rounded-xl border cursor-pointer transition-all
                          ${newTask.type === 'group'
                            ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                        `}
                      >
                        <input
                          type="radio"
                          name="taskType"
                          value="kelompok"
                          checked={newTask.type === 'kelompok'}
                          onChange={handleChange('type', 'kelompok')}
                          className="hidden"
                        />

                        <span
                          className={`w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center
                            ${newTask.type === 'kelompok'
                              ? 'border-indigo-600'
                              : 'border-slate-300'}
                          `}
                        >
                          {newTask.type === 'kelompok' && (
                            <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                          )}
                        </span>

                        <span className="text-sm font-semibold text-slate-700">
                          Kelompok
                        </span>
                      </label>
                    </div>
                  </div>


                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Deskripsi / Catatan</label>
                    <textarea className="w-full px-4 py-2 border rounded-xl text-sm h-24 resize-none" placeholder="Detail tugas..."
                       value={newTask.description} onChange={handleChange('description')}></textarea>
                 </div>
                 <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                   {isEditing ? 'Simpan Perubahan' : 'Buat Tugas'}
                 </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
}


// [
//       { id: 1, title: "Makalah Sistem Pakar", subject: "Kecerdasan Buatan", deadline: "2025-10-20", priority: "high", status: "pending", description: "Analisis studi kasus diagnosis penyakit." },
//       { id: 2, title: "Revisi Bab 1 Skripsi", subject: "Metodologi Penelitian", deadline: "2025-10-18", priority: "high", status: "pending", description: "Perbaiki latar belakang masalah sesuai catatan dosen." },
//       { id: 3, title: "Presentasi Kelompok", subject: "Etika Profesi", deadline: "2026-10-25", priority: "medium", status: "pending", description: "Siapkan slide ppt minimal 10 halaman." }, // Deadline lama (Aman)
//       { id: 4, title: "Latihan Query SQL", subject: "Basis Data II", deadline: "2025-10-15", priority: "low", status: "completed", description: "Kerjakan modul bab 4." },
//       { id: 5, title: "Proyek Akhir Semester", subject: "Pemrograman Web", deadline: "2025-11-30", priority: "high", status: "pending", description: "Membuat aplikasi Fullstack dengan React." }, // Deadline lama (Aman)
//     ]