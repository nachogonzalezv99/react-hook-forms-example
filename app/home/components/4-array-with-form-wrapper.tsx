"use client";

import { Form } from "@/app/components/Form";
import { ArrayUser, projects } from "@/app/utils/form";
import { ButtonV3, FormLabel } from "@cecoc/ui-kit-v3";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  CreateArrayUserSchemaType,
  useGetCreateArrayUserSchema,
} from "../schema";

export default function ArrayFormWithWrapper({
  editingUser,
}: {
  editingUser: ArrayUser | null;
}) {
  // const putMutation = usePutMutation()
  // const postMutation = usePostMutation()
  const methods = useForm<CreateArrayUserSchemaType>({
    resolver: zodResolver(useGetCreateArrayUserSchema()),
  });
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "projects",
  });

  const onSubmit: SubmitHandler<CreateArrayUserSchemaType> = async (data) => {
    if (editingUser) {
      /* await putMutation.mutateAsync({ id: editingUser.id, data }); */
    } else {
      /* await postMutation.mutateAsync(data); */
    }
  };

  useEffect(() => {
    if (editingUser)
      methods.reset({
        name: editingUser.name,
        projects: editingUser.projects.map((p) => ({ id: p.id })),
      });
    else methods.reset({ name: "", projects: [{ id: "" }] });
  }, [editingUser, methods]);

  return (
    <Form
      methods={methods}
      schema={useGetCreateArrayUserSchema()}
      onSubmit={onSubmit}
      style={{ padding: "20px" }}
    >
      <Form.Input control={methods.control} name="name" label="Name" />

      <FormLabel label="Projects" />
      {fields.map((field, index) => (
        <div
          key={field.id}
          style={{ display: "flex", gap: "22px", alignItems: "center" }}
        >
          <Form.Select
            control={methods.control}
            name={`projects.${index}.id`}
            options={projects}
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

      <Form.Submit size="S">Submit</Form.Submit>
    </Form>
  );
}
