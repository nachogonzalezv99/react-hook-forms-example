const translations = {
  required: "Este campo es requerido",
  maxCaracters: "Máximo 20 caracteres",
  invalidCaracters: "Caracteres invalidos",
  invalidEmail: "Invalid email",
  duplicate: "Duplicate",
} as const;

export const useTranslate = () => {
  const translate = (key: keyof typeof translations) => translations[key];
  return translate;
};

export interface User {
  id: string;
  name: string;
  country: string;
  email: string;
}

export interface User2 {
  id: string;
  name: string;
  country: string;
  phone: string;
}

export interface ArrayUser {
  id: string;
  name: string;
  projects: [{ id: string; name: "Project 1" }];
}

export const projects = [
  { value: "uno", label: "Project 1" },
  { value: "dos", label: "Project 2" },
];

// correct native objectKeys typing
export const objectKeys = <Obj extends object>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[];
};
