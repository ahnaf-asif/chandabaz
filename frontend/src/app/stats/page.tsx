import { AppLayout } from '@/components/AppLayout';
import { Container, Center, Title, Text, SimpleGrid, Paper, Group } from '@mantine/core';
import { TopSeatsChart } from './TopSeatsChart';
import { IncidentTypeChart } from './IncidentTypeChart';
import { IconChartBar, IconMapPin, IconTrendingUp, IconAlertTriangle } from '@tabler/icons-react';
import { StatCard } from './StatCard';
import { SeverityCard } from './SeverityCard';

export default function StatsPage() {
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

        <SimpleGrid mt={40} cols={{ base: 1, xs: 2, md: 4 }} spacing="lg">
          <StatCard icon={IconChartBar} value="২৫৬" label="মোট রিপোর্ট" />
          <StatCard icon={IconMapPin} value="৪৭" label="আসন সংখ্যা" />
          <StatCard icon={IconTrendingUp} value="৩২" label="এই সপ্তাহে" />
          <StatCard icon={IconAlertTriangle} value="৫৫%" label="গুরুতর ঘটনা" />
        </SimpleGrid>

        <SimpleGrid mt={40} cols={{ base: 1, md: 2 }} spacing="lg">
          <TopSeatsChart />
          <IncidentTypeChart />
        </SimpleGrid>

        <Paper mt={40} withBorder p="xl" radius="lg" shadow="sm" bg="white">
          <Group mb="xl" gap="xs">
            <IconTrendingUp size={24} color="green" stroke={2} />
            <Text size="lg" fw={700} c="brandGreen.9">
              তীব্রতার মাত্রা
            </Text>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
            <SeverityCard label="হালকা চাপ" percentage={45} />
            <SeverityCard label="গুরুতর হুমকি" percentage={38} />
            <SeverityCard label="সহিংসতা" percentage={17} />
          </SimpleGrid>
        </Paper>
      </Container>
    </AppLayout>
  );
}
