import * as z from "zod";

export const User = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const Pagination = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export const UserPaged = z.object({
  success: z.boolean(),
  data: z.array(User),
  pagination: Pagination,
});

export const createUserSchema = z.object({
  name: z.string().min(1, "Campo es obligatorio"),
  email: z.string().email("Email invalido"),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Email invalido").optional(),
});

export type User = z.infer<typeof User>;
export type Pagination = z.infer<typeof Pagination>;
export type UserPaged = z.infer<typeof UserPaged>;
export type CreateUserData = z.infer<typeof createUserSchema>;
export type UpdateUserData = z.infer<typeof updateUserSchema>;
