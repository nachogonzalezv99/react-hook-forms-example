import { z } from 'zod';
import { useTranslate } from '../utils/form';

export const useGetCreateUserSchema = () => {
    const t = useTranslate();

    const createUserSchema = z.object({
        name: z
            .string()
            .min(1, t('required'))
            .max(50, t('maxCaracters'))
            .regex(/^[A-Za-z0-9ÁÉÍÑÓÚÜáéíñóúü _-]+$/, t('invalidCaracters')),
        email: z.string().email(t('invalidEmail')),
        country: z.string().min(1, t('required')),
    });

    return createUserSchema;
};

export type CreateUserSchemaType = z.infer<ReturnType<typeof useGetCreateUserSchema>>;

export const useGetCreateArrayUserSchema = () => {
    const t = useTranslate();

    const createUserSchema = z.object({
        name: z.string().min(1, t('required')).max(50, t('maxCaracters')),
        projects: z.array(z.object({ id: z.string().min(1, 'Required.') })),
    });

    return createUserSchema;
};

export type CreateArrayUserSchemaType = z.infer<ReturnType<typeof useGetCreateArrayUserSchema>>;
