import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        list: [],
    },
    reducers: {
        setList: (state, action) => {
            state.list = action.payload;
        },
        addTask:(state, action) => {
            state.list.push(action.payload)
        },
    },
});

export const {
    setList,
    addTask
} = tasksSlice.actions;

export default tasksSlice.reducer;