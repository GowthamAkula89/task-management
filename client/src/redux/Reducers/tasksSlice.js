import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        list: [],
        filteredList : [],
        filter :{
            text:"",
            status:""
        }
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
        },
        setfilterText: (state, action) => {
            state.filter.text = action.payload
        },
        setfilterStatus: (state, action) => {
            state.filter.status = action.payload
        }
    },
});

export const {
    setList,
    addTask,
    setFilteredList,
    setfilterText,
    setfilterStatus
} = tasksSlice.actions;

export default tasksSlice.reducer;