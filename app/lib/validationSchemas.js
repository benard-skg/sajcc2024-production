// lib/validationSchemas.js
import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters long'),
  region: z.enum(['north', 'south', 'east', 'west'], {
    errorMap: () => ({ message: 'Please select a valid region' }),
  }),
  chessId: z.string().min(3, 'Chess ID must be at least 3 characters long'),
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});