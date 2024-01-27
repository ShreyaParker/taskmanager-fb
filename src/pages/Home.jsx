import React, { useState } from 'react';
import Tasks from '../component/Tasks.jsx';
import { useTask } from '../context/TaskContext.jsx';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {useAuth} from "../context/AuthContext.jsx";


const Home = () => {
    const { tasks } = useTask();
    const [filter, setFilter] = useState('all');
    const [dueDateFilter, setDueDateFilter] = useState('');
    const navigate = useNavigate();

    const {user} = useAuth()
    const handleCreate = () => {
        navigate('/create-task');
    };

    const handleResetFilters = () => {
        setFilter('all');
        setDueDateFilter('');
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') {
            return task.status && (!dueDateFilter || moment(task.date.toDate()).isSame(dueDateFilter, 'day'));
        } else if (filter === 'uncompleted') {
            return !task.status && (!dueDateFilter || moment(task.date.toDate()).isSame(dueDateFilter, 'day'));
        } else {
            const taskDate = moment(task.date.toDate());
            return !dueDateFilter || taskDate.isSame(dueDateFilter, 'day');
        }
    });

    return (
        <div>

            {
                user ? (
                    <div className="flex flex-col min-h-screen relative p-4">


                        <div className="flex flex-col sm:flex-row justify-between w-full mt-4 mb-2">
                            <div className="flex flex-col sm:flex-row sm:space-x-2">
                                <button
                                    className={`hover:bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-l mb-2 md:mb-0
                            ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                    onClick={() => setFilter('all')}
                                >
                                    All
                                </button>
                                <button
                                    className={`hover:bg-green-200 text-gray-800 font-bold py-2 px-4 mb-2 md:mb-0
                            ${filter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                                    onClick={() => setFilter('completed')}
                                >
                                    Completed
                                </button>
                                <button
                                    className={`hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-r mb-2 md:mb-0
                            ${filter === 'uncompleted' ? 'bg-gray-500 text-white ' : 'bg-gray-200'}`}
                                    onClick={() => setFilter('uncompleted')}
                                >
                                    Uncompleted
                                </button>
                            </div>
                            <div className="flex justify-between">
                                <input
                                    className="rounded-md p-2  "
                                    type="date"
                                    value={dueDateFilter}
                                    onChange={(e) => setDueDateFilter(e.target.value)}
                                />
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 ml-2 rounded"
                                    onClick={handleResetFilters}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredTasks.map((task) => (
                                <Tasks task={task} key={task.id}/>
                            ))}
                        </div>
                        <div className="fixed bottom-4 right-4 p-4 ">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleCreate}
                            >
                                Create Task
                            </button>
                        </div>

                    </div>
                ) : (
                    <div className="flex flex-col items-center mt-8 ">
                        <h1 className="text-2xl font-semibold mb-4">
                            Welcome to Your Task App!
                        </h1>
                        <p className="text-lg mb-4">
                            To view and manage your tasks, please sign up or log in.
                        </p>
                    </div>
                )
            }
        </div>
    );
};

export default Home;
