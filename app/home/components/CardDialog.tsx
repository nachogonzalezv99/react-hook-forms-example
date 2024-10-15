import Card from "@/app/components/Card/Card";
import Dialog from "@/app/components/Dialog/Dialog";
import { ButtonV3 } from "@cecoc/ui-kit-v3";

export function CardDialog() {
  return (
    <Dialog>
      <Dialog.Trigger>
        <ButtonV3>Card dialog</ButtonV3>
      </Dialog.Trigger>
      <Dialog.Content>
        <Card style={{ maxHeight: "80vh", minHeight: "15rem" }}>
          <Card.Header>Hola</Card.Header>
          <Card.Body>
            {Array.from({ length: 5 }).map((_, index) => (
              <p key={index}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Officia quam labore rem tempore velit doloribus tenetur.
                Veritatis ratione, quo magni sit harum quibusdam, eaque sed
                architecto error iusto quos non!
              </p>
            ))}
          </Card.Body>
          <Card.Footer>Hola</Card.Footer>
        </Card>
      </Dialog.Content>
    </Dialog>
  );
}
