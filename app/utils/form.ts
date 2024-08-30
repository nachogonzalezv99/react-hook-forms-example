const translations = {
    required: 'Este campo es requerido',
    maxCaracters: 'Máximo 20 caracteres',
    invalidCaracters: 'Caracteres invalidos',
    invalidEmail: 'Invalid email',
    duplicate: 'Duplicate',
} as const;

export const useTranslate = () => {
    const translate = (key: keyof typeof translations) => translations[key];
    return translate;
};

export interface User {
    id: string;
    name: string;
    email: string;
    phone: number;
}

export interface ArrayUser {
    id: string;
    name: string;
    projects: [{ id: string; name: 'Project 1' }];
}

export const projects = [
    { value: 'uno', label: 'Project 1' },
    { value: 'dos', label: 'Project 2' },
];
