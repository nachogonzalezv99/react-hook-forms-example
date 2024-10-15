import * as RadixDialog from "@radix-ui/react-dialog";
import { ComponentProps } from "react";

const Card = function CardContent({
  children,
  style,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      style={{
        backgroundColor: "white",
        borderRadius: "0.375rem", // equivalent to rounded-md
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // equivalent to shadow-md
        // maxHeight: "80vh",
        // minHeight: "15rem",
        maxWidth: "50rem",
        minWidth: "20rem",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        ...style, // This allows you to pass additional styles through the style prop
      }}
    >
      {children}
    </div>
  );
};

Card.Header = function DialogHeader({
  style,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      style={{
        padding: "1rem", // equivalent to p-4
        borderBottom: "1px solid", // equivalent to border-b
        ...style, // Allows additional styles through props
      }}
    />
  );
};

Card.Body = function DialogBody({ style, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      style={{
        height: "100%", // equivalent to h-full
        overflowY: "auto", // equivalent to overflow-y-auto
        padding: "1rem", // equivalent to p-4
        ...style, // Allows additional styles through props
      }}
    />
  );
};

Card.Footer = function DialogFooter({
  style,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      style={{
        padding: "1rem", // equivalent to p-4
        borderTop: "1px solid", // equivalent to border-t
        ...style, // Allows additional styles through props
      }}
    />
  );
};

Card.Close = function DialogClose(props: RadixDialog.DialogCloseProps) {
  return <RadixDialog.Close asChild {...props} />;
};

export default Card;
