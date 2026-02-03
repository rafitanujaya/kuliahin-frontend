import { useEffect, useState } from "react"
import dashboardImage from "../assets/dashboard.png";
import { AlertCircle, FileWarning, Clock, MessageCircle, X, Sparkles, LogIn, UploadCloud, Coffee, ArrowRight, Users, Layout, GraduationCap, Twitter, Instagram, Linkedin, Github, Heart,
  Brain, 
  CalendarCheck, 
  CheckCircle2, 
  ListTodo,
  BarChart3,
  FileText,
  Video,
  FileType,
CalendarRange,
 Zap, Library
  } from 'lucide-react';
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
   const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false)

    const scrollToSection = (id) => {
      const el = document.getElementById(id);
      if (el) {
         el.scrollIntoView({ behavior: "smooth" });
      }
   };


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div>

        {/* Navbar Section */}
        <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-sm border-transparent"
          : "bg-white/80 backdrop-blur border-b border-transparent"
      }`}>
            <div className="mx-auto max-w-[1280px] h-16 px-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="font-semibold text-2xl tracking-tight text-gray-900">
          Kuliah<span className="text-indigo-600">In</span>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <li
               onClick={() => scrollToSection("fitur")}
               className="cursor-pointer hover:text-gray-900 transition"
            >
               Fitur
            </li>
            <li
               onClick={() => scrollToSection("cara-kerja")}
               className="cursor-pointer hover:text-gray-900 transition"
            >
               Cara Kerja
            </li>
            <li
               onClick={() => scrollToSection("use-case")}
               className="cursor-pointer hover:text-gray-900 transition"
            >
               Cocok Buat Siapa
            </li>
        </ul>

        {/* CTA */}
        <button onClick={() => navigate("/login")} className="rounded-lg cursor-pointer bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
          Coba Sekarang
        </button>

      </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto text-center mt-20">
            <div className="mb-8 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-sm font-medium text-indigo-600 shadow-lg shadow-indigo-500/10">
                    <svg
                        className="h-4 w-4 stroke-indigo-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="1.8"
                        aria-hidden="true"
                        >
                        <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z" />
                    </svg>
                    AI Powered Learning
                </span>
            </div>

            <h1 className="mx-auto max-w-4xl text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Satu Aplikasi untuk Mengatur &
          <span className="block bg-linear-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
            Memahami Hidup Kuliah
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-gray-600 sm:text-lg">
          Kelola jadwal, deadline, todo, dan ruang belajar dalam satu tempat —
          dibantu AI yang memberi <span className="font-medium text-indigo-600">insight dan arah</span> dari aktivitas kuliahmu setiap minggu.
        </p>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <button onClick={() => navigate("/login")} className="rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Coba KuliahIn Sekarang
          </button>
        </div>

        <div className="mt-20 rounded-2xl bg-white p-3 border border-slate-200 max-w-5xl mx-auto shadow-md">
            <img src={dashboardImage} alt="" className="inline-block border border-slate-200 rounded-2xl" />
        </div>
        </div>

        {/* Problem Section */}
        <section className="relative w-full bg-white mt-20 overflow-hidden">
      {/* Soft indigo glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-[1280px] px-4">
        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200  px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-600 mb-6">
            <AlertCircle size={12} />
            Realita Mahasiswa
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Kuliah itu berat.
            <span className="block text-gray-500">Apalagi kalau berantakan.</span>
          </h2>
          <p className="mt-4 text-gray-500">
            Sering ngerasa kejadian kayak gini di tengah semester? Kamu nggak sendirian.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="md:col-span-2 rounded-3xl border border-gray-200 bg-white p-8 transition hover:border-indigo-300 group">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 space-y-3">
                <h3 className="text-2xl font-semibold text-gray-900">File Materi Tercecer</h3>
                <p className="text-gray-600 leading-relaxed">
                  Slide dosen di WhatsApp, catatan di buku tulis, tugas di Google Classroom. Pas mau ujian, bingung nyari materinya di mana.
                </p>
              </div>
              <div className="w-full md:w-1/2 rounded-2xl border border-gray-200 bg-gray-50 p-4 space-y-3 rotate-1 group-hover:rotate-0 transition-transform duration-500">
                {["Makalah_Kelompok_3_Revisi.pdf", "Materi_Minggu_4_FINAL.docx", "Tugas_Bu_Ani_REVISI_BGT.pdf"].map((file, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
                    <FileWarning size={16} className="text-red-500" />
                    <span className="truncate text-xs text-gray-700 font-mono">{file}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 transition hover:border-indigo-300 flex flex-col justify-between">
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-indigo-50 text-indigo-600">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lupa Deadline</h3>
              <p className="text-sm text-gray-600">
                “Hah? Tugasnya dikumpulin jam 12 malem ini?” — kalimat horor mingguan.
              </p>
            </div>
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-3 flex items-start gap-3">
              <div className="rounded-md bg-red-600/10 p-1.5 text-red-600"><X size={14} /></div>
              <div>
                <div className="text-xs font-semibold text-red-600">Tugas Terlewat</div>
                <div className="text-[10px] text-red-400">14 assignments due</div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 transition hover:border-indigo-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Gagal Fokus di Kelas</h3>
            <p className="text-sm text-gray-600">
              Dosen ngomong cepet banget, catetan bolong-bolong, akhirnya cuma bengong.
            </p>
            <div className="mt-6 flex items-end gap-1 h-12 opacity-60">
              {[...Array(20)].map((_, i) => (
                // eslint-disable-next-line react-hooks/purity
                <div key={i} className="w-1 rounded-full bg-indigo-300" style={{ height: `${Math.random() * 100}%` }} />
              ))}
            </div>
          </div>

          {/* Card 4 */}
          <div className="md:col-span-2 rounded-3xl border border-gray-200 bg-white p-8 flex flex-col md:flex-row items-center justify-between gap-8 transition hover:border-indigo-300">
            <div className="max-w-md">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Burnout Akademik</h3>
              <p className="text-gray-600">
                Terlalu banyak aplikasi, terlalu banyak tab browser dibuka, tapi progres nol.
              </p>
            </div>
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-indigo-600 shadow-sm">
                  <MessageCircle size={16} />
                </div>
              ))}
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-white text-xs font-bold shadow-sm">
                99+
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Solution Section */}
    <section className="relative w-full mt-20 pb-10 px-6 overflow-hidden">
      
      {/* Background Aura (Calm & Intelligent) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header - Center Aligned */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full  border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Sparkles size={12} />
            <span>Ekosistem Belajar Lengkap</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.15]">
            Satu Aplikasi,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Semua Kebutuhan Kuliah.
            </span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Dari materi kuliah yang rumit hingga manajemen waktu yang padat, Kuliahin memberikan *Insight* dan membantu kamu mengambil *Decision* terbaik.
          </p>
        </div>

        {/* Feature Grid - The Solution Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Feature 1: Learning Room (Large Card) */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-200 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between h-[500px]">
            
            {/* Content */}
            <div className="relative z-10">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                <Brain size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Learning Room</h3>
              <p className="text-slate-500 text-lg max-w-lg">
                Upload video rekaman, file PDF, atau teks catatan. AI akan memprosesnya untuk memberikan <span className="text-indigo-600 font-semibold">Insight</span> (pemahaman materi) dan <span className="text-indigo-600 font-semibold">Decision</span> (langkah belajar selanjutnya).
              </p>
            </div>

            {/* Visual: Media Inputs to Decision */}
            <div className="relative mt-8 h-48 bg-slate-50 rounded-2xl border border-slate-100 p-6 overflow-hidden flex items-center justify-center gap-4">
               {/* Left: Inputs */}
               <div className="flex flex-col gap-2">
                  <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2 text-xs font-medium text-slate-600">
                    <Video size={14} className="text-red-500"/> Video.mp4
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2 text-xs font-medium text-slate-600">
                    <FileType size={14} className="text-red-500"/> Materi.pdf
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2 text-xs font-medium text-slate-600">
                    <FileText size={14} className="text-blue-500"/> Catatan.txt
                  </div>
               </div>
               
               {/* Arrow Animation */}
               <div className="text-indigo-400 flex flex-col items-center gap-1">
                  <div className="flex gap-0.5">
                    <span className="w-1 h-1 bg-indigo-400 rounded-full animate-ping"></span>
                    <span className="w-1 h-1 bg-indigo-400 rounded-full animate-ping delay-75"></span>
                  </div>
                  <ArrowRight size={24} className="relative z-10"/>
               </div>

               {/* Right: Insight & Decision Card */}
               <div className="bg-gradient-to-br from-white to-indigo-50 p-4 rounded-xl shadow-md border border-indigo-100 w-48 rotate-2 group-hover:rotate-0 transition-transform duration-500 relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-amber-500"/>
                    <span className="text-[10px] font-bold text-indigo-900 uppercase">AI Output</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-indigo-50 text-[10px] text-slate-600">
                       <span className="font-bold text-indigo-600">Insight:</span> Paham konsep dasar OOP.
                    </div>
                    <div className="p-2 bg-indigo-600 rounded border border-indigo-600 text-[10px] text-white">
                       <span className="font-bold">Decision:</span> Lanjut ke kuis polimorfisme.
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column Features */}
          <div className="lg:col-span-5 flex flex-col gap-6 h-[500px]">
            
            {/* Feature 2: Smart Planner (Schedule, Deadline, Todo) */}
            <div className="flex-1 bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity"></div>
               
               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                       <ListTodo size={24} className="text-indigo-500"/> 
                       Smart Planner
                    </h3>
                    <p className="text-slate-500 mt-2 text-sm">
                       Kelola <span className="font-semibold text-slate-700">Jadwal Matkul</span>, <span className="font-semibold text-slate-700">Deadline Tugas</span>, dan <span className="font-semibold text-slate-700">To-Do List</span> dalam satu tampilan terintegrasi.
                    </p>
                  </div>
                  
                  {/* Fake Planner UI */}
                  <div className="mt-4 flex gap-2 overflow-hidden opacity-80">
                     <div className="bg-red-50 border border-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                        <CalendarCheck size={12}/> Deadline Besok
                     </div>
                     <div className="bg-indigo-50 border border-indigo-100 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 size={12}/> 2 Todo Selesai
                     </div>
                  </div>
               </div>
            </div>

            {/* Feature 3: Weekly Insight & Decision */}
            <div className="flex-1 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 border border-indigo-500 shadow-lg text-white relative overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               
               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                       <BarChart3 size={24} className="text-white"/> 
                       Weekly Recap
                    </h3>
                    <p className="text-indigo-100 mt-2 text-sm">
                       Rangkuman kegiatan mingguan dengan saran keputusan nyata. 
                       <br/><span className="italic opacity-80">"Kamu terlalu banyak begadang, kurangi beban SKS semester depan."</span>
                    </p>
                  </div>

                  <div className="mt-2 flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                     <div className="bg-green-400 w-2 h-2 rounded-full animate-pulse"></div>
                     <span className="text-xs font-medium">Laporan Minggu Ini Siap</span>
                  </div>
               </div>
            </div>

          </div>

        </div>

      </div>
    </section>

    {/* Feature KuliahIn */}
    <section id="fitur" className="relative w-full mt-20 pb-10 px-6 overflow-hidden">
      
      {/* Background Aura (Calm & Intelligent) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header - Simple & Direct */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Sparkles size={12} />
            <span>Kuliahin Hadir</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.15]">
            Solusi Nyata,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Bukan Gimmick.
            </span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Kuliahin adalah workspace mahasiswa buat ngatur kuliah, tugas, dan belajar — semuanya rapi, terstruktur, dan gampang dipakai.
          </p>
        </div>

        {/* Feature Grid - 4 Core Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Feature 1: Smart Schedule */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-[320px]">
             <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                   <CalendarRange size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Smart Schedule</h3>
                <p className="text-slate-500 text-sm">
                   Catat jadwal kuliah, agenda, dan pengingat otomatis. Nggak ada lagi drama salah masuk kelas atau lupa jadwal pengganti.
                </p>
             </div>
             
             {/* Visual: Calendar Snippet */}
             <div className="mt-6 bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
                   <span>Hari Ini</span>
                   <span>Senin, 14 Okt</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                   <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                   <div>
                      <div className="text-xs font-bold text-slate-700">Algoritma Pemrograman</div>
                      <div className="text-[10px] text-slate-400">08:00 - 10:30 • R. 402</div>
                   </div>
                </div>
             </div>
          </div>

          {/* Feature 2: Todo & Deadline */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-[320px]">
             <div className="relative z-10">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 text-red-600 group-hover:scale-110 transition-transform">
                   <ListTodo size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Todo & Deadline</h3>
                <p className="text-slate-500 text-sm">
                   Tugas lebih ke-track, deadline gak kelewat. Prioritaskan mana yang harus dikerjakan duluan berdasarkan urgensi.
                </p>
             </div>
             
             {/* Visual: Checklist */}
             <div className="mt-6 bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm opacity-50">
                   <CheckCircle2 size={16} className="text-slate-300"/>
                   <span className="text-xs text-slate-400 line-through">Revisi Makalah (Done)</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-red-100 shadow-sm ring-1 ring-red-50">
                   <Clock size={16} className="text-red-500"/>
                   <span className="text-xs font-bold text-slate-700">Laporan Praktikum</span>
                   <span className="ml-auto text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">H-1</span>
                </div>
             </div>
          </div>

          {/* Feature 3: Learning Room */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-[320px]">
             <div className="relative z-10">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform">
                   <Library size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Learning Room</h3>
                <p className="text-slate-500 text-sm">
                   Materi kuliah dalam bentuk PDF, video, dan catatan tersimpan rapi per mata kuliah. Gak perlu lagi scroll chat grup angkatan.
                </p>
             </div>
             
             {/* Visual: Files */}
             <div className="mt-6 flex gap-3 overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col items-center gap-1 min-w-[60px]">
                   <Video size={20} className="text-purple-500"/>
                   <span className="text-[9px] text-slate-500">Rec.mp4</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col items-center gap-1 min-w-[60px]">
                   <FileType size={20} className="text-red-500"/>
                   <span className="text-[9px] text-slate-500">Slide.pdf</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col items-center gap-1 min-w-[60px]">
                   <FileText size={20} className="text-blue-500"/>
                   <span className="text-[9px] text-slate-500">Notes.txt</span>
                </div>
             </div>
          </div>

          {/* Feature 4: Focused Study */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-[320px]">
             <div className="relative z-10">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4 text-amber-600 group-hover:scale-110 transition-transform">
                   <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Focused Study</h3>
                <p className="text-slate-500 text-sm">
                   Belajar lebih terarah, gak random buka file. AI memberikan rekomendasi materi mana yang harus dipelajari ulang sebelum ujian.
                </p>
             </div>
             
             {/* Visual: Focus UI */}
             <div className="mt-6 bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                   <Brain size={18} className="text-amber-600"/>
                </div>
                <div>
                   <div className="text-xs font-bold text-slate-700">Rekomendasi AI</div>
                   <div className="text-[10px] text-slate-400">Pelajari ulang: Bab 4 - Pointer</div>
                </div>
                <div className="ml-auto">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                </div>
             </div>
          </div>

        </div>

      </div>
    </section>

    {/* How to works KuliahIn */}
    <section id="cara-kerja" className="py-24 bg-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
           <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
             Cara Kerja? <span className="text-indigo-600">Simple Banget.</span>
           </h2>
           <p className="text-slate-500 text-lg">
             Teknologi canggih di belakang, kemudahan di depan.
           </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-12 relative">
           
           {/* Connecting Line (Desktop Only) */}
           <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-slate-100 via-indigo-100 to-slate-100 -z-10" />

           {/* Step 1 */}
           <div className="flex flex-col items-center text-center group cursor-default">
              <div className="relative mb-8 transition-transform duration-300 group-hover:-translate-y-2">
                 <div className="w-24 h-24 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-indigo-100/50 flex items-center justify-center relative z-10">
                    <LogIn size={32} className="text-indigo-600" />
                 </div>
                 {/* Number Badge */}
                 <div className="absolute -top-3 -right-3 w-8 h-8 bg-indigo-600 text-white font-bold rounded-lg flex items-center justify-center border-4 border-white shadow-sm z-20">
                    1
                 </div>
                 {/* Decor Blob */}
                 <div className="absolute inset-0 bg-indigo-500/20 blur-xl transform scale-75 group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">Daftar & Masuk</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                 Buat akun dalam hitungan detik. Langsung masuk ke dashboard pribadimu yang bersih dan siap pakai.
              </p>
           </div>

           {/* Step 2 */}
           <div className="flex flex-col items-center text-center group cursor-default">
              <div className="relative mb-8 transition-transform duration-300 group-hover:-translate-y-2">
                 <div className="w-24 h-24 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-purple-100/50 flex items-center justify-center relative z-10">
                    <UploadCloud size={32} className="text-purple-600" />
                 </div>
                 <div className="absolute -top-3 -right-3 w-8 h-8 bg-purple-600 text-white font-bold rounded-lg flex items-center justify-center border-4 border-white shadow-sm z-20">
                    2
                 </div>
                 <div className="absolute inset-0 bg-purple-500/20 blur-xl transform scale-75 group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">Input Jadwal & Materi</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                 Tambahkan jadwal kuliah, upload tugas, atau masukkan rekaman materi. Semudah drag & drop.
              </p>
           </div>

           {/* Step 3 */}
           <div className="flex flex-col items-center text-center group cursor-default">
              <div className="relative mb-8 transition-transform duration-300 group-hover:-translate-y-2">
                 <div className="w-24 h-24 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-amber-100/50 flex items-center justify-center relative z-10">
                    <Coffee size={32} className="text-amber-500" />
                 </div>
                 <div className="absolute -top-3 -right-3 w-8 h-8 bg-amber-500 text-white font-bold rounded-lg flex items-center justify-center border-4 border-white shadow-sm z-20">
                    3
                 </div>
                 <div className="absolute inset-0 bg-amber-500/20 blur-xl transform scale-75 group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fokus Kuliah</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                 Sisanya biar Kuliahin yang ngatur. Kamu tinggal terima notifikasi, ringkasan, dan saran belajar.
              </p>
           </div>

        </div>

        {/* Closing Sentence */}
        <div className="mt-20 text-center">
           <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
              <CheckCircle2 size={18} className="text-green-500" />
              <span>Gak perlu setup ribet. Langsung pakai.</span>
           </div>
        </div>

      </div>
    </section>

    {/* Use Case Section */}
    <section id="use-case" className="py-12 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">

           <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
             Aplikasi Ini <span className="text-indigo-600">Cocok Buat Siapa?</span>
           </h2>
           <p className="text-slate-500 text-lg max-w-2xl mx-auto">
             Apapun gaya belajarmu, Kuliahin didesain untuk beradaptasi dengan kebutuhan semestermu.
           </p>
        </div>

        {/* Use Case Cards */}
        <div className="grid md:grid-cols-3 gap-8">
           
           {/* Persona 1: The Activist */}
           <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform">
                 <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Si Paling Sibuk</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                 Mahasiswa aktif organisasi, kepanitiaan, atau yang kerja part-time. Butuh manajemen waktu yang ketat biar akademik gak keteteran.
              </p>
              <ul className="space-y-2">
                 <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <CheckCircle2 size={14} className="text-orange-500" />
                    <span>Auto-Schedule Deadline</span>
                 </li>
                 <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <CheckCircle2 size={14} className="text-orange-500" />
                    <span>Ringkasan Cepat (Hemat Waktu)</span>
                 </li>
              </ul>
           </div>

           {/* Persona 2: The Perfectionist */}
           <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10">
                 <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform">
                    <Layout size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">Si Suka Rapi</h3>
                 <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    Mahasiswa yang gak betah liat file berantakan. Pengen semua materi, catatan, dan tugas tersimpan rapi di satu tempat estetik.
                 </p>
                 <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                       <CheckCircle2 size={14} className="text-indigo-500" />
                       <span>Learning Room Terstruktur</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                       <CheckCircle2 size={14} className="text-indigo-500" />
                       <span>Workspace Bersih & Minimalis</span>
                    </li>
                 </ul>
              </div>
           </div>

           {/* Persona 3: The Tech Savvy */}
           <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                 <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Si Digital Native</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                 Mahasiswa yang suka eksplor tools baru buat ningkatin produktivitas. Selalu cari cara paling efisien buat belajar ("Study Smarter").
              </p>
              <ul className="space-y-2">
                 <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <CheckCircle2 size={14} className="text-blue-500" />
                    <span>AI-Powered Insights</span>
                 </li>
                 <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <CheckCircle2 size={14} className="text-blue-500" />
                    <span>Smart Decision Support</span>
                 </li>
              </ul>
           </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center">
           <div className="inline-block p-1 rounded-full bg-white border border-slate-200 shadow-sm">
              <div className="px-6 py-2 rounded-full bg-slate-50 border border-slate-100 flex items-center gap-3">
                 <GraduationCap size={20} className="text-slate-400" />
                 <span className="text-sm font-semibold text-slate-600">
                    Cocok buat mahasiswa semester awal sampai akhir skripsi.
                 </span>
              </div>
           </div>
        </div>

      </div>
    </section>

    {/* CTA */}
    <section className="py-12 px-6 max-w-6xl mx-auto rounded-2xl bg-slate-900 relative overflow-hidden flex items-center justify-center">
      
      {/* Background Gradients (Cosmic Vibes) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-indigo-600/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[800px] h-[800px] bg-purple-600/30 rounded-full blur-[120px]" />
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10 text-center">
        
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <Sparkles size={14} className="text-amber-400 fill-amber-400" />
           <span>Revolusi Cara Belajarmu</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-5xl md:text-5xl font-bold text-white mb-8 tracking-tight leading-tight">
          Saatnya kuliah lebih teratur.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Bukan lebih sibuk.
          </span>
        </h2>

        <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto font-light">
          Gabung dengan ribuan mahasiswa yang sudah merasakan kemudahan mengatur jadwal dan materi dalam satu aplikasi.
        </p>

        {/* Big CTA Button */}
        <div className="flex flex-col items-center gap-4">
           <button onClick={() => navigate("/login")} className="group relative px-10 py-3.5 bg-white text-slate-900 rounded-full font-bold text-lg md:text-xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300">
              <span className="relative z-10 flex items-center gap-3">
                 Mulai Pakai Kuliahin
                 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
           </button>
           
           <p className="text-slate-500 text-sm font-medium tracking-wide">
              Gratis, tanpa ribet.
           </p>
        </div>

      </div>
    </section>

    {/* Footer */}
    <footer className="bg-white mt-20 border-t border-slate-200 pt-16 pb-8 font-sans">
       <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
             
             {/* Brand & Tagline */}
             <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                   <span className="text-xl font-bold text-slate-900 tracking-tight">Kuliah<span className="text-indigo-500">In</span></span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-6">
                   Platform asisten akademik berbasis AI untuk membantu mahasiswa mengatur jadwal, memahami materi, dan meningkatkan produktivitas kuliah tanpa ribet.
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                   <span>Dibuat dengan</span>
                   <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
                   <span>untuk mahasiswa Indonesia.</span>
                </div>
             </div>

             {/* Navigation Links 1 */}
             <div>
                <h4 className="font-bold text-slate-900 mb-6">Produk</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                   <li><a href="#fitur" className="hover:text-indigo-600 transition-colors">Fitur Utama</a></li>
                   <li><a href="#cara-kerja" className="hover:text-indigo-600 transition-colors">Cara Kerja</a></li>
                   <li><a href="#testimoni" className="hover:text-indigo-600 transition-colors">Testimoni</a></li>
                   <li><a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a></li>
                </ul>
             </div>

             {/* Navigation Links 2 */}
             <div>
                <h4 className="font-bold text-slate-900 mb-6">Legal & Bantuan</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                   <li><a href="#" className="hover:text-indigo-600 transition-colors">Kebijakan Privasi</a></li>
                   <li><a href="#" className="hover:text-indigo-600 transition-colors">Syarat & Ketentuan</a></li>
                   <li><a href="#" className="hover:text-indigo-600 transition-colors">Hubungi Kami</a></li>
                   <li><a href="#" className="hover:text-indigo-600 transition-colors">Status Server</a></li>
                </ul>
             </div>
          </div>

          {/* Bottom Bar: Copyright & Socials */}
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="text-slate-400 text-sm">
                &copy; {new Date().getFullYear()} Kuliahin App. All rights reserved.
             </div>

             <div className="flex items-center gap-6">
                <a href="#" className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-full transition-all" aria-label="Twitter">
                   <Twitter size={20} />
                </a>
                <a href="#" className="p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all" aria-label="Instagram">
                   <Instagram size={20} />
                </a>
                <a href="#" className="p-2 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all" aria-label="LinkedIn">
                   <Linkedin size={20} />
                </a>
                <a href="#" className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all" aria-label="GitHub">
                   <Github size={20} />
                </a>
             </div>
          </div>
       </div>
    </footer>

    </div>
  )
}

export default LandingPage
