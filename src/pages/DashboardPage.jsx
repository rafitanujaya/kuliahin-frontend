import { getScheduleTodayApi } from "@/api/scheduleApi"
import { getDeadlineTaskApi } from "@/api/taskApi"
import { ChevronRight, Clock, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

// [
//   {
//   id: "1",
//   title: "Laporan Pembuatan Aplikasi",
//   course: "Pemrograman Web",
//   type: "Individu",      // atau Kelompok
//   priority: "high",      // low | medium | high
//   urgency: "today",
//   deadlineLabel: "hari ini "
// }
// ]

const DashboardPage = () => {

  const [schedules, setSchedules] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [loadingSchedules, setLoadingSchedules] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);

  const convertDate = (isoDate) => {
       return new Date(isoDate).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      })}

  const loadSchedules = async () => {
    try {
      setLoadingSchedules(true);
      const result = await getScheduleTodayApi();
      setSchedules(result.data);
    } catch {
      toast.error("Gagal Memuat Jadwal Hari ini");
    } finally {
      setLoadingSchedules(false);
    }
  };

  const loadDeadlineTasks = async () => {
    try {
      setLoadingTasks(true);
      const result = await getDeadlineTaskApi();
      console.log(result);
      setTasks(result.data);
    } catch {
      toast.error("Gagal Memuat Deadline");
    } finally {
      setLoadingTasks(false);
    }
  };


  useEffect(() => {
    loadSchedules(),
    loadDeadlineTasks()
  }, [])

  const statusConfig = {
  ongoing: {
    dot: "bg-indigo-600 ring-indigo-100",
    card: "bg-indigo-50/50 border-indigo-100",
    label: "Dimulai",
    labelStyle: "bg-green-200 text-green-700 animate-pulse",
    time: "text-indigo-600",
    line: "bg-indigo-100",
  },
  upcoming: {
    dot: "bg-slate-300 ring-slate-100",
    card: "bg-white border-slate-200",
    label: "Belum Dimulai",
    labelStyle: "bg-slate-200 text-slate-500",
    time: "text-slate-500",
    line: "bg-slate-100",
  },
  finished: {
    dot: "bg-slate-300 ring-slate-50",
    card: "bg-slate-50 border-slate-100 opacity-60",
    label: "Selesai",
    labelStyle: "bg-slate-100 text-slate-400",
    time: "text-slate-400",
    line: "bg-slate-100",
  },
};

const urgencyConfig = {
  today: {
    badge: "Hari ini",
    style: "bg-rose-100 text-rose-600",
  },
  soon: {
    badge: "Segera",
    style: "bg-yellow-100 text-yellow-700",
  },
  normal: {
    badge: "Mendatang",
    style: "bg-green-100 text-green-500",
  },
};

const priorityStyle = {
  high: "bg-red-100 text-red-600",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-slate-100 text-slate-500",
};

const typeStyle = {
  individu: "bg-indigo-100 text-indigo-600",
  kelompok: "bg-violet-100 text-violet-600",
};

  
  return (
    <div className="p-8 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-4xl">Dashboard</h1>
          <p className="text-sm text-slate-500">Siap untuk produktif hari ini? Berikut ringkasan kuliahmu.</p>

        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 shadow-sm">
            <Clock size={16} className="text-indigo-500"/>
            <span>{convertDate(new Date())}</span>
        </div>
      </div>

      <div className="my-8">
        <button className="w-full bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-2xl p-4 flex items-center justify-between shadow-md shadow-indigo-200 transition-all transform hover:scale-[1.01]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Sparkles size={20} className="text-yellow-300"/>
              </div>
              <div className="text-left">
                <span className="font-bold block">Generate Weekly Insight</span>
                <span className="text-indigo-100 text-sm ">Analisis performa mingguanmu menggunakan AI</span>
              </div>

            </div>

              <div className="bg-white/10 p-2 rounded-full">
                <ChevronRight size={20}/>
              </div>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 items-start">
        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-slate-800">Jadwal Hari Ini</h3>
            <Link to={'/jadwal'} className="text-sm font-bold text-indigo-600 hover:underline">Lihat Full Jadwal</Link>
          </div>

          {/* <div className="space-y-6">

            <div className="flex gap-4 group">

              <div className="flex flex-col items-center pt-2">
                <div className="w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-indigo-50"></div>
                <div className="w-0.5 h-full bg-indigo-100 -mb-4 mt-1"></div>
              </div>

              <div className="w-full flex-1 p-5 bg-indigo-50/50 rounded-xl border border-indigo-100 flex flex-col justify-between hover:bg-indigo-50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-indigo-600">08:00 - 10:30</span>
                      <span className="bg-green-200 text-xs text-green-600 font-bold px-1.5 py-0.5 rounded animate-pulse">Dimulai</span>
                    </div>

                    <span className="text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wide bg-white/50 border-black/5">KELAS</span>
                  </div>

                  <h4 className="font-bold text-slate-800">Pemograman Sains Data</h4>
                  <p className="text-xs text-slate-500">Ruang 402 • Prof. Budi</p>
              </div>

            </div>

            <div className="flex gap-4 group">

              <div className="flex flex-col items-center pt-2">
                <div className="w-3 h-3 rounded-full bg-slate-300 ring-4 ring-indigo-50"></div>
              </div>

              <div className="w-full flex-1 p-5 opacity-70 hover:opacity-100 rounded-xl border border-indigo-100 flex flex-col justify-between hover:bg-indigo-50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-500">08:00 - 10:30</span>
                      <span className="bg-slate-200 text-xs text-slate-400 font-bold px-1.5 py-0.5 rounded ">Belum Dimulai</span>
                    </div>

                    <span className="text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wide bg-white/50 border-black/5">KELAS</span>
                  </div>

                  <h4 className="font-bold text-slate-800">Pemograman Sains Data</h4>
                  <p className="text-xs text-slate-500">Ruang 402 • Prof. Budi</p>
              </div>

            </div>

          </div> */}

          <div className="space-y-6">
            {loadingSchedules && (
              <p className="text-sm text-slate-400">Memuat jadwal...</p>
            )}

            {!loadingSchedules && schedules.length === 0 && (
              <p className="text-sm text-slate-400">
                Tidak ada jadwal hari ini 🎉
              </p>
            )}

            {!loadingSchedules &&
              schedules.map((item, index) => {
                const cfg = statusConfig[item.status];

                return (
                  <div key={item.id} className="flex gap-4 group">
                    {/* TIMELINE */}
                    <div className="flex flex-col items-center pt-2">
                      <div
                        className={`w-3 h-3 rounded-full ${cfg.dot} ring-4`}
                      />
                      {index !== schedules.length - 1 && (
                        <div
                          className={`w-0.5 h-full ${cfg.line} -mb-4 mt-1`}
                        />
                      )}
                    </div>

                    {/* CARD */}
                    <div
                      className={`w-full flex-1 p-5 rounded-xl border ${cfg.card} transition-all hover:scale-[1.01]`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-xs font-bold ${cfg.time}`}
                          >
                            {item.time}
                          </span>
                          <span
                            className={`text-xs font-bold px-1.5 py-0.5 rounded ${cfg.labelStyle}`}
                          >
                            {cfg.label}
                          </span>
                        </div>

                        <span className="text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wide bg-white/50">
                          {item.type}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-800">
                        {item.course}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {item.location} • {item.lecturer}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>

        </div>

        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-slate-800">Deadline</h3>
            <Link to={'/tugas'} className="text-sm font-bold text-indigo-600 hover:underline">Daftar Tugas</Link>
          </div>
          {/* <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 ">
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">Laporan Pembuatan Aplikasi</p>
                  <span className="text-xs bg-slate-100 px-2 py-0.5">Individu</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 ">
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">Bikin Aplikasi Mobile</p>
                  <span className="text-xs bg-slate-100 px-2 py-0.5">Kelompok</span>
                </div>
              </div>
          </div> */}

          {/* Loading */}
            {loadingTasks && (
              <p className="text-sm text-slate-400">Memuat deadline...</p>
            )}

            {/* Empty */}
            {!loadingTasks && tasks.length === 0 && (
              <p className="text-sm text-slate-400">
                Tidak ada deadline dalam waktu dekat 🎉
              </p>
            )}

            {/* List */}
            <div className="space-y-2">
              {!loadingTasks &&
                tasks.map((task) => {
                  // const cfg = urgencyConfig[task.urgency];

                  return (
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition">
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <p className="text-sm font-medium truncate">
                          {task.title}
                        </p>

                        {/* Meta line */}
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {/* Course */}
                          <span className="text-xs text-slate-500 truncate max-w-[140px]">
                            {task.matkul}
                          </span>

                          <span className="w-1 h-1 bg-slate-300 rounded-full" />

                          {/* Type */}
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${typeStyle[task.type]}`}
                          >
                            {task.type}
                          </span>

                          {/* Priority */}
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${priorityStyle[task.priority]}`}
                          >
                            {task.priority.toUpperCase()}
                          </span>
                        </div>

                        {/* Deadline */}
                        
                      </div>
                        <div className="flex gap-2 mt-1">
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-xl ${urgencyConfig[task.urgency].style}`} >
                            {task.deadlineLabel}
                          </span>
                        </div>
                    </div>

                  );
                })}
            </div>
          
          
        </div>


      </div>

        <section className="mt-8 bg-indigo-900 col-span-2 rounded-2xl p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
                  <div className="relative z-10">
                    <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-2">Quote of the day</p>
                    <p className="font-serif text-lg leading-relaxed italic opacity-90">
                      "The secret of getting ahead is getting started."
                    </p>
                    <p className="text-right text-xs mt-2 text-indigo-300">— Mark Twain</p>
                  </div>
        </section>


    </div>
  )
}

export default DashboardPage
