"use client";

import { Form } from "@/app/components/Form";
import { User, useTranslate } from "@/app/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateUserSchemaType, useGetCreateUserSchema } from "../schema";

export default function FormWithWrapper({
  editingUser,
}: {
  editingUser: User | null;
}) {
  // const putMutation = usePutMutation()
  // const postMutation = usePostMutation()
  const t = useTranslate();
  const methods = useForm<CreateUserSchemaType>({
    resolver: zodResolver(useGetCreateUserSchema()),
  });

  const onSubmit: SubmitHandler<CreateUserSchemaType> = async (data) => {
    if (editingUser) {
      /* await putMutation.mutateAsync({ id: editingUser.id, data }); */
    } else {
      /* await postMutation.mutateAsync(data); */
    }

    methods.setError("name", { type: "duplicate", message: t("duplicate") });
  };

  useEffect(() => {
    if (editingUser)
      methods.reset({ name: editingUser.name, email: editingUser.email });
  }, [editingUser, methods]);

  return (
    <Form
      methods={methods}
      schema={useGetCreateUserSchema()}
      onSubmit={onSubmit}
    >
      <Form.Input control={methods.control} name="name" label="Name" />

      <Form.Input control={methods.control} name="email" label="Email" />

      <Form.Select
        control={methods.control}
        name="country"
        label="Country"
        options={[
          { label: "Spain", value: "spain" },
          { label: "Germany", value: "germany" },
        ]}
      />

      <Form.Submit size="S">Submit</Form.Submit>
    </Form>
  );
}
