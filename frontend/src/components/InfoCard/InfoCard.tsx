import { Paper, Title, Group, ThemeIcon, Stack, Box } from '@mantine/core';
import { ReactNode } from 'react';

type CardVariant = 'default' | 'danger' | 'warning';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: ReactNode;
  variant?: CardVariant;
}

export function InfoCard({ title, icon, children, variant = 'default' }: InfoCardProps) {
  const styles = {
    default: {
      bg: 'white',
      border: 'gray.2',
      iconColor: 'green.9',
      iconBg: 'green.6',
    },
    danger: {
      bg: 'red.0',
      border: 'red.2',
      iconColor: 'red.7',
      iconBg: 'red.1',
    },
    warning: {
      bg: 'yellow.0',
      border: 'yellow.2',
      iconColor: 'yellow.7',
      iconBg: 'yellow.1',
    },
  };

  const currentStyle = styles[variant];

  return (
    <Paper
      withBorder
      p="xl"
      radius="md"
      shadow="sm"
      bg={currentStyle.bg}
      style={{ borderColor: `var(--mantine-color-${currentStyle.border})` }}
    >
      <Group align="flex-start" wrap="nowrap">
        <ThemeIcon
          size={50}
          radius="md"
          variant="light"
          color={currentStyle.iconColor.split('.')[0]}
          style={{
            backgroundColor: `var(--mantine-color-${currentStyle.iconBg})`,
            color: `var(--mantine-color-${currentStyle.iconColor})`,
            minWidth: 50,
          }}
        >
          {icon}
        </ThemeIcon>

        <Stack gap="xs">
          <Title order={3} size="h4" fw={700}>
            {title}
          </Title>

          <Box c="gray.7" style={{ lineHeight: 1.6 }}>
            {children}
          </Box>
        </Stack>
      </Group>
    </Paper>
  );
}
