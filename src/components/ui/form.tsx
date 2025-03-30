import * as React from "react";
import { Label } from "./label";
import { cn } from "@/lib/utils/utils";

interface FormItemContextValue {
  id: string;
}

const FormItemContext = React.createContext<FormItemContextValue>({
  id: "",
});

export function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
}

export function FormLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Label>) {
  const { id } = React.useContext(FormItemContext);

  return (
    <Label
      className={cn("text-sm font-medium", className)}
      htmlFor={id}
      {...props}
    />
  );
}

export function FormControl<T extends React.ElementType = React.ElementType>({
  ...props
}: React.ComponentPropsWithoutRef<T>) {
  const { id } = React.useContext(FormItemContext);

  return <div id={id} {...props} />;
}

export function FormMessage({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function FormDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export function Form({
  className,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return <form className={cn("space-y-4", className)} {...props} />;
}
