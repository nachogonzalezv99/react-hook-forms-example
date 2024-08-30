"use client";

import { ArrayUser, projects, useTranslate } from "@/app/utils/form";
import { ButtonV3, InputV3, SelectTextV3 } from "@cecoc/ui-kit-v3";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
    Controller,
    SubmitHandler,
    useFieldArray,
    useForm,
} from "react-hook-form";
import {
    CreateArrayUserSchemaType,
    useGetCreateArrayUserSchema,
} from "../schema";

// Formularios complejos con arrays
export function FormWithArray({
  editingUser,
}: {
  editingUser: ArrayUser | null;
}) {
  const t = useTranslate();

  const {
    reset,
    control,
    getValues,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<CreateArrayUserSchemaType>({
    resolver: zodResolver(useGetCreateArrayUserSchema()),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  console.log(getValues("projects"), errors);

  const onSubmit: SubmitHandler<CreateArrayUserSchemaType> = async (data) => {
    if (editingUser) {
      /* await putMutation.mutateAsync({ id: editingUser.id, data }); */
    } else {
      /* await postMutation.mutateAsync(data); */
    }
  };

  useEffect(() => {
    if (editingUser)
      reset({
        name: editingUser.name,
        projects: editingUser.projects.map((p) => ({ id: p.id })),
      });
    else reset({ name: "", projects: [{ id: "" }] });
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
      {fields.map((field, index) => (
        <div
          key={field.id}
          style={{ display: "flex", gap: "22px", alignItems: "center" }}
        >
          <Controller
            control={control}
            name={`projects.${index}.id`}
            render={({ field }) => (
              <SelectTextV3
                width="320px"
                options={projects}
                error={Boolean(errors?.projects?.[index]?.id?.message)}
                helpText={
                  errors?.projects?.[index]?.id?.message ||
                  "Max 20 chars, min 10. Only alphanumeric"
                }
                placeholder="Selecciona proyecto"
                {...field}
              />
            )}
          />
          {fields.length > 1 && (
            <ButtonV3 type="button" size="S" onClick={() => remove(index)}>
              Delete
            </ButtonV3>
          )}
        </div>
      ))}
      <ButtonV3
        variant="link-primary"
        type="button"
        uppercase={false}
        style={{ padding: 0 }}
        onClick={() => append({ id: "" })}
      >
        Añadir nuevo proyecto y perfil
      </ButtonV3>

      <ButtonV3 disabled={!isDirty}>Submit</ButtonV3>
    </form>
  );
}
