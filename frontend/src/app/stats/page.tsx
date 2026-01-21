'use client';

import { AppLayout } from '@/components/AppLayout';
import { Container, Center, Title, Text, SimpleGrid, Paper, Group } from '@mantine/core';
import { TopSeatsChart } from './TopSeatsChart';
import { IncidentTypeChart } from './IncidentTypeChart';
import { IconChartBar, IconMapPin, IconTrendingUp, IconAlertTriangle } from '@tabler/icons-react';
import { StatCard } from './StatCard';
import { SeverityCard } from './SeverityCard';
import { useEffect, useState } from 'react';
import api from '@/axios';

interface SeverityStats {
  mild: number;
  severe_threat: number;
  violence_involved: number;
}

interface ChartData {
  label: string;
  count: number;
}

interface PieChartData {
  label: string;
  percentage: number;
}

interface DashboardStats {
  total_report: number;
  total_seats: number;
  total_reports_since_last_saturday: number;
  severity_percentage: SeverityStats;
  bar_chart_data: ChartData[];
  report_type_pie_chart: PieChartData[];
}

const DEFAULT_DASHBOARD_STAT = {
  total_report: 0,
  total_seats: 0,
  total_reports_since_last_saturday: 0,
  severity_percentage: {
    mild: 0,
    severe_threat: 0,
    violence_involved: 0,
  },
  bar_chart_data: [],
  report_type_pie_chart: [],
};

export default function StatsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(DEFAULT_DASHBOARD_STAT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/stats/dashboard');
        setStats(response.data.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError('Failed to load statistics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    console.log(stats);
  }, [stats]);

  if (loading) return <div>Loading statistics...</div>;
  if (error) return <div>{error}</div>;
  if (!stats) return null;

  return (
    <AppLayout>
      <Container size="lg" py={80} style={{ position: 'relative' }}>
        <Center>
          <Title w="bold">লাইভ পরিসংখ্যান</Title>
        </Center>
        <Center>
          <Text c="dimmed">
            বেনামে জমা দেওয়া রিপোর্টের সামগ্রিক চিত্র। কোনো ব্যক্তিগত তথ্য প্রদর্শিত হয় না।
          </Text>
        </Center>

        <SimpleGrid mt={40} cols={{ base: 1, xs: 2, md: 3 }} spacing="lg">
          <StatCard icon={IconChartBar} value={stats.total_report} label="মোট রিপোর্ট" />
          <StatCard icon={IconMapPin} value={stats.total_seats} label="আসন সংখ্যা" />
          <StatCard
            icon={IconTrendingUp}
            value={stats.total_reports_since_last_saturday}
            label="এই সপ্তাহে"
          />
        </SimpleGrid>

        <SimpleGrid mt={40} cols={{ base: 1, md: 2 }} spacing="lg">
          <TopSeatsChart data={stats.bar_chart_data} />
          <IncidentTypeChart data={stats.report_type_pie_chart} />
        </SimpleGrid>

        <Paper mt={40} withBorder p="xl" radius="lg" shadow="sm" bg="white">
          <Group mb="xl" gap="xs">
            <IconTrendingUp size={24} color="green" stroke={2} />
            <Text size="lg" fw={700} c="brandGreen.9">
              তীব্রতার মাত্রা
            </Text>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
            <SeverityCard label="হালকা চাপ" percentage={stats.severity_percentage.mild} />
            <SeverityCard
              label="গুরুতর হুমকি"
              percentage={stats.severity_percentage.severe_threat}
            />
            <SeverityCard
              label="সহিংসতা"
              percentage={stats.severity_percentage.violence_involved}
            />
          </SimpleGrid>
        </Paper>
      </Container>
    </AppLayout>
  );
}
