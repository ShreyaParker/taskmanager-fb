import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
    const { user, logout } = useAuth();

    const navigate = useNavigate();

    return (
        <nav className="bg-blue-300 p-5 flex flex-row justify-between">
            <Link to="/">
                <h1>Home</h1>
            </Link>

            <div className="flex gap-2">
                {user ? (
                    <div className="flex gap-2">
                        <h1>{user?.displayName}</h1>
                        <button onClick={() => logout()}>Logout</button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={() => navigate("/register")}>Register</button>
                        <button onClick={() => navigate("/login")}>Login</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
