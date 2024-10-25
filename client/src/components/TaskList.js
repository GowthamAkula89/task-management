import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { setList } from '../redux/Reducers/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../apis/taskService';

const TaskList = ({ tasks }) => {
    const list = useSelector((state) => state.tasks.list);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const dispatch = useDispatch()

    const handleDelete = async (id) => {
        console.log("Task List", "delete clicked")
        try{
            await deleteTask(id);
            const updatedList = list.filter((item) => item._id !== id);
            dispatch(setList(updatedList));
        }catch(error){
            console.log("Delete Failed:", error);
        }
    }

    return (
        <>
        <div className='m-4 flex flex-col gap-4'>
            <div className='flex justify-end'>
                <button className='bg-green-500 p-2 text-white rounded-lg cursor-pointer' 
                    onClick={() => setIsModelOpen(true)}
                >
                   <span className='text-lg font-bold'>+</span> Create Task
                </button>
            </div>
            <div className="task-list grid gap-4  
                grid-cols-1 
                md:grid-cols-2 
                lg:grid-cols-3">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No tasks available</p>
                )}
            </div>
        </div>
        {isModelOpen && <TaskForm setIsModelOpen={setIsModelOpen}/>}
        </>
    );
};

export default TaskList;
