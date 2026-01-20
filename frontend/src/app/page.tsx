'use client';

import { AppLayout } from '@/components/AppLayout';
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  SimpleGrid,
  Card,
  ThemeIcon,
  Badge,
  Stack,
  rem,
  Box,
  Divider,
  Alert,
} from '@mantine/core';
import {
  IconShieldLock,
  IconChartBar,
  IconAlertTriangle,
  IconArrowRight,
  IconLock,
} from '@tabler/icons-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <AppLayout>
      <Container size="lg" py={80} style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background:
              'radial-gradient(circle, rgba(255, 230, 230, 0.5) 0%, rgba(255, 255, 255, 0) 70%)',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />

        <Stack align="center" gap="lg">
          <Badge
            variant="light"
            color="brandRed.7"
            size="xl"
            radius="xl"
            px="lg"
            leftSection={<IconAlertTriangle size={14} />}
          >
            বেনামে রিপোর্ট করুন
          </Badge>

          <Title
            order={1}
            ta="center"
            style={{
              fontSize: rem(52),
              fontWeight: 900,
              lineHeight: 1.15,
              color: 'var(--mantine-color-brandGreen-9)',
            }}
          >
            চাঁদা চাইলে রসিদ নাই,
            <br />
            <Text span c="brandGreen.8" inherit>
              রিপোর্ট আছে
            </Text>
          </Title>

          <Text c="dimmed" ta="center" size="xl" maw={650} mt="xs">
            রাজনৈতিক চাঁদাবাজি, ভয় দেখানো, এবং নির্বাচনকালীন হয়রানির বিরুদ্ধে বেনামে রিপোর্ট করুন।
            আপনার পরিচয় গোপন থাকবে।
          </Text>

          <Group mt="md">
            <Button
              component={Link}
              href="/report"
              size="xl"
              radius="md"
              color="brandRed.7"
              rightSection={<IconArrowRight size={20} />}
              w={{ base: '100%', sm: 'auto' }}
            >
              চাঁদাবাজ রিপোর্ট করুন
            </Button>
            <Button
              component={Link}
              href="/stats"
              size="xl"
              radius="md"
              variant="outline"
              color="brandGreen"
              style={{ borderWidth: '2px' }}
              w={{ base: '100%', sm: 'auto' }}
            >
              পরিসংখ্যান দেখুন
            </Button>
          </Group>

          <Group justify="center" mt="xl" gap="xl" c="dimmed">
            <TrustItem icon={IconShieldLock} text="১০০% বেনামে" />
            <TrustItem icon={IconLock} text="কোনো ব্যক্তিগত তথ্য নেই" />
            <TrustItem icon={IconChartBar} text="উন্মুক্ত পরিসংখ্যান" />
          </Group>
        </Stack>
      </Container>

      {/* 3. Features Section */}
      <Box bg="gray.0" py={80}>
        <Container size="lg">
          <Title order={2} ta="center" mb={50} c="brandGreen.9" fw={800}>
            কেন চাঁদাবাজ.AI?
            <Text size="sm" c="dimmed" fw={400} mt={5}>
              ভোট আছে, ভয় থাকা উচিত না। এই প্ল্যাটফর্মে আপনি বেনামে রিপোর্ট করতে পারবেন।
            </Text>
          </Title>

          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <FeatureCard
              icon={IconShieldLock}
              color="brandGreen"
              title="সম্পূর্ণ বেনামে"
              description="কোনো লগইন নেই, কোনো ব্যক্তিগত তথ্য সংগ্রহ করা হয় না। আপনার পরিচয় সম্পূর্ণ গোপন।"
            />
            <FeatureCard
              icon={IconChartBar}
              color="brandRed"
              title="লাইভ পরিসংখ্যান"
              description="এলাকা ভিত্তিক রিপোর্টের হিটম্যাপ দেখুন। কোন এলাকায় কত অভিযোগ জানুন।"
            />
            <FeatureCard
              icon={IconAlertTriangle}
              color="brandGreen"
              title="জনসচেতনতা"
              description="এটি আইনি কর্তৃপক্ষ নয়, একটি বাস্তবানুগ সচেতনতামূলক প্ল্যাটফর্ম।"
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* 4. CTA Box */}
      <Container size="md" py={80}>
        <Card
          radius="lg"
          padding={50}
          bg="gray.0"
          style={{
            textAlign: 'center',
            border: '1px solid var(--mantine-color-gray-2)',
          }}
        >
          <Title order={2} c="brandGreen.9" fw={800} mb="sm">
            চাঁদাবাজির শিকার হয়েছেন?
          </Title>
          <Text c="dimmed" mb="xl">
            বেনামে রিপোর্ট করুন। আপনার রিপোর্ট জনসচেতনতা বাড়াতে সাহায্য করবে।
          </Text>
          <Button
            color="brandRed.7"
            component={Link}
            href="/report"
            size="lg"
            radius="md"
            w={{ base: '100%', sm: 'auto' }}
            style={{ alignSelf: 'center' }}
          >
            এখনই রিপোর্ট করুন
            <IconArrowRight size={18} style={{ marginLeft: 8 }} />
          </Button>
        </Card>
      </Container>
    </AppLayout>
  );
}

// --- Helper Components ---

function TrustItem({ icon: Icon, text }: any) {
  return (
    <Group gap={6}>
      <Icon size={18} stroke={2} color="var(--mantine-color-brandGreen-7)" />
      <Text size="md" fw={800}>
        {text}
      </Text>
    </Group>
  );
}

function FeatureCard({ icon: Icon, color, title, description }: any) {
  return (
    <Card radius="md" padding="xl" shadow="md" withBorder style={{ textAlign: 'center' }}>
      <Stack align="center" gap="md">
        <ThemeIcon variant="light" size={60} radius="md" color={color} style={{ fontSize: '30px' }}>
          <Icon stroke={1.5} />
        </ThemeIcon>
        <Title order={4} fw={700}>
          {title}
        </Title>
        <Text size="sm" c="dimmed" lh={1.6}>
          {description}
        </Text>
      </Stack>
    </Card>
  );
}
