import "./App.css";

import { TodoItem } from "./components/todo-item/todo-item";
import { TaskForm } from "./components/task-form/task-form";
import { Filter } from "./components/filter/filter";

import { useSelector } from "react-redux";
import { addTodo, deleteTodo, changeTodo } from "./todoSlice";
import { useDispatch } from "react-redux";

type Todo = {
  id: number;
  text: string;
  descr: string | undefined;
  done: boolean;
  deadline: Date;
};

interface TodoRoot {
  todo: {
    todos: Todo[];
    filter: string;
  };
}

type Task = {
  text: string;
  deadline?: Date;
  descr?: string;
};

function App() {
  const todos = useSelector((state: TodoRoot) => state.todo.todos);
  const filter = useSelector((state: TodoRoot) => state.todo.filter);
  const dispatch = useDispatch();

  const handleChangeDone = (id: number) => {
    dispatch(changeTodo(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleAddTodo = (task: Task) => {
    if (task.text?.trim()) {
      dispatch(
        addTodo({
          id: todos.length + 1,
          text: task.text,
          descr: task.descr,
          done: false,
          deadline: task.deadline,
        })
      );
    }
  };

  const filteredTodo =
    filter === "All"
      ? todos
      : filter === "Done"
      ? todos.filter((todo) => todo.done)
      : todos.filter((todo) => !todo.done);

  return (
    <div className="flex">
      <TaskForm handleAddTask={handleAddTodo} />
      <div className="flex items-center pt-5 flex-col w-260">
        <Filter />
        {filteredTodo.length < 1 ? "There are no tasks" : null}
        {filteredTodo.map(({ id, text, descr, done, deadline }) => {
          return (
            <TodoItem
              id={id}
              text={text}
              descr={descr}
              done={done}
              deadline={deadline}
              handleChange={handleChangeDone}
              handleDalete={handleDeleteTodo}
              key={id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
