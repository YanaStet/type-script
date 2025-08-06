import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface TodoItemInterface {
  id: number;
  text: string;
  done: boolean;
  deadline: Date;
  handleChange: (id: number) => void;
  handleDalete: (id: number) => void;
}

export function TodoItem({
  id,
  text,
  done,
  deadline,
  handleChange,
  handleDalete,
}: TodoItemInterface) {
  return (
    <div
      className="w-250 border-3 border-gray-500 flex p-2 justify-between rounded-xl items-center mb-2"
      id={`${id}`}
    >
      <div className="flex flex-col items-center">
        <Checkbox
          checked={done}
          onCheckedChange={() => {
            handleChange(id);
          }}
          className="border-1 border-black"
        />
        <div>Done</div>
      </div>
      <div className={`${new Date() > deadline ? "text-red-600" : ""}`}>
        Deadline: {deadline.getFullYear()}:
        {deadline.getMonth().toString().padStart(2, "0")}:
        {deadline.getDate().toString().padStart(2, "0")}
      </div>
      <div className={`${done ? "line-through" : null}`}>{text}</div>
      <Button
        className="bg-red-400 transition duration-300 hover:bg-red-500"
        onClick={() => {
          handleDalete(id);
        }}
        variant="destructive"
      >
        Delete
      </Button>
    </div>
  );
}
