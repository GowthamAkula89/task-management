import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { setfilterStatus } from '../redux/Reducers/tasksSlice';
import { useDispatch } from 'react-redux';
const options = ["Pending", "In Progress", "Completed"]

const CustomDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const dispatch = useDispatch()

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        dispatch(setfilterStatus(option));
        setIsOpen(false);
    };


    return (
        <div className="relative inline-block w-40 md:w-52 ">
        <div 
            className="w-full p-2 bg-gray-100 text-end rounded-sm cursor-pointer flex items-center justify-between"
            onClick={() => setIsOpen(!isOpen)}
        >
            {selectedOption || 'Filter'}
            {isOpen ? (
                <IoIosArrowUp className="ml-2 text-gray-500" />
            ) : (
                <IoIosArrowDown className="ml-2 text-gray-500" />
            )}
        </div>    

        {isOpen && (
            <div className="absolute w-full bg-white shadow-lg rounded mt-1 z-10 p-2 flex flex-col items-end">
                {options.map((option, index) => (
                    <div className={`p-2 w-full text-right font-medium text-gray-700 hover:bg-gray-200 cursor-pointer ${
                        option === selectedOption ? 'font-bold' : ''}`}
                        key={index}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option === selectedOption && <FaCheck className="text-green-500 mr-2 inline-block" />}
                        {option}
                    </div>
                ))}
                <div className={`p-2 w-full text-right font-medium text-gray-700 hover:bg-gray-200 cursor-pointer ${
                        selectedOption === '' ? 'font-bold' : ''}`}
                    onClick={() => handleOptionClick('')}
                >
                    None
                </div>
            </div>
            )}
        </div>
    );
};

export default CustomDropdown;
