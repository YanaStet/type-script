import { createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  descr?: string;
  done: boolean;
  deadline: Date;
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
      done: false,
      deadline: new Date(2025, 8, 7, 22, 22, 22),
    },
    {
      id: 2,
      text: "Do bed",
      done: false,
      deadline: new Date(2025, 9, 7, 22, 22, 22),
    },
    {
      id: 3,
      text: "Do cooking",
      done: false,
      deadline: new Date(2026, 8, 7, 22, 22, 22),
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
  },
});

export const { addTodo, deleteTodo, changeTodo, changeFilter } =
  todoSlice.actions;
export default todoSlice.reducer;
