import  { createContext, useContext, useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const taskCollectionRef = collection(db, 'tasks');
        const getAll = onSnapshot(taskCollectionRef, (snapshot) => {
            setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });

        return () => getAll();
    }, []);
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
