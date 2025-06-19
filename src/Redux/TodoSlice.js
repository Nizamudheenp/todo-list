import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todo",
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload)
        },
        editTodo: (state, action) => {
            const { index, newText } = action.payload;
            state[index] = newText;
        },
        deleteTodo: (state, action) => {
            state.splice(action.payload, 1);
        },
    }
})

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer