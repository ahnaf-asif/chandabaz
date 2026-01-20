import { AppLayout } from '@/components/AppLayout';
import { Badge, Center, Container, Title, Text } from '@mantine/core';
import { IconShield } from '@tabler/icons-react';
import ReportForm from './form';

export default function AboutPage() {
  return (
    <AppLayout>
      <Container size="lg" py={80} style={{ position: 'relative' }}>
        <Center>
          <Badge
            variant="light"
            color="#136838"
            size="lg"
            radius="xl"
            px="lg"
            leftSection={<IconShield size={14} />}
          >
            বেনামে • গোপনীয়
          </Badge>
        </Center>
        <Center mt={40}>
          <Title w="bold">অভিযোগ রিপোর্ট করুন</Title>
        </Center>
        <Center>
          <Text c="dimmed">
            আপনার পরিচয় সম্পূর্ণ গোপন থাকবে। কোনো ব্যক্তিগত তথ্য সংগ্রহ করা হয় না।
          </Text>
        </Center>
        <Container mt={40} maw={600}>
          <ReportForm />
        </Container>
      </Container>
    </AppLayout>
  );
}
