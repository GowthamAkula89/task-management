import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = ({ tasks, onDelete, onEdit }) => {
    const [isModelOpen, setIsModelOpen] = useState(false);
    return (
        <>
        <div className='m-4'>
            <div className='flex justify-end'>
                <button className='bg-green-500 px-2 py-1 rounded-lg cursor-pointer' 
                    onClick={() => setIsModelOpen(true)}
                >
                    Create Task
                </button>
            </div>
            <div className="task-list grid gap-4  
                grid-cols-1 
                sm:grid-cols-1 
                md:grid-cols-2 
                lg:grid-cols-3">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onDelete={onDelete}
                            onEdit={onEdit}
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
