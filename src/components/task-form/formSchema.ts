import { z } from "zod";

export const formSchema = z.object({
  text: z.string().min(3, "Too short!"),
  descr: z.string().min(6, "Too short!").optional(),
  deadline: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;
