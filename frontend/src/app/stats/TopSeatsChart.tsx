'use client';

import { Paper, Text } from '@mantine/core';
import { BarChart } from '@mantine/charts';
import classes from './TopSeatsChart.module.css';
import { get_bn_name_of_seat_name } from '@/data/DistrictSeat';

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
          {payload[0].payload.label}
        </Text>

        <Text size="sm" c="brandGreen.9" fw={500}>
          রিপোর্ট : <span style={{ fontWeight: 700 }}>{payload[0].payload.count}</span>
        </Text>
      </Paper>
    );
  }
  return null;
}

export function TopSeatsChart({ data }: any) {
  if (data == null) {
    return (
      <Paper withBorder p="xl" radius="lg" shadow="sm">
        <Text c="dimmed" size="sm" ta="center">
          কোনো তথ্য পাওয়া যায়নি
        </Text>
      </Paper>
    );
  }
  return (
    <Paper withBorder p="xl" radius="lg" shadow="sm">
      <Text size="lg" fw={700} mb="xl" c="brandGreen.9">
        📍 সর্বাধিক রিপোর্টকৃত আসন
      </Text>

      <BarChart
        className={classes.chart}
        h={350}
        data={data.map((item: any) => ({
          label: get_bn_name_of_seat_name(item.label),
          count: item.count,
        }))}
        dataKey="label"
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
        series={[{ name: 'count', color: 'brandGreen.7' }]}
      />
    </Paper>
  );
}
