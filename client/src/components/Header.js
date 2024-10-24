import { useState, useEffect } from "react";
import { GoTasklist } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredList } from "../redux/Reducers/tasksSlice";

const Header = () => {
    const list = useSelector((state) => state.tasks.list);
    const [searchText, setSearchText] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(searchText);
    const dispatch = useDispatch();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchText);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchText]);

    useEffect(() => {
        handleSearch();
    }, [debouncedSearch]);

    const handleSearch = () => {
        const filteredTasks = list.filter((task) =>
            task.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
        dispatch(setFilteredList(filteredTasks));
    };

    return (
        <header className="bg-gradient-to-r from-green-700 to-green-900 p-3 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <GoTasklist className="text-3xl text-white" />
                    <h1 className="text-white text-lg md:text-2xl font-semibold">Task Manager</h1>
                </div>
                <div className="relative w-1/2">
                    <input
                        type="text"
                        value={searchText}
                        placeholder="Search tasks..."
                        className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <IoIosSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-6 h-6" />
                </div>
            </div>
        </header>
    );
};

export default Header;
