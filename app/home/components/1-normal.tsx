"use client";

import { User, useTranslate } from "@/app/utils/form";
import { ButtonV3, InputV3, SelectTextV3 } from "@cecoc/ui-kit-v3";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CreateUserSchemaType, useGetCreateUserSchema } from "../schema";

// Formularios simples
export function NormalForm({ editingUser }: { editingUser: User | null }) {
  // const putMutation = usePutMutation()
  // const postMutation = usePostMutation()
  const t = useTranslate();

  const {
    reset,
    control,
    setError,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<CreateUserSchemaType>({
    resolver: zodResolver(useGetCreateUserSchema()),
  });

  const onSubmit: SubmitHandler<CreateUserSchemaType> = async (data) => {
    if (editingUser) {
      /* await putMutation.mutateAsync({ id: editingUser.id, data }); */
    } else {
      /* await postMutation.mutateAsync(data); */
    }

    // Si se quiere añadir un error en el helperText tras recibir la respuesta del back (ex: nombre duplicado)
    setError("name", { type: "duplicate", message: t("duplicate") });
  };

  useEffect(() => {
    if (editingUser)
      reset({ name: editingUser.name, email: editingUser.email });
  }, [editingUser, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <InputV3
            label="Name"
            helpText={
              errors.name?.message || "Max 20 chars, min 10. Only alphanumeric"
            }
            error={Boolean(errors.name)}
            mandatory
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <InputV3
            label="Email"
            helpText={
              errors.email?.message || "Max 20 chars, min 10. Only alphanumeric"
            }
            error={Boolean(errors.email)}
            mandatory
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="country"
        render={({ field }) => (
          <SelectTextV3
            label="Email"
            helpText={
              errors.country?.message ||
              "Max 20 chars, min 10. Only alphanumeric"
            }
            error={Boolean(errors.country)}
            mandatory
            options={[
              { label: "Spain", value: "spain" },
              { label: "Germany", value: "germany" },
            ]}
            {...field}
          />
        )}
      />
      <ButtonV3 disabled={!isDirty}>Submit</ButtonV3>
    </form>
  );
}
