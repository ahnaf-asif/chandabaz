'use client';

import {
  Box,
  Card,
  Title,
  Select,
  Paper,
  Text,
  Radio,
  Stack,
  Group,
  ThemeIcon,
} from '@mantine/core';
import classes from './styles.module.css';
import {
  IconChevronDown,
  IconSkull,
  IconHome2,
  IconCash,
  IconBuildingSkyscraper,
} from '@tabler/icons-react';
import { useState } from 'react';

export default function ReportForm() {
  const [value, setValue] = useState('');
  return (
    <Box>
      <Card shadow="md" radius="md">
        <Title size="md">
          এলাকা নির্বাচন করুন <span style={{ color: 'red' }}>*</span>
        </Title>
        <Box mt={20}>
          <Select
            label="বিভাগ"
            withAsterisk
            placeholder="বিভাগ নির্বাচন করুন"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            classNames={{ option: classes.redHoverOption }}
            rightSection={<IconChevronDown size={16} />}
          />
        </Box>
        <Box mt={20}>
          <Select
            label="জেলা"
            withAsterisk
            placeholder="জেলা নির্বাচন করুন"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            classNames={{ option: classes.redHoverOption }}
            rightSection={<IconChevronDown size={16} />}
          />
        </Box>
        <Box mt={20}>
          <Select
            label="সংসদীয় আসন"
            withAsterisk
            placeholder="সংসদীয় আসন নির্বাচন করুন"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            classNames={{ option: classes.redHoverOption }}
            rightSection={<IconChevronDown size={16} />}
          />
        </Box>
        <Box mt={20}>
          <Select
            label="ওয়ার্ড / ইউনিয়ন (ঐচ্ছিক)"
            placeholder="ওয়ার্ড / ইউনিয়ন নির্বাচন করুন"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            classNames={{ option: classes.redHoverOption }}
            rightSection={<IconChevronDown size={16} />}
          />
        </Box>
      </Card>

      <Paper mt={30} withBorder shadow="md" p="xl" radius="lg" bg="white">
        <Text fw={600} mb="lg" size="md">
          অভিযোগের ধরন <span style={{ color: 'red' }}>*</span>
        </Text>

        <Radio.Group value={value} onChange={setValue}>
          <Stack gap="md">
            <Paper
              component="label"
              withBorder
              p="md"
              radius="md"
              style={{
                cursor: 'pointer',
                borderColor: value === 'threat' ? 'var(--mantine-color-brandGreen-9)' : undefined,
                backgroundColor:
                  value === 'threat' ? 'var(--mantine-color-brandGreen-0)' : undefined,
              }}
            >
              <Group wrap="nowrap">
                <Radio value="threat" color="brandGreen.9" style={{ cursor: 'pointer' }} />
                <ThemeIcon variant="light" size="lg" color="brandGreen.9" bg="brandGreen.0">
                  <IconSkull size={22} />
                </ThemeIcon>
                <Text fw={500}>সন্ত্রাস / প্রাণনাশের হুমকি</Text>
              </Group>
            </Paper>

            <Paper
              component="label"
              withBorder
              p="md"
              radius="md"
              style={{
                cursor: 'pointer',
                borderColor: value === 'land' ? 'var(--mantine-color-brandGreen-9)' : undefined,
                backgroundColor: value === 'land' ? 'var(--mantine-color-brandGreen-0)' : undefined,
              }}
            >
              <Group wrap="nowrap">
                <Radio value="land" color="brandGreen.9" style={{ cursor: 'pointer' }} />
                <ThemeIcon variant="light" size="md" color="brandGreen.9" bg="brandGreen.0">
                  <IconHome2 size={22} />
                </ThemeIcon>
                <Text>দখলদারি (জমি / বাড়ি / ফ্ল্যাট)</Text>
              </Group>
            </Paper>

            <Paper
              component="label"
              withBorder
              p="md"
              radius="md"
              style={{
                cursor: 'pointer',
                borderColor:
                  value === 'extortion' ? 'var(--mantine-color-brandGreen-9)' : undefined,
                backgroundColor:
                  value === 'extortion' ? 'var(--mantine-color-brandGreen-0)' : undefined,
              }}
            >
              <Group wrap="nowrap">
                <Radio value="extortion" color="brandGreen.9" style={{ cursor: 'pointer' }} />
                <ThemeIcon variant="light" size="md" color="brandGreen.9" bg="brandGreen.0">
                  <IconCash size={22} />
                </ThemeIcon>
                <Text fw={500}>চাঁদাবাজি (দোকান / ব্যবসা / অনুষ্ঠান)</Text>
              </Group>
            </Paper>

            <Paper
              component="label"
              withBorder
              p="md"
              radius="md"
              style={{
                cursor: 'pointer',
                borderColor: value === 'admin' ? 'var(--mantine-color-brandGreen-9)' : undefined,
                backgroundColor:
                  value === 'admin' ? 'var(--mantine-color-brandGreen-0)' : undefined,
              }}
            >
              <Group wrap="nowrap">
                <Radio value="admin" color="brandGreen.9" style={{ cursor: 'pointer' }} />
                <ThemeIcon variant="light" size="md" color="brandGreen.9" bg="brandGreen.0">
                  <IconBuildingSkyscraper size={22} />
                </ThemeIcon>
                <Text fw={500}>প্রশাসনিক হয়রানি</Text>
              </Group>
            </Paper>
          </Stack>
        </Radio.Group>
      </Paper>
      <Paper mt={30} withBorder shadow="md" p="xl" radius="lg" bg="white">
        <Text fw={700} mb="lg" size="md">
          তীব্রতার মাত্রা <span style={{ color: 'red' }}>*</span>
        </Text>

        <Radio.Group value={value} onChange={setValue}>
          <Stack gap="md">
            <Paper
              component="label"
              withBorder
              p="md"
              radius="md"
              style={{
                cursor: 'pointer',
                borderColor: value === 'low' ? 'var(--mantine-color-brandGreen-9)' : undefined,
                backgroundColor: value === 'low' ? 'var(--mantine-color-brandGreen-0)' : undefined,
                transition: 'all 0.2s',
              }}
            >
              <Group wrap="nowrap" align="flex-start">
                <Radio
                  value="low"
                  color="brandGreen.9"
                  style={{ cursor: 'pointer', marginTop: 4 }}
                />
                <Stack gap={2}>
                  <Text fw={600} size="md">
                    হালকা চাপ
                  </Text>
                  <Text size="sm" c="dimmed">
                    মৌখিক হুমকি বা চাপ
                  </Text>
                </Stack>
              </Group>
            </Paper>

            <Paper
              component="label"
              withBorder
              p="md"
              radius="md"
              style={{
                cursor: 'pointer',
                borderColor: value === 'medium' ? 'var(--mantine-color-brandGreen-9)' : undefined,
                backgroundColor:
                  value === 'medium' ? 'var(--mantine-color-brandGreen-0)' : undefined,
                transition: 'all 0.2s',
              }}
            >
              <Group wrap="nowrap" align="flex-start">
                <Radio
                  value="medium"
                  color="brandGreen.9"
                  style={{ cursor: 'pointer', marginTop: 4 }}
                />
                <Stack gap={2}>
                  <Text fw={600} size="md">
                    গুরুতর হুমকি
                  </Text>
                  <Text size="sm" c="dimmed">
                    সরাসরি হুমকি বা ভয় দেখানো
                  </Text>
                </Stack>
              </Group>
            </Paper>

            <Paper
              component="label"
              withBorder
              p="md"
              radius="md"
              style={{
                cursor: 'pointer',
                borderColor: value === 'high' ? 'var(--mantine-color-brandGreen-9)' : undefined,
                backgroundColor: value === 'high' ? 'var(--mantine-color-brandGreen-0)' : undefined,
                transition: 'all 0.2s',
              }}
            >
              <Group wrap="nowrap" align="flex-start">
                <Radio
                  value="high"
                  color="brandGreen.9"
                  style={{ cursor: 'pointer', marginTop: 4 }}
                />
                <Stack gap={2}>
                  <Text fw={600} size="md">
                    সহিংসতা জড়িত
                  </Text>
                  <Text size="sm" c="dimmed">
                    শারীরিক আক্রমণ বা ক্ষয়ক্ষতি
                  </Text>
                </Stack>
              </Group>
            </Paper>
          </Stack>
        </Radio.Group>
      </Paper>
    </Box>
  );
}
