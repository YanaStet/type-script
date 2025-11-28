import { z } from "zod";

export const formSchema = z.object({
  text: z.string().min(3, "Name is required"),
  descr: z
    .string()
    .min(6, "Description is required")
    .optional()
    .or(z.literal("")),
  deadline: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => {
        if (!val) return true;
        const parsed = new Date(val);
        return !isNaN(parsed.getTime());
      },
      {
        message: "Invalid date format",
      }
    ),
});

export type FormValues = z.infer<typeof formSchema>;
