import Card from "@/app/components/Card/Card";

export function CustomCard() {
  return (
    <Card>
      <Card.Header>Hola</Card.Header>
      <Card.Body>
        {Array.from({ length: 5 }).map((_, index) => (
          <p key={index}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia
            quam labore rem tempore velit doloribus tenetur. Veritatis ratione,
            quo magni sit harum quibusdam, eaque sed architecto error iusto quos
            non!
          </p>
        ))}
      </Card.Body>
      <Card.Footer>Hola</Card.Footer>
    </Card>
  );
}
