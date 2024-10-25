import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { BsHourglassSplit, BsCheckCircle, BsPlayCircle } from 'react-icons/bs';
import TaskForm from './TaskForm';
import { deleteTask } from '../apis/taskService';
import { useSelector, useDispatch } from 'react-redux';
import { setList } from '../redux/Reducers/tasksSlice';
import { useSnackbar } from 'notistack';

const TaskItem = ({ task }) => {
    const list = useSelector((state) =>  state.tasks.list)
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return <BsHourglassSplit className="text-yellow-500" />;
            case 'in progress':
                return <BsPlayCircle className="text-blue-500" />;
            case 'completed':
                return <BsCheckCircle className="text-green-500" />;
            default:
                return null;
        }
    };

    const getStatusLabel = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return <span className="text-yellow-600">Pending</span>;
            case 'in progress':
                return <span className="text-blue-600">In Progress</span>;
            case 'completed':
                return <span className="text-green-600">Completed</span>;
            default:
                return null;
        }
    };

    const handleDelete = async (id) => {
        setIsLoading(true)
        try{
            await deleteTask(id);
            const updatedList = list.filter((item) => item._id !== id);
            dispatch(setList(updatedList));
            enqueueSnackbar('Task deleted successfully!', { variant: 'success' });
        }catch(error){
            console.log("Delete Failed:", error);
            enqueueSnackbar('Delete Failed', { variant: 'error' });
        }
        setIsLoading(false)
    }

    return (
        <>
        <div className=" task-item flex justify-between gap-2 items-start h-full border p-4 shadow-lg rounded-lg bg-white hover:bg-gray-100 transition-all duration-300 ease-in-out">

            <div className='flex flex-col gap-2 justify-between h-full'>
                <div className='flex flex-col gap-2'>
                    <div className="font-bold text-lg">{task.title}</div>
                    <p className="text-sm text-gray-600">{task.description}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Status: </span>
                    {getStatusIcon(task.status)} {getStatusLabel(task.status)}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="icon-button text-blue-600 hover:text-blue-800 transition"
                    onClick={() => setIsEditFormOpen(true)}
                >
                    <FaEdit size={18} />
                </button>
                {isLoading ? (
                     <div className="h-4 w-4 border-2 border-t-transparent border-red-500 rounded-full animate-spin"></div>
                ) : (
                <button className="icon-button hover:text-red-600 text-gray-400 transition"
                    onClick={() => handleDelete(task._id)}
                >
                    <FaTrash size={18} />
                </button>
                )}
            </div>
        </div>
        {isEditFormOpen && <TaskForm setIsEditFormOpen={setIsEditFormOpen} isEdit = {true} task = {task}/>}
        </>
    );
};

export default TaskItem;
