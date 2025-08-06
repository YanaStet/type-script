import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formSchema, type FormValues } from "@/components/task-form/formSchema";

type Task = {
  text: string;
  deadline: Date;
  descr: string | undefined;
};

interface TaskFormPropsInterface {
  handleAddTask: (task: Task) => void;
}

export function TaskForm({ handleAddTask }: TaskFormPropsInterface) {
  const { register, handleSubmit, formState, reset } = useForm<FormValues>({
    defaultValues: {
      text: "",
      deadline: "",
      descr: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { errors } = formState;

  const onSubmit = (props: FormValues) => {
    handleAddTask({
      text: props.text,
      deadline: new Date(props.deadline),
      descr: props.descr,
    });
    reset();
  };

  return (
    <form
      className="w-150 p-5 h-min flex flex-col border-3 border-gray-500 rounded-xl m-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-2xl mb-2">Add task</div>
      <Label htmlFor="text" className="mb-2">
        Name:
      </Label>
      <Input
        type="text"
        id="text"
        placeholder="Name"
        className="mb-1"
        {...register("text")}
      />
      <span className="text-red-500 text-xs mb-3">{errors.text?.message}</span>

      <Label htmlFor="text" className="mb-2">
        Description:
      </Label>
      <Input
        type="text"
        id="text"
        placeholder="Description"
        className="mb-1"
        {...register("text")}
      />
      <span className="text-red-500 text-xs mb-3">{errors.descr?.message}</span>

      <Input
        type="datetime-local"
        step="1"
        {...register("deadline")}
        className="mb-3"
      />
      {errors.deadline && <span>{errors.deadline.message}</span>}

      <Button
        type="submit"
        className="transition duration-300 bg-gray-200 hover:bg-gray-300"
        variant="outline"
      >
        Submit
      </Button>
    </form>
  );
}
