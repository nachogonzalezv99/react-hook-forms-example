import {
  ButtonV3,
  ButtonV3Props,
  InputV3,
  InputV3Props,
  SelectTextV3,
  SelectTextV3Props,
} from "@cecoc/ui-kit-v3";
import { ComponentProps, createContext, ReactNode, useContext } from "react";
import {
  Control,
  Controller,
  FieldValues,
  get,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { ZodObject } from "zod";

interface FormContextProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  schema: ZodObject<any>;
}

const FormContext = createContext<FormContextProps<any> | null>(null);

function useForm<T extends FieldValues>() {
  const context = useContext(FormContext) as FormContextProps<T> | null;
  if (!context) throw new Error("useForm must be used inside a FormProvider");
  return context;
}
interface FormProviderProps<T extends FieldValues> extends FormContextProps<T> {
  children: ReactNode;
}
export function FormProvider<T extends FieldValues>({
  methods,
  schema,
  children,
}: FormProviderProps<T>) {
  return (
    <FormContext.Provider value={{ methods, schema }}>
      {children}
    </FormContext.Provider>
  );
}

interface FormProps<T extends FieldValues>
  extends Omit<ComponentProps<"form">, "onSubmit">,
    Omit<ComponentProps<"form">, "onSubmit"> {
  onSubmit: SubmitHandler<T>;
  methods: UseFormReturn<T>;
  schema: ZodObject<any>;
}
export function Form<T extends FieldValues>({
  onSubmit,
  methods,
  schema,
  ...props
}: FormProps<T>) {
  return (
    <FormProvider methods={methods} schema={schema}>
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
    methods: {
      control,
      formState: { errors },
    },
    schema,
  } = useForm<T>();

  const fieldError = get(errors, name);

  return (
    <Controller
      control={control}
      name={name as any}
      render={({ field }) => (
        <InputV3
          helpText={(fieldError?.message as string) || helpText}
          error={Boolean(fieldError)}
          mandatory={schema.shape[name]?._def.checks.some(
            (check: any) => check.kind === "min"
          )}
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
    methods: {
      control,
      formState: { errors },
    },
    schema,
  } = useForm<T>();

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

Form.Submit = function FormSubmit<T extends FieldValues>(props: ButtonV3Props) {
  const {
    methods: {
      formState: { isDirty, isSubmitting },
    },
  } = useForm<T>();

  return (
    <ButtonV3 type="submit" disabled={!isDirty || isSubmitting} {...props}>
      Submit
    </ButtonV3>
  );
};
