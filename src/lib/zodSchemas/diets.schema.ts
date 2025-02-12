import { z } from 'zod';

export const createDietSchema = z.object({
  name: z.string().min(2, 'Nome muito curto!').toLowerCase(),
  mounth: z.number(),
  userId: z.string().min(35, 'ID muito curto!'),
});
