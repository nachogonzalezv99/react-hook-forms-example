import Dialog from "@/app/components/Dialog/Dialog";
import { ButtonV3 } from "@cecoc/ui-kit-v3";

export function CustomDialog() {
  return (
    <Dialog>
      <Dialog.Trigger>
        <ButtonV3>Custom dialog</ButtonV3>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>Header</Dialog.Header>
        <Dialog.Body>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
            similique eius expedita architecto ad quas voluptates provident ut
            sequi, quibusdam obcaecati necessitatibus optio praesentium ducimus
            consequatur veniam omnis possimus id!
          </p>
        </Dialog.Body>
        <Dialog.Footer>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Dialog.Close>
              <ButtonV3 size="S" variant="secondary">
                Cancelar
              </ButtonV3>
            </Dialog.Close>
            <ButtonV3 size="S">Guardar</ButtonV3>
          </div>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
