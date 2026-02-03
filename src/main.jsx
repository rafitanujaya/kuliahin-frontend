import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import "@fontsource/geist";
import "@fontsource/geist/400.css";
import "@fontsource/geist/500.css";
import "@fontsource/geist/600.css";
import './index.css'
import { registerSW } from "virtual:pwa-register"
import LandingPage from '@/pages/LandingPage'; 
import { Toaster } from 'sonner';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage'; 
import RegisterPage from '@/pages/RegisterPage';
import AppLayout from '@/layouts/AppLayout'; 
import DashboardPage from '@/pages/DashboardPage';
import SchedulePage from '@/pages/SchedulePage';
import { TodoPage } from '@/pages/TodoPage'; 
import { TaskPage } from '@/pages/TaskPage'; 
import { CommingSoonPage } from '@/pages/CommingSoonPage'; 
import { SettingPage } from '@/pages/SettingPage'; 
import { LearningPage } from '@/pages/LearningPage'; 
import { LearningDetailPage } from '@/pages/LearningDetailPage'; 
import { ProtectedRoute } from '@/middleware/ProtectedRoute';
import { UserProvider } from '@/context/UserContext';
import { LoginGooglePage } from '@/pages/LoginGooglePage';

registerSW({
  immediate: true,
  onOfflineReady() {
    console.log("PWA ready offline");
  },
  onNeedRefresh() {
    console.log("New version available");
  },
});

createRoot(document.getElementById('root')).render(
     <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='/login/google' element={<LoginGooglePage/>}/>
        <Route path='/register' element={<RegisterPage/>} />
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/jadwal" element={<SchedulePage/>} />
          {/* <Route path="/notifikasi" element={<NotificationPage/>} /> */}
          <Route path="/todo" element={<TodoPage/>} />
          <Route path="/tugas" element={<TaskPage/>} />
          <Route path="/learning" element={<LearningPage/>} />
          <Route path="/learning/:roomId" element={<LearningDetailPage />} />
          <Route path="/statistik" element={<CommingSoonPage title={'Statistik'}/>} />
          <Route path="/pengaturan" element={<SettingPage/>} />
        </Route>
      </Routes>
      <Toaster richColors />
    </BrowserRouter>
    </UserProvider>

)
