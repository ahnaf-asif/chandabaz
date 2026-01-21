'use client';

import { Paper, Text, Group, Box } from '@mantine/core';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { get_report_type_by_en } from '@/data/ReportType';
import { en_number_to_bn_number } from '@/utils/utils';

const CHART_COLORS = [
  '#FF6B6B', // Red
  '#339AF0', // Blue
  '#51CF66', // Green
  '#FCC419', // Yellow
  '#845EF7', // Violet
  '#FF922B', // Orange
  '#20C997', // Teal
  '#F06595', // Pink
];

interface PieChartItem {
  label: string;
  percentage: number;
}

interface IncidentTypeChartProps {
  data: PieChartItem[];
}

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
          <span style={{ fontWeight: 700, color: item.color, fontSize: 14 }}>
            {en_number_to_bn_number(item.value)}%
          </span>
        </Text>
      </Paper>
    );
  }
  return null;
}

export function IncidentTypeChart({ data }: IncidentTypeChartProps) {
  if (!data || data.length === 0) {
    return (
      <Paper withBorder p="xl" radius="lg" shadow="sm">
        <Text c="dimmed" size="sm" ta="center">
          কোনো তথ্য পাওয়া যায়নি
        </Text>
      </Paper>
    );
  }
  const processedData = data.map((item, index) => ({
    name: get_report_type_by_en(item.label).type_bn,
    value: item.percentage,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));

  return (
    <Paper withBorder p="xl" radius="lg" shadow="sm">
      <Text size="lg" fw={700} mb="xl" c="red.9">
        ⚠️ ঘটনার ধরন অনুযায়ী
      </Text>

      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <Group justify="center" mt="md" gap="md" style={{ flexWrap: 'wrap' }}>
        {processedData.map((item) => (
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
