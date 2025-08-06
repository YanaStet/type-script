import { useSelector } from "react-redux";
import { useState } from "react";
import { changeFilter } from "@/todoSlice";
import { useDispatch } from "react-redux";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

interface TodoRoot {
  todo: {
    todos: Todo[];
  };
}

const choices = ["All", "Todo", "Done"];

export function Filter() {
  const todos = useSelector((state: TodoRoot) => state.todo.todos);
  let todo = 0,
    done = 0;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  todos.forEach((item) => {
    if (item.done === false) {
      todo += 1;
    } else {
      done += 1;
    }
  });

  return (
    <div className="mb-3 flex items-center ">
      <div className="mr-3">
        All: {todos.length} | To do: {todo} | Done: {done}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value ? choices.find((c) => c === value) : "All"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>Something went wrong...</CommandEmpty>
              <CommandGroup>
                {choices.map((c, i) => (
                  <CommandItem
                    key={i}
                    value={c}
                    onSelect={(currentValue) => {
                      setValue(currentValue);
                      setOpen(false);
                      dispatch(changeFilter(currentValue));
                    }}
                  >
                    {c}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
