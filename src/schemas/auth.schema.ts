import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(36, 'Password must be at most 36 characters'),
});

export const registerSchema = loginSchema.extend({
  confirmPassword: z.string().min(6, 'Confirm Password is required').max(36, 'Confirm Password must be at most 36 characters'),
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;