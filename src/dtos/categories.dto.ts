import { z } from "zod";



export const createCtegorySchema ={
  title: z.string(),
  color: z.string().regex(/^#[A-Fa-f0-9]{6}$/),
};

const createCategoryObject = z.object(createCtegorySchema)

export type CreateCategoyDTO = z.infer<typeof createCategoryObject>