import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { LoginPage } from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";
import { TaskProvider } from "./context/tasksContext";
import { SoliProvider } from "./context/SolicitudContext";
import {RegisterSolicitudPage} from "./pages/RegisterSolicitudPage";
import {SolicitudPage} from "./pages/SolicitudPage";



function App() {
  return (
    <AuthProvider>
      <TaskProvider>
      <SoliProvider>
      <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/soli" element={<RegisterSolicitudPage />} />
                <Route path="/soliPager" element={<SolicitudPage/>} />
                <Route path="/tecnico" element={<SolicitudPage/>} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </SoliProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
