import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const counter = useMemo(() => {
    return {
      all: todos.length,
      todo: todos.filter((item) => !item.done).length,
      done: todos.filter((item) => item.done).length,
    };
  }, [todos]);

  const handleSelectFilter = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);
    dispatch(changeFilter(currentValue));
  };

  return (
    <div className="mb-3 flex items-center ">
      <div className="mr-3">
        All: {counter.all} | To do: {counter.todo} | Done: {counter.done}
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
                  <CommandItem key={i} value={c} onSelect={handleSelectFilter}>
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
