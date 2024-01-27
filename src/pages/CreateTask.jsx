import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

const CreateTask = () => {
    const [task, setTask] = useState({
        title: "",
        description: "",
        date: "",
    });
    const { user } = useAuth();
    const navigate=useNavigate();

     const currentDate = new Date().toISOString().split("T")[0];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const docRef = collection(db, "tasks");
        const formattedDate = new Date(task.date);
        if (!user) {
            console.error("User not authenticated.");
            return;
        }
        try {
            await addDoc(docRef, {
                title: task.title,
                description: task.description,
                date: formattedDate,
                status: false,
                createdAt: new Date(),
                userId: user.uid,
            });

            console.log("Task added successfully!");
            navigate("/")
        } catch (error) {
            console.error("Error adding task:", error.message);
            alert(error.message)
        }
    };

    return (
        <div className="flex flex-col my-48 mx-11 sm:mx-32 p-4 rounded-2xl bg-gray-300 justify-center items-center">
            <h2 className="text-4xl font-extrabold">Create Task</h2>
            <form onSubmit={handleSubmit} className="text-xl gap-3">
                <div className="flex flex-col">
                    <label htmlFor="taskName">Title:</label>
                    <input
                        id="taskName"
                        type="text"
                        required
                        placeholder="Task Name"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        className="rounded-2xl p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="desc">Description:</label>
                    <input
                        id="desc"
                        type="text"
                        placeholder="Description"
                        required
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                        className="rounded-2xl p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="date">Due Date:</label>
                    <input
                        id="date"
                        type="date"
                        required
                        placeholder="Due Date"
                        value={task.date}
                        onChange={(e) => setTask({ ...task, date: e.target.value })}
                        min={currentDate}
                        className="rounded-2xl p-2"
                    />
                </div>
                <div className="flex hover:bg-blue-600 rounded-2xl p-2 justify-center m-3 bg-blue-300">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;
