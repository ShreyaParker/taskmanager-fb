import  { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import app from "../firebaseConfig.js"

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    let navigate = useNavigate();
    const {login} = useAuth()
    const handleLogin =  (e) => {
        e.preventDefault()
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then( (userCredential)=> {
                const loggedInUser = userCredential.user;
                console.log(loggedInUser)
                login(loggedInUser)
                navigate("/")
            }

    ).catch(error => console.log(error))
    };

    return (
        <div className="flex flex-col my-48 mx-32 p-4 rounded-2xl bg-gray-300 justify-center items-center">
            <h2 className="text-4xl font-extrabold">Login</h2>
            <form onSubmit={handleLogin} className="text-xl gap-3">
                <div className="flex flex-col">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        className="rounded-2xl p-2"
                        type="email"
                        placeholder="Email"
                        required
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        className="rounded-2xl p-2"
                        type="password"
                        placeholder="Password"
                        required
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                </div>


                <Link to="/forgot-password">
                    <h1>

                        Forgot Password
                    </h1>
                </Link>
                <div className="flex hover:bg-blue-600 rounded-2xl p-2 justify-center m-3 bg-blue-300">
                    <button onClick={handleLogin}>Submit</button>
                </div>

            </form>
        </div>
    );
};

export default Login;
