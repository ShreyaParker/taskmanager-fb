import Register from "./pages/Register.jsx";
import Navbar from "./component/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Forgotten from "./pages/Forgotten.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";

function App() {
    return (
        <div className="flex flex-col">
            <AuthProvider>
                <TaskProvider>
                    <Router>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/forgot-password" element={<Forgotten />} />
                            <Route path="/create-task" element={<CreateTask />} />
                        </Routes>
                    </Router>
                </TaskProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
