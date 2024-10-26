import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { setFilteredList, setList } from '../redux/Reducers/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomDropdown from './CustomDropdown';
import { IoMdAddCircleOutline } from "react-icons/io";
import { fetchTasks } from '../apis/taskService';

const TaskList = () => {
    const list = useSelector((state) => state.tasks.list);
    const tasks = useSelector((state) => state.tasks.filteredList);
    const filter = useSelector((state) => state.tasks.filter);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const data = await fetchTasks()
                dispatch(setList(data));
                dispatch(setFilteredList(data))
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally{
                setIsLoading(false);
            }
        };
    
        fetch();
    },[])

    useEffect(() => {
        let updatedList = list;
        if(filter.text !== ""){
            updatedList = updatedList.filter((item) => item.title.toLowerCase().includes(filter.text.toLowerCase()));
        }
        if(filter.status !== ""){
            updatedList = updatedList.filter((item) => item.status === filter.status);
        }
        dispatch(setFilteredList(updatedList));
    },[filter, list])

    return (
        <>
        {isLoading ? (
            <div className="flex justify-center items-center mt-52">
                <div className="h-16 w-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>
        ) : (
        <div className='m-4 p-2 flex flex-col gap-4'>
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
        )}
        {isModelOpen && <TaskForm setIsModelOpen={setIsModelOpen}/>}
        </>
    );
};

export default TaskList;
