import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

export default function Todos(): JSX.Element {
  return (
    <div className="flex flex-column w-full m-2">
      <div className="flex flex-1 ">
        <TodoForm />
      </div>
      <div className="flex">
        <TodoList />
      </div>
    </div>
  );
}
