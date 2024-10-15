"use client";

import { User2, useTranslate } from "@/app/utils/form";
import { ButtonV3, InputV3, SelectTextV3 } from "@cecoc/ui-kit-v3";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
    Controller,
    SubmitHandler,
    useForm,
    UseFormReturn,
} from "react-hook-form";
import { CreateUserSchemaType2, useGetCreateUserSchema2 } from "../schema";

// Campos dependientes
// Selects vacios (nulo, string vacio)
// DatePickers revisar zod
// Multi select selector
//  SetValue should dirty
// Cuidado con el disabled de Controller, pone el valor a undefined y se lia la cosa

// Utility type to extract by mode
type ExtractByMode<T, M extends CreateUserSchemaType2["mode"]> = T extends {
  mode: M;
}
  ? T
  : never;

// Extract types based on mode
type EditType = ExtractByMode<CreateUserSchemaType2, "edit">;
type CreateType = ExtractByMode<CreateUserSchemaType2, "create">;

function isEditing(
  methods: UseFormReturn<EditType | CreateType, any, undefined>
): methods is UseFormReturn<EditType> {
  return methods.getValues("mode") === "edit";
}
function isCreating(
  methods: UseFormReturn<EditType | CreateType, any, undefined>
): methods is UseFormReturn<CreateType> {
  return methods.getValues("mode") === "create";
}

// Formularios simples
export function MultipleSchemaForm({
  editingUser,
}: {
  editingUser: User2 | null;
}) {
  const t = useTranslate();

  const methods = useForm<CreateUserSchemaType2>({
    resolver: zodResolver(useGetCreateUserSchema2(editingUser)),
    context: editingUser,
  });

  const onSubmit: SubmitHandler<CreateUserSchemaType2> = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (editingUser) {
      methods.reset({
        name: editingUser.name,
        phone: editingUser.phone, // If the editing user has a phone
        country: editingUser.country, // Assuming country exists in both modes
      });
    } else {
      methods.reset({ name: "", email: "", country: "" }); // Default values for create mode
    }
  }, [editingUser, methods]);

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <Controller
        control={methods.control}
        name="name"
        render={({ field }) => (
          <InputV3
            label="Name"
            helpText={methods.formState.errors.name?.message}
            error={Boolean(methods.formState.errors.name)}
            mandatory
            {...field}
          />
        )}
      />
      <Controller
        control={methods.control}
        name={editingUser ? "phone" : "email"}
        render={({ field }) => (
          <InputV3
            label={editingUser ? "Phone" : "Email"}
            helpText={
              isEditing(methods)
                ? methods.formState.errors.phone?.message
                : isCreating(methods)
                ? methods.formState.errors.email?.message
                : ""
            }
            error={
              isEditing(methods)
                ? Boolean(methods.formState.errors.phone)
                : isCreating(methods)
                ? Boolean(methods.formState.errors.email)
                : false
            }
            mandatory
            {...field}
          />
        )}
      />
      <Controller
        control={methods.control}
        name="country"
        render={({ field }) => (
          <SelectTextV3
            label="Email"
            helpText={methods.formState.errors.country?.message}
            error={Boolean(methods.formState.errors.country)}
            mandatory
            options={[
              { label: "Spain", value: "spain" },
              { label: "Germany", value: "germany" },
            ]}
            {...field}
          />
        )}
      />
      <ButtonV3 disabled={!methods.formState.isDirty}>Submit</ButtonV3>
    </form>
  );
}
