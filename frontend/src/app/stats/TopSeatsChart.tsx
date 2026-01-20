'use client';

import { Paper, Text } from '@mantine/core';
import { BarChart } from '@mantine/charts';
import classes from './TopSeatsChart.module.css';

const data = [
  { seat: 'ঢাকা-৫০', reports: 48 },
  { seat: 'চট্টগ্রাম-৫', reports: 35 },
  { seat: 'ঢাকা-৮', reports: 32 },
  { seat: 'গাজীপুর-২', reports: 28 },
  { seat: 'রাজশাহী-৩', reports: 25 },
  { seat: 'নারায়ণগঞ্জ-৪', reports: 20 },
  { seat: 'খুলনা-২', reports: 18 },
  { seat: 'সিলেট-১', reports: 15 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function CustomChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    console.log(active, payload[0], label);
    return (
      <Paper p="sm" shadow="md" radius="md" withBorder bg="white">
        <Text fw={600} size="md" mb={4}>
          {payload[0].payload.seat}
        </Text>

        <Text size="sm" c="brandGreen.9" fw={500}>
          রিপোর্ট : <span style={{ fontWeight: 700 }}>{payload[0].payload.reports}</span>
        </Text>
      </Paper>
    );
  }
  return null;
}

export function TopSeatsChart() {
  return (
    <Paper withBorder p="xl" radius="lg" shadow="sm">
      <Text size="lg" fw={700} mb="xl" c="brandGreen.9">
        📍 সর্বাধিক রিপোর্টকৃত আসন
      </Text>

      <BarChart
        className={classes.chart}
        h={350}
        data={data}
        dataKey="seat"
        orientation="vertical"
        yAxisProps={{ width: 69, tickLine: false }}
        gridAxis="xy"
        barProps={{
          radius: [0, 10, 10, 0],
        }}
        tooltipProps={{
          content: CustomChartTooltip as any,
          cursor: { fill: 'transparent' },
          isAnimationActive: false,
          shared: false,
        }}
        series={[{ name: 'reports', color: 'brandGreen.7' }]}
      />
    </Paper>
  );
}
