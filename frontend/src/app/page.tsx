import { Container, Title, Button, Text } from "@mantine/core";

export default function Home() {
  return (
    <Container size="sm" mt="xl">
      <Title order={1}>Project Backbone Ready</Title>
      <Text c="dimmed" mb="md">
        Next.js + Mantine is successfully configured.
      </Text>
      <Button color="brandRed" variant="filled">
        Click Me (I am a Mantine Button)
      </Button>
    </Container>
  );
}
