import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import app, { db } from "../firebaseConfig.js";
import { addDoc, collection } from "firebase/firestore";

const Register = () => {
    const [user, setUser] = useState({
        displayName: '',
        email: '',
        password: '',
    });

    const handleRegister = (e) => {
        e.preventDefault();
        const auth = getAuth(app);

        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                const newUser = userCredential.user;


                return updateProfile(newUser, { displayName: user.displayName })
                    .then(() => newUser);
            })
            .then((newUser) => {
                const userCollectionRef = collection(db, 'users');
                return addDoc(userCollectionRef, {
                    displayName: newUser.displayName,
                    uid: newUser.uid,
                    email: newUser.email,
                    createdAt: new Date(),
                });
            })
            .then(() => {
                console.log("User added successfully!");
            })
            .catch((error) => {
                console.error(error.message);
                alert(error.message);
            });
    };


    return (
        <div className="flex flex-col my-48 mx-11 sm:mx-32 p-4 rounded-2xl bg-gray-300 justify-center items-center">
            <h2 className="text-4xl font-extrabold">Register</h2>
            <form onSubmit={handleRegister} className="text-xl gap-3">
                <div className="flex flex-col">
                    <label htmlFor="displayName">Display Name:</label>
                    <input
                        id="displayName"
                        className="rounded-2xl p-2"
                        type="text"
                        placeholder="Display Name"
                        required
                        value={user.displayName}
                        onChange={(e) => setUser({ ...user, displayName: e.target.value })}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        className="rounded-2xl p-2"
                        type="email"
                        placeholder="Email"
                        required
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>
                <div className="flex hover:bg-blue-600 rounded-2xl p-2 justify-center m-3 bg-blue-300">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
