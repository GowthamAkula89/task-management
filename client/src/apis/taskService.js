import axios from 'axios';
const API_URL = process.env.REACT_APP_API;

export const fetchTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks`);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : 'Failed to fetch tasks');
    }
};

export const createTask = async (task) => {
    try {
        const response = await axios.post(`${API_URL}/tasks`, task);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data : 'Failed to create task');
    }
};