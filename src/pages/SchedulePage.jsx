import { useEffect, useMemo, useState } from "react";
import { 
  Calendar, 
  MapPin, 
  Plus, 
  X, 
  User, 
  GraduationCap, 
  Trash2, 
  Edit3
} from 'lucide-react';
import { createScheduleApi, deleteScheduleApi, getListScheduleApi, updateScheduleApi } from "@/api/scheduleApi";
import { toast } from "sonner";

const SchedulePage = () => {

    // State untuk Jadwal yang bisa diedit
    const [scheduleData, setScheduleData] = useState([]);

    const [selectedDay, setSelectedDay] = useState('senin');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({})
    const days = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];


    const groupedSchedule = useMemo(() => {
    return scheduleData.reduce((acc, item) => {
      if (!acc[item.day]) acc[item.day] = [];
      acc[item.day].push(item);
      acc[item.day].sort((a, b) =>
        a.startTime.localeCompare(b.startTime)
      );
      return acc;
    }, {});
  }, [scheduleData]);

    // Form State
    const [formData, setFormData] = useState({
       id: null,
       courseId: '',
       day: 'senin',
       subject: '',
       startTime: '',
       endTime: '',
       type: 'teori',
       room: '', 
       lecturer: '', 
       sks: 2, 
      });

    const openAddModal = () => {
      setIsModalOpen(true)
    };

    const openEditModal = (item) => {
      setIsEditing(true)
      const payload = {
        id: item.id,
        courseId: item.course.id,
        subject: item.course.name,
        day: item.day,
        startTime: item.startTime,
        endTime: item.endTime,
        type: item.course.type,
        room: item.location,
        lecturer: item.course.lecturer,
        sks: item.course.sks,
      }
      console.log(payload);
      setFormData(payload)
      setIsModalOpen(true)

    };

    const handleDelete = async (id) => {
      if (window.confirm('Yakin ingin menghapus jadwal ini?')) {
        await deleteScheduleApi(id)
        toast.success('Berhasil Menghapus Jadwal', { position: 'bottom-right'})
        setScheduleData(prev => prev.filter(item => item.id !== id))
      }
    };


    const handleSave = async (e) => {
      e.preventDefault();

      const errors = {}

  // Subject
      if (!formData.subject.trim()) {
        errors.subject = 'Mata kuliah wajib diisi'
      } else if (formData.subject.trim().length < 2) {
        errors.subject = 'Minimal 2 karakter'
      }

      // Lecturer
      if (!formData.lecturer.trim()) {
        errors.lecturer = 'Nama dosen wajib diisi'
      } else if (formData.lecturer.trim().length < 2) {
        errors.lecturer = 'Minimal 2 karakter'
      }

      // Room / Location
      if (!formData.room.trim()) {
        errors.room = 'Lokasi wajib diisi'
      } else if (formData.room.trim().length < 2) {
        errors.room = 'Minimal 2 karakter'
      }

      // SKS
      if (!formData.sks) {
        errors.sks = 'SKS wajib diisi'
      } else if (Number(formData.sks) < 1) {
        errors.sks = 'Minimal 1 SKS'
      }

      // Time
      if (!formData.startTime) {
        errors.startTime = 'Jam mulai wajib diisi'
      }

      if (!formData.endTime) {
        errors.endTime = 'Jam selesai wajib diisi'
      }

      if (formData.startTime && formData.endTime) {
        if (formData.startTime >= formData.endTime) {
          errors.time = 'Jam mulai harus lebih kecil dari jam selesai'
        }
      }

      if (Object.keys(errors).length > 0) {
        setErrors(errors)
        return
      }


      const payload = {
        name: formData.subject,
        day: formData.day,
        startTime: formData.startTime,
        endTime: formData.endTime,
        type: formData.type,
        location: formData.room,
        lecturer: formData.lecturer,
        sks: Number(formData.sks),
      }

      try {
        if (isEditing) {
          payload.courseId = formData.courseId
          const data = await updateScheduleApi(formData.id, payload)
          setScheduleData(prev =>
            prev.map(item => item.id === formData.id ? data.data : item)
          )
          toast.success('Berhasil Mengedit Jadwal Kuliah')
        } else {
          const newData = await createScheduleApi(payload)
          setScheduleData(prev => [...prev, newData.data])
          toast.success('Berhasil Membuat Jadwal Kuliah')
        }

        setIsModalOpen(false)
        setSelectedDay(formData.day)

      } catch {
        toast.error('Gagal menyimpan jadwal')
      }
    };

    const handleChange = (field) => (e) => {
      setFormData({ ...formData, [field]: e.target.value })
      setErrors((prev) => ({ ...prev, [field]: null, time: null }))
    }


    const loadSchedules = async () => {
      try {
        setLoading(true)
        const data = await getListScheduleApi();
        setScheduleData(data.data)
      } catch {
        toast.error('Gagal Memuat Jadwal',
          {
            position: 'top-center'
          }
        )
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      loadSchedules()
    }, [])

    const todaySchedules = groupedSchedule[selectedDay] || [];


  return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 p-8">
        {/* Header Jadwal */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Jadwal Kuliah</h1>
            <p className="text-slate-500 mt-1">Kelola jadwal perkuliahanmu disini.</p>
          </div>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
          >
            <Plus size={18} /> Tambah Jadwal
          </button>
        </div>

        {/* Day Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-4 gap-2 no-scrollbar">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                selectedDay === day
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule Grid */}
        <div className="space-y-4">
          {todaySchedules?.length > 0 ? (
            todaySchedules.map((item) => (
              <div key={item.id} className="group relative bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all">
                
                {/* Action Buttons (Hover only) */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => openEditModal(item)}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Time Column */}
                  <div className="pr-6 sm:border-r border-slate-100 flex flex-col justify-center min-w-30">
                     <span className="text-xl font-bold text-slate-800">{item.startTime}</span>
                     <span className="text-xs text-slate-400 font-medium mt-1">Selesai {item.endTime}</span>
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2 pr-16">
                      <h3 className="text-lg font-bold text-slate-800">{item.course.name}</h3>
                      <div className={`px-3 mr-4 py-1 rounded-lg text-xs font-bold border ${item.color} bg-indigo-50 text-indigo-700 border-indigo-100`}>
                        {item.course.type}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <User size={16} className="text-slate-400"/>
                        {item.course.lecturer}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={16} className="text-slate-400"/>
                        {item.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <GraduationCap size={16} className="text-slate-400"/>
                        {item.course.sks} SKS
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Calendar size={32} className="text-slate-300" />
              </div>
              <h3 className="text-slate-900 font-semibold text-lg">Jadwal Kosong</h3>
              <p className="text-slate-500 text-sm mt-1 mb-4">Belum ada mata kuliah di hari ini.</p>
              <button onClick={openAddModal} className="text-indigo-600 font-semibold text-sm hover:underline">
                + Tambah Jadwal Baru
              </button>
            </div>
          )}
        </div>

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-slate-800">{isEditing ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Mata Kuliah</label>
                  <input 
                    type="text" 
                    value={formData.subject}
                    onChange={handleChange('subject')}
                    className={`w-full px-4 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 ${
                      errors.subject
                        ? 'border-red-500 bg-red-50 focus:ring-red-200 text-red-400'
                        : 'border-slate-200 focus:ring-indigo-500/20'
                    }`}
                    placeholder="Contoh: Algoritma Pemrograman"
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-500 mt-1">{errors.subject}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Hari</label>
                    <select 
                      value={formData.day}
                      onChange={handleChange('day')}
                      className={`w-full px-4 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 ${
                      errors.day
                        ? 'border-red-500 bg-red-50 focus:ring-red-200 text-red-400'
                        : 'border-slate-200 focus:ring-indigo-500/20'
                    }`}
                    >
                      {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    {errors.day && (
                    <p className="text-xs text-red-500 mt-1">{errors.day}</p>
                  )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Tipe</label>
                    <select 
                      value={formData.type}
                      onChange={handleChange('type')}
                      className={`w-full px-4 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 ${
                      errors.type
                        ? 'border-red-500 bg-red-50 focus:ring-red-200 text-red-400'
                        : 'border-slate-200 focus:ring-indigo-500/20'
                    }`}
                    >
                      <option value="teori">Teori</option>
                      <option value="praktek">Praktek</option>
                      <option value="seminar">Seminar</option>
                    </select>
                    {errors.type && (
                    <p className="text-xs text-red-500 mt-1">{errors.type}</p>
                  )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Jam Mulai</label>
                    <input 
                      type="time" 
                      value={formData.startTime}
                      onChange={handleChange('startTime')}
                      className={`w-full px-4 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 ${
                      errors.startTime
                        ? 'border-red-500 bg-red-50 focus:ring-red-200 text-red-400'
                        : 'border-slate-200 focus:ring-indigo-500/20'
                    }`}
                    />
                    {errors.startTime && (
                    <p className="text-xs text-red-500 mt-1">{errors.startTime}</p>
                  )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Jam Selesai</label>
                    <input 
                      type="time" 
                      value={formData.endTime}
                      onChange={handleChange('endTime')}
                      className={`w-full px-4 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 ${
                      errors.endTime
                        ? 'border-red-500 bg-red-50 focus:ring-red-200 text-red-400'
                        : 'border-slate-200 focus:ring-indigo-500/20'
                    }`}
                    />
                    {errors.endTime && (
                    <p className="text-xs text-red-500 mt-1">{errors.endTime}</p>
                  )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Ruangan</label>
                    <input 
                      type="text" 
                      value={formData.room}
                      onChange={handleChange('room')}
                      className={`w-full px-4 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 ${
                      errors.room
                        ? 'border-red-500 bg-red-50 focus:ring-red-200 text-red-400'
                        : 'border-slate-200 focus:ring-indigo-500/20'
                    }`}
                      placeholder="R.101"
                    />
                    {errors.room && (
                    <p className="text-xs text-red-500 mt-1">{errors.room}</p>
                  )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">SKS</label>
                    <input 
                      type="number" 
                      min="1"
                      max="6"
                      value={formData.sks}
                      onChange={handleChange('sks')}
                      className={`w-full px-4 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 ${
                      errors.sks
                        ? 'border-red-500 bg-red-50 focus:ring-red-200 text-red-400'
                        : 'border-slate-200 focus:ring-indigo-500/20'
                    }`}
                    />
                    {errors.sks && (
                    <p className="text-xs text-red-500 mt-1">{errors.sks}</p>
                  )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Nama Dosen</label>
                  <input 
                    type="text" 
                    value={formData.lecturer}
                    onChange={handleChange('lecturer')}
                    className={`w-full px-4 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 ${
                      errors.lecturer
                        ? 'border-red-500 bg-red-50 focus:ring-red-200 text-red-400'
                        : 'border-slate-200 focus:ring-indigo-500/20'
                    }`}
                    placeholder="Nama Lengkap & Gelar"
                  />
                  {errors.lecturer && (
                    <p className="text-xs text-red-500 mt-1">{errors.lecturer}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors">
                    Simpan Jadwal
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}
      </div>
    );
}

export default SchedulePage

// const initialWeeklySchedule = {
// Senin: [
// { id: 1, subject: "Manajemen Proyek", startTime: "08:00", endTime: "09:40", type: "Teori", room: "R.404", lecturer: "Dr. Budi Santoso", sks: 2, color: "bg-blue-50 text-blue-700 border-blue-100" },
// { id: 2, subject: "Basis Data II", startTime: "10:00", endTime: "12:30", type: "Praktek", room: "Lab Basis Data", lecturer: "Siti Aminah, M.Kom", sks: 3, color: "bg-orange-50 text-orange-700 border-orange-100" },
// ],
// Selasa: [
// { id: 3, subject: "Kecerdasan Buatan", startTime: "08:00", endTime: "10:00", type: "Teori", room: "Gedung A, R.304", lecturer: "Prof. Handoko", sks: 3, color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
// { id: 4, subject: "Pemrograman Web Lanjut", startTime: "10:30", endTime: "12:00", type: "Praktek", room: "Lab Komputer 2", lecturer: "Rina Wati, MT", sks: 3, color: "bg-rose-50 text-rose-700 border-rose-100" },
// { id: 5, subject: "Etika Profesi", startTime: "13:00", endTime: "14:40", type: "Teori", room: "Online (Zoom)", lecturer: "Dedi Setiawan, SH", sks: 2, color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
// ],
// Rabu: [],
// Kamis: [
// { id: 6, subject: "Jaringan Komputer", startTime: "09:00", endTime: "11:30", type: "Praktek", room: "Lab Jaringan", lecturer: "Eko Prasetyo, MT", sks: 3, color: "bg-cyan-50 text-cyan-700 border-cyan-100" },
// ],
// Jumat: [
// { id: 7, subject: "Bahasa Inggris Bisnis", startTime: "13:00", endTime: "14:40", type: "Teori", room: "R.202", lecturer: "Sarah Jenkins, M.Ed", sks: 2, color: "bg-violet-50 text-violet-700 border-violet-100" },
// ],
// Sabtu: []
// };