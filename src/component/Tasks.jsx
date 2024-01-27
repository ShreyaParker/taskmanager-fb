import React, { useState} from 'react';
import moment from 'moment';
import {updateDoc, doc,deleteDoc} from 'firebase/firestore';
import { db } from '../firebaseConfig.js';

const TaskCards = ({ task }) => {
    const formattedDate = moment(task.date.toDate()).format('DD MMMM YYYY');
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState({ title: task.title, description: task.description });

    const handleUpdateTask = async () => {
        try {
            await updateDoc(doc(db, 'tasks', task.id), updatedTask);
            setIsEditing(false);

        } catch (error) {
            console.error('Error updating task:', error.message);

        }
    };







    const handleDeleteTask = async (e) => {
        e.preventDefault()
        try {
            await deleteDoc(doc(db, 'tasks', task.id))

        } catch (error) {
            console.error('Error deleting task:', error.message);

        }
    };
    const handleCheckboxChange = async () => {
         const taskDocRef = doc(db, 'tasks', task.id);
        await updateDoc(taskDocRef, {
            status: !task.status,
        });
    };

    return (
        <div className={`p-5 ${task.status ? 'bg-green-300' : 'bg-gray-300'}`}>
            {!isEditing ? (
                <div>
                    <h1 className="font-extrabold text-2xl">{task.title}</h1>
                    <p>{task.description}</p>
                    <p>Date: {formattedDate}</p>

                    <div className="flex items-center mt-2">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={task.status}
                                onChange={handleCheckboxChange}
                                className="form-checkbox h-5 w-5 text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">Completed</span>
                        </label>
                    </div>
                    <div className="flex flex-row gap-3 mt-2">
                        <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-3 py-1 rounded">
                            Update Task
                        </button>

                        <button onClick={handleDeleteTask} className="bg-red-500 text-white px-3 py-1 rounded">
                            Delete Task
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title:
                        </label>
                        <input
                            type="text"
                            value={updatedTask.title}
                            onChange={(e) => setUpdatedTask({...updatedTask, title: e.target.value})}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description:
                        </label>
                        <input
                            type="text"
                            value={updatedTask.description}
                            onChange={(e) => setUpdatedTask({...updatedTask, description: e.target.value})}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={handleUpdateTask} className="bg-green-500 text-white px-3 py-1 rounded">
                            Save
                        </button>
                        <button onClick={() => setIsEditing(false)}
                                className="bg-gray-500 text-white px-3 py-1 rounded">
                            Cancel
                        </button>
                    </div>
                </div>
            )}


        </div>

    );
};

export default TaskCards;
