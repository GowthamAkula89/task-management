import { useState, useEffect } from "react";
import { GoTasklist } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setfilterText } from "../redux/Reducers/tasksSlice";

const Header = () => {

    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(setfilterText(searchText));
        }, 1000);

        return () => clearTimeout(handler);
    }, [searchText, dispatch]);


    return (
        <header className="header p-3 shadow-lg">
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
