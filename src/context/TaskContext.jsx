import { createContext, useContext, useEffect, useState } from 'react';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import { useAuth } from './AuthContext.jsx';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchTasks = async () => {
            if (user) {
                const taskCollectionRef = collection(db, 'tasks');
                const userTasksQuery = query(taskCollectionRef, where('userId', '==', user.uid));

                const getAll = onSnapshot(userTasksQuery, (snapshot) => {
                    setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                });

                return () => getAll();
            } else {
                setTasks([]);
            }
        };

        fetchTasks();
    }, [user]);

    return (
        <TaskContext.Provider value={{ tasks }}>
            {children}
        </TaskContext.Provider>
    );
};

const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTask must be used within a TaskProvider');
    }
    return context;
};

export { TaskProvider, useTask };
