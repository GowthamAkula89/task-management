import { useState, useEffect } from "react";
import { createTask, editTask } from "../apis/taskService";
import { setList, addTask } from "../redux/Reducers/tasksSlice";
import { useDispatch, useSelector } from "react-redux";

const TaskForm = ({ setIsModelOpen, setIsEditFormOpen, isEdit, task }) => {
    const list = useSelector((state) => state.tasks.list);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    

    useEffect(() => {
        if (isEdit && task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
    }, [isEdit, task]);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newTask = { title, description, status };

        try {
            if (isEdit && task) {
                // If editing
                await editTask(task._id, newTask);
                const updatedList = list.map((item) => item._id === task._id ? { ...item, ...newTask } : item);
                dispatch(setList(updatedList));
            } else {
                // If creating
                const data = await createTask(newTask);
                dispatch(addTask(data));
            }
        } catch (err) {
            console.log("Error in submitting task", err);
        }
        setIsLoading(false)
        isEdit ? setIsEditFormOpen(false) : setIsModelOpen(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="relative flex flex-col gap-2 bg-white p-5 pt-16 rounded-lg w-full md:w-2/3 lg:w-1/2">
                <button className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-3xl font-bold"
                    onClick={() => (isEdit ? setIsEditFormOpen(false) : setIsModelOpen(false))}
                >
                    &times;
                </button>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="text" placeholder="Enter Title"
                        className="p-2 border-2 border-black outline-none rounded-sm"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea placeholder="Description" className="w-full h-24 border-2 p-2 border-black outline-none rounded-sm"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex w-full items-center gap-2">
                        <label className="text-xl">Status:</label>
                        <select className="p-2 border-2 border-black outline-none rounded-sm flex-1"
                            value={status}
                            onChange={handleStatusChange}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex justify-end mt-4">
                        {isLoading ? (
                            <div className="px-4 py-2 bg-green-500 rounded-md flex items-center justify-center">
                                <div className="h-6 w-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                                type="submit"
                            >
                                {isEdit ? "Update" : "Create"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
