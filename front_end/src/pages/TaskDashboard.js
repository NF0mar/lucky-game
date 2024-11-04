import React, { useState, useEffect } from 'react';
import api from '../api/taskApi';

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ name: '', priority: 'Normal', dueDate: '' });

    useEffect(() => {
        fetchTasks();
    }, []);

    // Fetch Tasks
    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
           
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Add Task
    const addTask = async () => {
        try {
            const res = await api.post('/tasks', newTask);
            setTasks([...tasks, res.data]);
            setNewTask({ name: '', priority: 'Normal', dueDate: '' });
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // Delete Task
    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>

            {/* Task Form */}
            <div className="mb-4">
                <input 
                    type="text" 
                    placeholder="Task name" 
                    value={newTask.name}
                    onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                    className="border p-2 mr-2 rounded"
                />
                <select 
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="border p-2 mr-2 rounded"
                >
                    <option value="High">High</option>
                    <option value="Normal">Normal</option>
                    <option value="Low">Low</option>
                </select>
                <input 
                    type="date" 
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="border p-2 mr-2 rounded"
                />
                <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
            </div>

            {/* Task List */}
            <ul className="space-y-2">
                {tasks.map(task => (
                    <li key={task._id} className="flex items-center justify-between bg-white p-4 rounded shadow">
                        <span>{task.name}</span>
                        <span className={`text-${task.priority === 'High' ? 'red' : task.priority === 'Normal' ? 'yellow' : 'green'}-500`}>
                            {task.priority}
                        </span>
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                        <button onClick={() => deleteTask(task._id)} className="text-red-500">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskDashboard;


























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TaskDashboard = () => {
//     const [tasks, setTasks] = useState([]);
//     const [newTask, setNewTask] = useState({ name: '', priority: 'Normal', dueDate: '' });

//     useEffect(() => {
//         fetchTasks();
//     }, []);

//     const fetchTasks = async () => {
//         const res = await axios.get('http://localhost:5000/tasks');
//         setTasks(res.data);
//     };

//     const addTask = async () => {
//         const res = await axios.post('http://localhost:5000/tasks', newTask);
//         setTasks([...tasks, res.data]);
//         setNewTask({ name: '', priority: 'Normal', dueDate: '' });
//     };

//     const deleteTask = async (id) => {
//         await axios.delete(`http://localhost:5000/tasks/${id}`);
//         setTasks(tasks.filter(task => task._id !== id));
//     };

//     return (
//         <div className="p-6 bg-gray-50 min-h-screen">
//             <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
            
//             {/* Task Form */}
//             <div className="mb-4">
//                 <input 
//                     type="text" 
//                     placeholder="Task name" 
//                     value={newTask.name}
//                     onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
//                     className="border p-2 mr-2 rounded"
//                 />
//                 <select 
//                     value={newTask.priority}
//                     onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
//                     className="border p-2 mr-2 rounded"
//                 >
//                     <option value="High">High</option>
//                     <option value="Normal">Normal</option>
//                     <option value="Low">Low</option>
//                 </select>
//                 <input 
//                     type="date" 
//                     value={newTask.dueDate}
//                     onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
//                     className="border p-2 mr-2 rounded"
//                 />
//                 <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
//             </div>

//             {/* Task List */}
//             <ul className="space-y-2">
//                 {tasks.map(task => (
//                     <li key={task._id} className="flex items-center justify-between bg-white p-4 rounded shadow">
//                         <span>{task.name}</span>
//                         <span className={`text-${task.priority === 'High' ? 'red' : task.priority === 'Normal' ? 'yellow' : 'green'}-500`}>
//                             {task.priority}
//                         </span>
//                         <span>{new Date(task.dueDate).toLocaleDateString()}</span>
//                         <button onClick={() => deleteTask(task._id)} className="text-red-500">Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default TaskDashboard;
