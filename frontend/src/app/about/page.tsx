'use client';

import { AppLayout } from '@/components/AppLayout';
import { InfoCard } from '@/components/InfoCard';
import { Container, Text, Title, Center, Stack, Box, List } from '@mantine/core';
import { IconAlertTriangle, IconEye, IconHeart, IconScale, IconShield } from '@tabler/icons-react';

export default function AboutPage() {
  return (
    <AppLayout>
      <Container size="lg" py={80} style={{ position: 'relative' }}>
        <Center>
          <Title w="bold">সম্পর্কে ও দায়মুক্তি</Title>
        </Center>
        <Center>
          <Text c="dimmed">চাঁদাবাজ.AI কী এবং কেন এটি তৈরি করা হয়েছে</Text>
        </Center>

        <Center mt="40">
          <Box w="100%" maw="800px">
            <InfoCard title="গুরুত্বপূর্ণ দায়মুক্তি" variant="danger" icon={<IconAlertTriangle />}>
              <Text>
                <b>চাঁদাবাজ.AI</b> একটি
                <span style={{ color: 'red' }}>ব্যঙ্গাত্মক সচেতনতামূলক প্ল্যাটফর্ম</span>। এটি কোনো
                আইনি কর্তৃপক্ষ, সরকারি সংস্থা, বা অভিযোগ নিষ্পত্তি প্রতিষ্ঠান নয়। এখানে জমা দেওয়া
                কোনো রিপোর্ট আইনি অভিযোগ হিসেবে বিবেচিত হবে না এবং কোনো আইনি পদক্ষেপ নেওয়া হবে না।
              </Text>
            </InfoCard>
          </Box>
        </Center>
        <Center mt="40">
          <Box w="100%" maw="800px">
            <InfoCard title="উদ্দেশ্য" icon={<IconHeart />}>
              <Text>
                বাংলাদেশের সাম্প্রতিক নির্বাচনী সংস্কৃতির প্রতিফলন হিসেবে এই প্ল্যাটফর্ম তৈরি।
                রাজনৈতিক চাঁদাবাজি, ভয় দেখানো, এবং হয়রানির বিরুদ্ধে জনসচেতনতা বাড়ানোই আমাদের মূল
                লক্ষ্য।
              </Text>
            </InfoCard>
          </Box>
        </Center>
        <Center mt="40">
          <Box w="100%" maw="800px">
            <InfoCard title="গোপনীয়তা নীতি" icon={<IconShield />}>
              <List>
                <List.Item>কোনো লগইন বা অ্যাকাউন্ট প্রয়োজন নেই</List.Item>
                <List.Item>কোনো ব্যক্তিগত তথ্য (নাম, ফোন, ইমেইল) সংগ্রহ করা হয় না</List.Item>
                <List.Item>IP অ্যাড্রেস সংরক্ষণ করা হয় না</List.Item>
                <List.Item>সমস্ত রিপোর্ট সম্পূর্ণ বেনামে</List.Item>
              </List>
            </InfoCard>
          </Box>
        </Center>
        <Center mt="40">
          <Box w="100%" maw="800px">
            <InfoCard title="স্বচ্ছতা" icon={<IconEye />}>
              <Text>
                পরিসংখ্যান পৃষ্ঠায় শুধুমাত্র সামগ্রিক সংখ্যা দেখানো হয়। কোনো নির্দিষ্ট ব্যক্তি বা
                প্রতিষ্ঠানের নাম প্রকাশ করা হয় না। রিপোর্টের বিস্তারিত বিবরণ কখনোই প্রকাশ্যে দেখানো
                হয় না।
              </Text>
            </InfoCard>
          </Box>
        </Center>
        <Center mt="40">
          <Box w="100%" maw="800px">
            <InfoCard variant="warning" title="আইনি দিক" icon={<IconScale />}>
              <Text>
                আসল আইনি অভিযোগের জন্য অনুগ্রহ করে স্থানীয় থানা, জেলা প্রশাসন, বা নির্বাচন কমিশনে
                যোগাযোগ করুন। এই প্ল্যাটফর্ম কোনো আইনি সহায়তা প্রদান করে না।
              </Text>
            </InfoCard>
          </Box>
        </Center>
      </Container>
    </AppLayout>
  );
}
