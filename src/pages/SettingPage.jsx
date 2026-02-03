import { useEffect, useState } from 'react';
import { 
  Bell, 
  User, 
  CheckCircle2,
  Shield, // Icon baru
  Palette, // Icon baru
  Moon, // Icon baru
  Sun // Icon baru
} from 'lucide-react';
import { getDetailApi, updatePasswordApi, updatePreferenceApi, updateProfileApi } from '@/api/userApi';
import { toast } from 'sonner';
import { useUser } from '@/hooks/useUser';
import { subscribePushNotification } from '@/pwa/subscribePush';
import { testSubscribeApi } from '@/api/subscribeApi';
  
export const SettingPage = () => {
   const { refreshUser, user } = useUser()
    const [preferences, setPreferences] = useState({
      notifDeadline: false,
      notifSchedule: false,
    });

   const [notifPermission, setNotifPermission] = useState(
  typeof Notification !== "undefined"
    ? Notification.permission
    : "default"
);


const handleEnableMainNotification = async () => {
  if (!("serviceWorker" in navigator)) {
    toast.error("Browser tidak mendukung notifikasi");
    return;
  }

  try {
    let permission = Notification.permission;

    if (permission === "default") {
      permission = await Notification.requestPermission();
    }

    if (permission !== "granted") {
      toast.error("Notifikasi tidak diizinkan");
      return;
    }

    const registration = await navigator.serviceWorker.ready;

    if (!navigator.serviceWorker.controller) {
      toast.error("Service worker belum siap, coba refresh PWA");
      return;
    }

    await subscribePushNotification(registration);

    setNotifPermission("granted");
    toast.success("Notifikasi aktif 🔔");
  } catch (err) {
    console.error("[PUSH ERROR]", err);
    toast.error("Gagal mengaktifkan notifikasi");
  }
};

    const [passwordError, setPasswordError] = useState({})

    const [loading, setLoading] = useState(true)

   const [profileForm, setProfileForm] = useState({
      fullname: "",
      major: "",
      semester: 1,
   })

   const [passwordForm, setPasswordForm] = useState({
      current: "",
      new: "",
      confirm: "",
   })

   useEffect(() => {
      const loadProfile = async () => {
         try {
            const res = await getDetailApi()
            console.log(res);

            setProfileForm({
               fullname: res.data.fullname,
               major: res.data.major,
               semester: res.data.semester,
            })
            setPreferences({
            notifDeadline: res.data.notifDeadline,
            notifSchedule: res.data.notifSchedule,
            })
         } catch {
            toast.error("Gagal memuat preferensi")
         } finally {
            setLoading(false)
         }
      }

      loadProfile()
      }, [])

      const handleSaveProfile = async () => {
         
         try {
            profileForm.major = profileForm.major || '-'
            profileForm.semester = profileForm.semester || 1
            await updateProfileApi(profileForm)
            await refreshUser()
            toast.success("Profil berhasil diperbarui")
         } catch {
            toast.error("Gagal menyimpan profil")
         }
      }

      const handleChangePassword = async () => {
         setPasswordError({})
         const errors = {}

         if (!passwordForm.current) {
            errors.current = "Password saat ini wajib diisi"
         }else if (passwordForm.current.length < 8) {
            errors.current = "Password minimal 8 karakter"
         }

         if (!passwordForm.new) {
            errors.new = "Password baru wajib diisi"
         } else if (passwordForm.new.length < 8) {
            errors.new = "Password minimal 8 karakter"
         }

         if (!passwordForm.confirm) {
            errors.confirm = "Konfirmasi password wajib diisi"
         } else if (passwordForm.new !== passwordForm.confirm) {
            errors.confirm = "Password tidak sama"
         }

         if (Object.keys(errors).length > 0) {
            setPasswordError(errors)
            return
         }

         try {
            await updatePasswordApi({
            passwordCurrent: passwordForm.current,
            passwordNew: passwordForm.new,
            })

            toast.success("Password berhasil diganti")
            setPasswordForm({ current: "", new: "", confirm: "" })
         } catch {
            toast.error("Password lama salah")
         }
      }

      const handlePasswordChange = (field) => (e) => {
         setPasswordForm((prev) => ({ ...prev, [field]: e.target.value }))
         setPasswordError((prev) => ({ ...prev, [field]: null }))
      }


      const handleTogglePreference = async (key) => {
         const newValue = !preferences[key]
         console.log(key);

         setPreferences((prev) => ({ ...prev, [key]: newValue }))

         try {
            await updatePreferenceApi({ [key]: newValue })
         } catch {
            toast.error("Gagal menyimpan preferensi")
            setPreferences((prev) => ({ ...prev, [key]: !newValue }))
         }
      }

      if (loading) {
         return <div className="p-8 text-slate-400">Memuat pengaturan...</div>
      }


    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Pengaturan</h1>
          <p className="text-slate-500 mt-1">Sesuaikan profil dan preferensi aplikasimu.</p>
        </div>

        <div className="">
          
          <div className="my-6 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="w-18 h-18 text-2xl bg-linear-to-br mx-auto from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-md">
              {user?.avatarInitial}
            </div>
              <h2 className="text-lg font-bold text-slate-900 capitalize">{profileForm.fullname}</h2>
              <p className="text-slate-500 text-sm capitalize">{profileForm.major}</p>
              <div className="mt-4 flex justify-center">
                 <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold border border-indigo-100">
                     Semester {profileForm.semester ? profileForm.semester : '-' }
                 </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            
            {/* Bagian Profil */}
            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
               <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                 <User size={20} className="text-indigo-600"/> Informasi Akun
               </h3>
               <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Nama Lengkap</label>
                        <input type="text" placeholder='Nama Lengkap..' value={profileForm.fullname} onChange={e => setProfileForm({...profileForm, fullname: e.target.value})}
                          className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Jurusan</label>
                        <input type="text" placeholder='Jurusan..' value={profileForm.major} onChange={e => setProfileForm({...profileForm, major: e.target.value})}
                          className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                     </div>
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Semester</label>
                      <select value={profileForm.semester} onChange={e => setProfileForm({...profileForm, semester: Number(e.target.value)})}
                        className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 capitalize">
                         {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                           <option key={s} value={s}>
                              Semester {s}
                           </option>
                           ))}
                      </select>
                  </div>
                  <div className="pt-2 text-right">
                     <button onClick={handleSaveProfile} className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors">
                        Simpan Perubahan
                     </button>
                  </div>
               </div>
            </section>

            {/* Bagian Keamanan (Ganti Password) */}
            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
               <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                 <Shield size={20} className="text-emerald-600"/> Keamanan
               </h3>
               <div className="space-y-4">
               {/* PASSWORD SAAT INI */}
               <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                     Password Saat Ini
                  </label>
                  <input
                     type="password"
                     placeholder="••••••••"
                     value={passwordForm.current}
                     onChange={handlePasswordChange("current")}
                     className={`w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2
                     ${
                        passwordError.current
                           ? "border-red-500 bg-red-50 text-red-600 focus:ring-red-200"
                           : "border-slate-300 focus:ring-indigo-100"
                     }
                     `}
                  />
                  {passwordError.current && (
                     <p className="mt-1 text-xs text-red-500">
                     {passwordError.current}
                     </p>
                  )}
               </div>

               {/* PASSWORD BARU + KONFIRMASI */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-xs font-bold text-slate-500 mb-1">
                     Password Baru
                     </label>
                     <input
                     type="password"
                     placeholder="••••••••"
                     value={passwordForm.new}
                     onChange={handlePasswordChange("new")}
                     className={`w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2
                        ${
                           passwordError.new
                           ? "border-red-500 bg-red-50 text-red-600 focus:ring-red-200"
                           : "border-slate-300 focus:ring-indigo-100"
                        }
                     `}
                     />
                     {passwordError.new && (
                     <p className="mt-1 text-xs text-red-500">
                        {passwordError.new}
                     </p>
                     )}
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-500 mb-1">
                     Konfirmasi Password
                     </label>
                     <input
                     type="password"
                     placeholder="••••••••"
                     value={passwordForm.confirm}
                     onChange={handlePasswordChange("confirm")}
                     className={`w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2
                        ${
                           passwordError.confirm
                           ? "border-red-500 bg-red-50 text-red-600 focus:ring-red-200"
                           : "border-slate-300 focus:ring-indigo-100"
                        }
                     `}
                     />
                     {passwordError.confirm && (
                     <p className="mt-1 text-xs text-red-500">
                        {passwordError.confirm}
                     </p>
                     )}
                  </div>
               </div>

               {/* BUTTON */}
               <div className="pt-2 text-right">
                  <button
                     onClick={handleChangePassword}
                     className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 hover:text-slate-800 transition-colors"
                  >
                     Ganti Password
                  </button>
               </div>
               </div>

            </section>

            {/* Bagian Tampilan (Tema) */}
            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
               <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                 <Palette size={20} className="text-pink-500"/> Tampilan Aplikasi
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  {/* Light Mode (Active) */}
                  <div className="border-2 border-indigo-600 bg-indigo-50/50 p-4 rounded-xl cursor-pointer relative group transition-all">
                      <div className="absolute top-3 right-3 text-indigo-600">
                          <CheckCircle2 size={20} fill="currentColor" className="text-white" />
                      </div>
                      <div className="flex flex-col items-center justify-center py-4">
                          <Sun size={32} className="text-indigo-500 mb-2" />
                          <p className="font-bold text-sm text-indigo-900">Mode Terang</p>
                          <span className="text-[10px] text-indigo-400 font-medium">Aktif</span>
                      </div>
                  </div>

                  {/* Dark Mode (Disabled) */}
                  <div className="border border-slate-200 bg-slate-50 p-4 rounded-xl relative opacity-60 cursor-not-allowed">
                      <div className="absolute top-2 right-2 bg-slate-200 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          Segera
                      </div>
                      <div className="flex flex-col items-center justify-center py-4 grayscale">
                          <Moon size={32} className="text-slate-400 mb-2" />
                          <p className="font-bold text-sm text-slate-500">Mode Gelap</p>
                          <span className="text-[10px] text-slate-400 font-medium">Tidak tersedia</span>
                      </div>
                  </div>
               </div>
            </section>

            <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
               <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                 <Bell size={20} className="text-rose-500"/> Notifikasi
               </h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50">
                     <div>
                     <h4 className="text-sm font-bold text-slate-800">
                        Notifikasi Aplikasi
                     </h4>
                     <p className="text-xs text-slate-500">
                        Izinkan aplikasi mengirim notifikasi ke perangkatmu.
                     </p>
                     </div>

                     {notifPermission === "granted" ? (
                     <span className="text-xs font-bold text-emerald-600">
                        Aktif
                     </span>
                     ) : (
                     <button
                        onClick={handleEnableMainNotification}
                        className="px-3 py-1.5 cursor-pointer text-xs font-bold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                     >
                        Aktifkan
                     </button>
                     )}
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                     <div>
                        <h4 className="text-sm font-bold text-slate-800">Deadline Tugas</h4>
                        <p className="text-xs text-slate-500">Ingatkan 1 hari sebelum tenggat waktu.</p>
                     </div>
                     <button onClick={() => handleTogglePreference('notifDeadline')} className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 ${preferences.notifDeadline ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                        <div className={`w-4 h-4 bg-white cursor-pointer rounded-full transition-transform ${preferences.notifDeadline ? 'translate-x-5' : ''}`}></div>
                     </button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                     <div>
                        <h4 className="text-sm font-bold text-slate-800">Jadwal Kuliah</h4>
                        <p className="text-xs text-slate-500">Notifikasi 30 menit sebelum kelas dimulai.</p>
                     </div>
                     <button onClick={() => handleTogglePreference('notifSchedule')} className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 ${preferences.notifSchedule ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                        <div className={`w-4 h-4 bg-white cursor-pointer rounded-full transition-transform ${preferences.notifSchedule ? 'translate-x-5' : ''}`}></div>
                     </button>
                  </div>
                  <div className="flex justify-end">
                     <button
                        onClick={async () => {
                           try {
                           await testSubscribeApi();
                           toast.success("Push test dikirim 🚀");
                           } catch {
                           toast.error("Gagal kirim push test");
                           }
                        }}
                        className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                     >
                        Test Notifikasi
                     </button>
                  </div>
               </div>
            </section>
          </div>
        </div>
      </div>
    );
}
  

