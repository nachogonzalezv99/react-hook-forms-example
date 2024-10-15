import Dialog from "@/app/components/Dialog/Dialog";
import { ButtonV3 } from "@cecoc/ui-kit-v3";

export function CustomDialog() {
  return (
    <Dialog>
      <Dialog.Trigger>
        <ButtonV3>Custom dialog</ButtonV3>
      </Dialog.Trigger>
      <Dialog.Content
        style={{
          backgroundColor: "white",
          borderRadius: "0.375rem",
          padding: "10px",
        }}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          itaque accusamus numquam, iure odio, nesciunt excepturi veniam magni
          magnam maiores natus vero exercitationem asperiores vitae velit ad cum
          culpa eius.
        </p>
      </Dialog.Content>
    </Dialog>
  );
}
