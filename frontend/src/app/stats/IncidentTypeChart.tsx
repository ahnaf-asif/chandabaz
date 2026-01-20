'use client';

import { Paper, Text, Group, Box } from '@mantine/core';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'চাঁদা চাওয়া', value: 40, color: '#0ca678' },
  { name: 'ভয় দেখানো', value: 25, color: '#fa5252' },
  { name: 'জোরপূর্বক আদায়', value: 15, color: '#fcc419' },
  { name: 'ব্যবসা হয়রানি', value: 10, color: '#20c997' },
  { name: 'অন্যান্য', value: 10, color: '#adb5bd' },
];

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <Paper p="xs" shadow="md" radius="md" withBorder bg="white" style={{ minWidth: 120 }}>
        <Text size="sm" fw={600} mb={2} c="dark.9">
          {item.name}
        </Text>

        <Text size="xs" c="dimmed">
          রিপোর্ট:{' '}
          <span style={{ fontWeight: 700, color: item.color, fontSize: 14 }}>{item.value}%</span>
        </Text>
      </Paper>
    );
  }
  return null;
}

export function IncidentTypeChart() {
  return (
    <Paper withBorder p="xl" radius="lg" shadow="sm">
      <Text size="lg" fw={700} mb="xl" c="red.9">
        ⚠️ ঘটনার ধরন অনুযায়ী
      </Text>

      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <Group justify="center" mt="md" gap="md" style={{ flexWrap: 'wrap' }}>
        {data.map((item) => (
          <Group key={item.name} gap={6}>
            <Box w={10} h={10} style={{ borderRadius: '50%', backgroundColor: item.color }} />
            <Text size="sm" c="dimmed" fw={500}>
              {item.name}
            </Text>
          </Group>
        ))}
      </Group>
    </Paper>
  );
}
