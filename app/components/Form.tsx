import {
  ButtonV3,
  ButtonV3Props,
  InputV3,
  InputV3Props,
  SelectTextV3,
  SelectTextV3Props,
} from "@cecoc/ui-kit-v3";
import { ComponentProps } from "react";
import {
  Control,
  Controller,
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useFormContext,
  Path,
  get,
} from "react-hook-form";

interface FormProps<T extends FieldValues>
  extends Omit<ComponentProps<"form">, "onSubmit"> {
  onSubmit: SubmitHandler<T>;
  methods: UseFormReturn<T>;
}
export function Form<T extends FieldValues>({
  onSubmit,
  methods,
  ...props
}: FormProps<T>) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...props} />
    </FormProvider>
  );
}

interface FormInputProps<T extends FieldValues>
  extends Omit<InputV3Props, "name"> {
  name: Path<T>;
  control: Control<T>;
}
Form.Input = function FormInput<T extends FieldValues>({
  name,
  helpText,
  ...props
}: FormInputProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const fieldError = get(errors, name);

  return (
    <Controller
      control={control}
      name={name as any}
      render={({ field }) => (
        <InputV3
          helpText={(fieldError?.message as string) || helpText}
          error={Boolean(fieldError)}
          {...props}
          {...field}
        />
      )}
    />
  );
};

interface FormSelectProps<T extends FieldValues>
  extends Omit<SelectTextV3Props, "name"> {
  name: Path<T>;
  control: Control<T>;
}

Form.Select = function FormSelect<T extends FieldValues>({
  name,
  helpText,
  ...props
}: FormSelectProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const fieldError = get(errors, name);

  return (
    <Controller
      control={control}
      name={name as any}
      render={({ field }) => (
        <SelectTextV3
          helpText={(fieldError?.message as string) || helpText}
          error={Boolean(fieldError)}
          {...props}
          {...field}
        />
      )}
    />
  );
};

Form.Submit = function FormSubmit(props: ButtonV3Props) {
  const {
    formState: { isDirty, isSubmitting },
  } = useFormContext();

  return (
    <ButtonV3 type="submit" disabled={!isDirty || isSubmitting} {...props}>
      Submit
    </ButtonV3>
  );
};
