import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type newTask = {
  id: number;
  text: string;
  descr?: string;
  deadline?: Date;
};

interface TodoItemPropsInterface {
  id: number;
  text: string;
  descr: string | undefined;
  done: boolean;
  deadline: Date;
  handleChange: (id: number) => void;
  handleDalete: (id: number) => void;
  handleEdit: (newTask: newTask) => void;
}

export function TodoItem({
  id,
  text,
  descr,
  done,
  deadline,
  handleChange,
  handleDalete,
  handleEdit,
}: TodoItemPropsInterface) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { register } = useForm({
    defaultValues: {
      text: "",
      descr: "",
      deadline: "",
    },
  });

  return (
    <div
      className="w-230 border-3 relative border-gray-500 grid grid-cols-6 p-2 rounded-xl items-center mb-2"
      id={`${id}`}
    >
      {done ? (
        <span className="absolute w-[70%] h-[2px] left-10 rounded-xs bg-gray-500"></span>
      ) : null}
      <div className="flex flex-col items-center mr-5">
        <Checkbox
          checked={done}
          onCheckedChange={() => {
            handleChange(id);
          }}
          className="border-2 border-black"
          disabled={done}
        />
      </div>
      <div>
        {deadline ? (
          <div
            className={`mr-10 ${new Date() > deadline ? "text-red-600" : ""}`}
          >
            Deadline:
            <div className="flex w-30">
              {deadline.getFullYear() !== new Date().getFullYear()
                ? `${deadline.getFullYear()}.`
                : ""}
              {deadline.getMonth().toString().padStart(2, "0")}.
              {deadline.getDay().toString().padStart(2, "0")}{" "}
              {deadline.getHours().toString().padStart(2, "0")}:
              {deadline.getMinutes().toString().padStart(2, "0")}
            </div>
          </div>
        ) : null}
      </div>
      <div className="col-span-2">
        <div>{text}</div>
        <div className="text-xs max-w-145">{descr}</div>
      </div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit this task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input id="name-1" name="name" defaultValue={text} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="descr">Description</Label>
                <Input
                  id="descr"
                  name="descr"
                  defaultValue={descr ? descr : ""}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="date" className="px-1">
                    Deadline
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                      >
                        {date ? date.toLocaleDateString() : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setDate(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger className="bg-red-400 transition duration-300 font-medium pt-2 pb-2 pr-4 pl-4 rounded-md text-sm text-white hover:bg-red-500">
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDalete(id);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
