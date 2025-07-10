import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AffiliateLinkProvider } from "./context/Affiliate_linksContext";
import { TaskProvider } from "./context/TasksContext";



import MainLayout from "./layouts/MainLayout";


import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";


function App() {
  return (
    <AuthProvider>
      <TaskProvider>
          <BrowserRouter>
            <Routes>
        

              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
             

                  <Route path="/tasks" element={<TaskPage />} />
                  <Route path="/add-task" element={<TaskFormPage />} />
                  <Route path="/tasks/:id" element={<TaskFormPage />} />


                  <Route path="/profile" element={<ProfilePage />} />
                 
              </Route>
            </Routes>
          </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
