import * as RadixDialog from "@radix-ui/react-dialog";

function Dialog(props: RadixDialog.DialogProps) {
  return <RadixDialog.Root {...props} />;
}
Dialog.DisplayName = "Hola";

Dialog.Trigger = function DialogTrigger(props: RadixDialog.DialogTriggerProps) {
  return <RadixDialog.Trigger asChild {...props} />;
};

Dialog.Content = function DialogContent({
  children,
  style,
  ...props
}: RadixDialog.DialogContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)", // equivalent to bg-black and bg-opacity-20
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 50,
        }}
      />
      <RadixDialog.Content
        {...props}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          // backgroundColor: "white",
          // borderRadius: "0.375rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxHeight: "80vh",
          minHeight: "15rem",
          maxWidth: "50rem",
          minWidth: "20rem",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          ...style,
        }}
      >
        {children}
        <RadixDialog.Close asChild>
          {/* <IconButton sz="sm" className="absolute top-2 right-2">
            <AiOutlineClose />
          </IconButton> */}
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
};

export default Dialog;
