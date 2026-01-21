'use client';

import { AppLayout } from '@/components/AppLayout';
import { Text, Title, Center, Paper, Button, Flex } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <AppLayout>
      <Center>
        <Paper withBorder shadow="md" p={30} radius="md" mt={80} maw={500}>
          <Center>
            <IconCircleCheck size={48} color="green" />
          </Center>
          <Center>
            <Title w="bold">রিপোর্ট জমা হয়েছে!</Title>
          </Center>
          <Center>
            <Text mt={10} ta="center" c="dimmed">
              আপনার বেনামে রিপোর্ট সফলভাবে জমা হয়েছে। এটি আমাদের পরিসংখ্যানে যোগ হবে।
            </Text>
          </Center>

          <Flex gap="md" justify="center" mt={20} direction={{ base: 'column', sm: 'row' }}>
            <Button component={Link} href="/report" color="red" w={{ base: '100%', sm: 'auto' }}>
              আবার রিপোর্ট করুন
            </Button>
            <Button
              component={Link}
              href="/stats"
              color="brandGreen.7"
              w={{ base: '100%', sm: 'auto' }}
            >
              পরিসংখ্যান দেখুন
            </Button>
          </Flex>
        </Paper>
      </Center>
    </AppLayout>
  );
}
