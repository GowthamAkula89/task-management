import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        list: [],
        filteredList : []
    },
    reducers: {
        setList: (state, action) => {
            state.list = action.payload;
        },
        addTask:(state, action) => {
            state.list.push(action.payload)
        },
        setFilteredList: (state, action) => {
            state.filteredList = action.payload
        }
    },
});

export const {
    setList,
    addTask,
    setFilteredList
} = tasksSlice.actions;

export default tasksSlice.reducer;