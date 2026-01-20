import { Paper, Text, Stack, Progress, Box } from '@mantine/core';

interface SeverityCardProps {
  label: string;
  percentage: number;
  color?: string;
}

export function SeverityCard({ label, percentage, color = 'green' }: SeverityCardProps) {
  return (
    <Paper radius="md" p="lg" bg="gray.0" style={{ border: 'none' }}>
      <Stack align="center" gap={6}>
        <Text size="2rem" fw={800} lh={1} style={{ fontFamily: 'inherit' }}>
          {percentage}%
        </Text>

        <Text size="md" c="dimmed" mb={8} fw={500}>
          {label}
        </Text>

        <Box w="100%">
          <Progress value={percentage} color={color} size="sm" radius="xl" />
        </Box>
      </Stack>
    </Paper>
  );
}
