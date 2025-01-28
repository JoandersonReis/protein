import { z } from 'zod';

export const CreateFoodSchema = z.object({
  name: z
    .string()
    .toLowerCase()
    .min(2, 'Compo precisa ter pelo menos 2 caracteres!'),
  calories: z.number(),
  fat: z.number(),
  carb: z.number(),
  protein: z.number(),
});

export type TCreateFoodSchema = z.infer<typeof CreateFoodSchema>;
