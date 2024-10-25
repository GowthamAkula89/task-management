import { useState } from "react";
import { createTask } from "../apis/taskService";
import { setList } from "../redux/Reducers/tasksSlice";
import { useDispatch } from "react-redux";

const TaskForm = ({setIsModelOpen}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");
    const dispatch = useDispatch();

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const newTask = {title, description, status};
            const data = await createTask(newTask)
            dispatch(setList(data));
        }catch(err){
            console.log("Error in Creating Task", err)
        }
        setIsModelOpen(false)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="relative flex flex-col gap-2 bg-white p-5 pt-16 rounded-lg w-full md:w-2/3 lg:w-1/2">
                <button className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-3xl font-bold"
                    onClick={() => setIsModelOpen(false)}
                >
                    &times;
                </button>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="text" placeholder="Enter Title" 
                        className="p-2 border-2 border-black outline-none rounded-sm"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea placeholder="Description"
                        className="w-full h-24 border-2 p-2 border-black outline-none rounded-sm" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex w-full items-center gap-2">
                        <label className="text-xl">Status:</label>
                        <select value={status}
                            className="p-2 border-2 border-black outline-none rounded-sm flex-1"
                            onChange={(e) => handleStatusChange(e)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button  type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
    )
}
export default TaskForm;