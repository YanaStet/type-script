import { createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  descr?: string;
  done: boolean;
  deadline?: Date;
}

interface TodoState {
  todos: Todo[];
  filter: string;
}

const initialState: TodoState = {
  todos: [
    {
      id: 1,
      text: "Do dishes",
      descr: undefined,
      done: false,
      deadline: new Date(2025, 8, 9, 15, 30, 0),
    },
  ],
  filter: "All",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((item) => action.payload !== item.id);
    },
    changeTodo: (state, action) => {
      state.todos = state.todos.map((item) =>
        action.payload === item.id ? { ...item, done: !item.done } : item
      );
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
    editTodo: (state, action) => {
      state.todos = state.todos.map((item) =>
        action.payload.id === item.id ? action.payload.data : item
      );
    },
  },
});

export const { addTodo, deleteTodo, changeTodo, changeFilter } =
  todoSlice.actions;
export default todoSlice.reducer;
