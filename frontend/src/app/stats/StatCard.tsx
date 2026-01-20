import { Paper, Text, Stack, Box } from '@mantine/core';

interface StatCardProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
}

export function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <Paper withBorder p="lg" radius="md" shadow="sm" bg="white">
      <Stack align="center" gap={4}>
        <Box c="green" mb={8}>
          <Icon size={32} stroke={2} />
        </Box>

        <Text size="2rem" fw={900} c="brandGreen.9" lh={1} style={{ fontFamily: 'inherit' }}>
          {value}
        </Text>

        <Text size="sm" c="dimmed" fw={500}>
          {label}
        </Text>
      </Stack>
    </Paper>
  );
}
