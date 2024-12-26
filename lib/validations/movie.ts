import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  year: z.number().min(1900).max(2012),
  format: z.enum(["DVD", "VHS"] as const),
  actors: z
    .array(z.string().min(1, "Actor name is required"))
    .min(1, "At least one actor is required"),
});

export type CreateMovie = z.infer<typeof createMovieSchema>;
