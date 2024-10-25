import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { setFilteredList } from '../redux/Reducers/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomDropdown from './CustomDropdown';
import { IoMdAddCircleOutline } from "react-icons/io";

const TaskList = () => {
    const list = useSelector((state) => state.tasks.list);
    const tasks = useSelector((state) => state.tasks.filteredList);
    const filter = useSelector((state) => state.tasks.filter);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        let updatedList = list;
        if(filter.text !== ""){
            updatedList = updatedList.filter((item) => item.title.includes(filter.text));
        }
        if(filter.status !== ""){
            updatedList = updatedList.filter((item) => item.status === filter.status);
        }
        dispatch(setFilteredList(updatedList));
    },[filter, list])

    return (
        <>
        <div className='m-4 flex flex-col gap-4'>
            <div className='flex justify-between'>
                <CustomDropdown />
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transform transition duration-200 ease-in-out hover:scale-105 cursor-pointer"
                    onClick={() => setIsModelOpen(true)}
                >
                <span><IoMdAddCircleOutline className='w-5 h-5'/></span>Create Task
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
