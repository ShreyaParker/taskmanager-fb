import  { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import {Link} from "react-router-dom";

const Forgotten = () => {
    const [email, setEmail] = useState('');
    const [resetSent, setResetSent] = useState(false);
    const [error, setError] = useState(null);

    const handleResetPassword = async () => {
        const auth = getAuth();

        try {
            await sendPasswordResetEmail(auth, email);
            setResetSent(true);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col my-48  mx-11  sm:mx-32 p-4 rounded-2xl bg-gray-300 justify-center items-center">
            <h2 className="text-4xl font-extrabold">Forgot Password</h2>
            {resetSent ? (
                <div>
                    <p className="text-green-600">Password reset email sent. Check your email for further
                        instructions.</p>
                    <Link to="/login">
                        <button>
                            Login
                        </button>

                    </Link>
                </div>
            ) : (
                <form onSubmit={(e) => e.preventDefault()} className="text-xl gap-3">
                <div className="flex flex-col">
                        <label htmlFor="email">Email:</label>
                        <input
                            className="rounded-2xl p-2"
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-red-600">{error}</p>}

                    <div className="flex hover:bg-blue-600 rounded-2xl p-2 justify-center m-3 bg-blue-300">
                        <button onClick={handleResetPassword}>Reset Password</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Forgotten;
