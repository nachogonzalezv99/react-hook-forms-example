import { z } from "zod";
import { User2, useTranslate } from "../utils/form";

export const useGetCreateUserSchema = () => {
  const t = useTranslate();

  const createUserSchema = z.object({
    name: z
      .string()
      .min(1, t("required"))
      .max(50, t("maxCaracters"))
      .regex(/^[A-Za-z0-9ÁÉÍÑÓÚÜáéíñóúü _-]+$/, t("invalidCaracters")),
    country: z.string().min(1, t("required")),
    email: z.string().email(t("invalidEmail")),
  });

  return createUserSchema;
};

export type CreateUserSchemaType = z.infer<
  ReturnType<typeof useGetCreateUserSchema>
>;

export const useGetCreateUserSchema2 = (editing: User2 | null) => {
  const t = useTranslate();

  const createUserSchema = z.object({
    mode: z.literal("create"),
    name: z
      .string()
      .min(1, t("required"))
      .max(50, t("maxCaracters"))
      .regex(/^[A-Za-z0-9ÁÉÍÑÓÚÜáéíñóúü _-]+$/, t("invalidCaracters")),
    country: z.string().min(1, t("required")),
    email: z.string().email(t("invalidEmail")),
  });

  const updateUserSchema = z.object({
    mode: z.literal("edit"),
    name: z
      .string()
      .min(1, t("required"))
      .max(50, t("maxCaracters"))
      .regex(/^[A-Za-z0-9ÁÉÍÑÓÚÜáéíñóúü _-]+$/, t("invalidCaracters")),
    country: z.string().min(1, t("required")),
    phone: z.string().min(1, t("required")),
  });

  return editing ? updateUserSchema : createUserSchema;
};
export type CreateUserSchemaType2 = z.infer<
  ReturnType<typeof useGetCreateUserSchema2>
>;


export const useGetCreateArrayUserSchema = () => {
  const t = useTranslate();

  const createUserSchema = z.object({
    name: z.string().min(1, t("required")).max(50, t("maxCaracters")),
    projects: z.array(z.object({ id: z.string().min(1, "Required.") })),
  });

  return createUserSchema;
};

export type CreateArrayUserSchemaType = z.infer<
  ReturnType<typeof useGetCreateArrayUserSchema>
>;
