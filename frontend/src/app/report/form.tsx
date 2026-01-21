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
  Textarea,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import classes from './styles.module.css';
import { IconChevronDown, IconAlertTriangle } from '@tabler/icons-react';
import { useState } from 'react';
import { InfoCard } from '@/components/InfoCard';

import { REPORT_TYPE_OPTIONS, getReportTypeIcon } from '@/data/ReportType';
import { SEVERITY_OPTIONS } from '@/data/SeverityOptions';
import { ALL_DIVISIONS } from '@/data/Division';
import { get_districts_by_division_name } from '@/data/District';
import { get_parliament_seats_by_district } from '@/data/DistrictSeat';
import api from '@/axios';
import { useRouter } from 'next/navigation';

export default function ReportForm() {
  const router = useRouter();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      division: '',
      district: '',
      seat: '',
      type_of_complaint: '',
      severity: '',
      description: '',
    },
    validate: {
      division: (value) => (value !== '' ? null : 'দয়া করে বিভাগ নির্বাচন করুন'),
      district: (value) => (value !== '' ? null : 'দয়া করে জেলা নির্বাচন করুন'),
      seat: (value) => (value !== '' ? null : 'দয়া করে আসন নির্বাচন করুন'),
      type_of_complaint: (value) => (value !== '' ? null : 'দয়া করে অভিযোগের ধরন নির্বাচন করুন'),
      severity: (value) => (value !== '' ? null : 'দয়া করে তীব্রতার মাত্রা নির্বাচন করুন'),
      description: (value) => (value.trim().length > 20 ? null : 'দয়া করে আরেকটু বর্ণনা লিখুন'),
    },
  });

  const handleError = (errors: typeof form.errors) => {
    const firstErrorKey = Object.keys(errors)[0];

    if (firstErrorKey) {
      console.log(firstErrorKey);

      const element = document.getElementById(firstErrorKey);
      console.log(element);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (element instanceof HTMLElement) {
          element.focus();
        }
      }
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const resp = await api.post('/api/reports', values);
      console.log('Response:', resp.data);
      router.push('/report/success');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
        <Card shadow="md" radius="md">
          <Title size="md">
            এলাকা নির্বাচন করুন <span style={{ color: 'red' }}>*</span>
          </Title>
          <Box mt={20}>
            <Select
              id="division"
              label="বিভাগ"
              withAsterisk
              placeholder="বিভাগ নির্বাচন করুন"
              error={form.errors.division}
              data={ALL_DIVISIONS.map((division) => ({
                value: division.name,
                label: division.bn_name,
              }))}
              classNames={{ option: classes.redHoverOption }}
              rightSection={<IconChevronDown size={16} />}
              value={form.values.division}
              onChange={(val) => {
                form.setFieldValue('division', val as string);
                form.setFieldValue('district', '');
                form.setFieldValue('seat', '');
              }}
            />
          </Box>
          <Box mt={20}>
            <Select
              key={form.values.division}
              label="জেলা"
              id="district"
              disabled={form.values.division === ''}
              withAsterisk
              placeholder="জেলা নির্বাচন করুন"
              error={form.errors.district}
              data={get_districts_by_division_name(form.values.division).map((district) => ({
                value: district.name,
                label: district.bn_name,
              }))}
              classNames={{ option: classes.redHoverOption }}
              rightSection={<IconChevronDown size={16} />}
              value={form.values.district}
              onChange={(val) => {
                form.setFieldValue('district', val as string);
                form.setFieldValue('seat', '');
              }}
            />
          </Box>
          <Box mt={20}>
            <Select
              label="সংসদীয় আসন"
              id="seat"
              withAsterisk
              disabled={form.values.district === ''}
              error={form.errors.seat}
              placeholder="সংসদীয় আসন নির্বাচন করুন"
              data={get_parliament_seats_by_district(form.values.district).map((seat) => ({
                value: seat.name,
                label: seat.bn_name,
              }))}
              classNames={{ option: classes.redHoverOption }}
              rightSection={<IconChevronDown size={16} />}
              value={form.values.seat}
              onChange={(val) => {
                form.setFieldValue('seat', val as string);
              }}
            />
          </Box>
          {/* <Box mt={20}>
            <Select
              label="ইউনিয়ন (ঐচ্ছিক)"
              placeholder="ইউনিয়ন নির্বাচন করুন"
              disabled={form.values.seat === ''}
              data={['React', 'Angular', 'Vue', 'Svelte']}
              classNames={{ option: classes.redHoverOption }}
              rightSection={<IconChevronDown size={16} />}
              value={form.values.union}
              onChange={(val) => form.setFieldValue('union', val as string)}
            />
          </Box> */}
        </Card>

        <Paper mt={30} withBorder shadow="md" p="xl" radius="lg" bg="white">
          <Text id="type_of_complaint" fw={600} mb="lg" size="md">
            অভিযোগের ধরন <span style={{ color: 'red' }}>*</span>
          </Text>

          <Radio.Group
            {...form.getInputProps('type_of_complaint')}
            inputWrapperOrder={['label', 'error', 'description', 'input']}
            styles={{
              error: { marginBottom: '8px' },
            }}
          >
            <Stack gap="md">
              {REPORT_TYPE_OPTIONS.map((option) => {
                const Icon = getReportTypeIcon(option.id);
                const isSelected = form.values.type_of_complaint === option.type_en;

                return (
                  <Paper
                    key={option.id}
                    component="label"
                    withBorder
                    p="md"
                    radius="md"
                    style={{
                      cursor: 'pointer',
                      borderColor: isSelected ? 'var(--mantine-color-brandGreen-9)' : undefined,
                      backgroundColor: isSelected ? 'var(--mantine-color-brandGreen-0)' : undefined,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Group wrap="nowrap">
                      <Radio
                        value={option.type_en}
                        color="brandGreen.9"
                        style={{ cursor: 'pointer' }}
                      />

                      <ThemeIcon variant="light" size="lg" color="brandGreen.9" bg="brandGreen.0">
                        <Icon size={22} stroke={1.5} />
                      </ThemeIcon>

                      <Text fw={500}>{option.type_bn}</Text>
                    </Group>
                  </Paper>
                );
              })}
            </Stack>
          </Radio.Group>
        </Paper>
        <Paper mt={30} withBorder shadow="md" p="xl" radius="lg" bg="white">
          <Text id="severity" fw={700} mb="lg" size="md">
            তীব্রতার মাত্রা <span style={{ color: 'red' }}>*</span>
          </Text>

          <Radio.Group
            {...form.getInputProps('severity')}
            inputWrapperOrder={['label', 'error', 'description', 'input']}
            styles={{
              error: { marginBottom: '8px' },
            }}
          >
            <Stack gap="md">
              {SEVERITY_OPTIONS.map((option) => {
                const isSelected = form.values.severity === option.label_en;

                return (
                  <Paper
                    key={option.id}
                    component="label"
                    withBorder
                    p="md"
                    radius="md"
                    style={{
                      cursor: 'pointer',
                      borderColor: isSelected ? 'var(--mantine-color-brandGreen-9)' : undefined,
                      backgroundColor: isSelected ? 'var(--mantine-color-brandGreen-0)' : undefined,
                      transition: 'all 0.2s',
                    }}
                  >
                    <Group wrap="nowrap" align="flex-start">
                      <Radio
                        value={option.label_en}
                        color="brandGreen.9"
                        style={{ cursor: 'pointer', marginTop: 4 }}
                      />
                      <Stack gap={2}>
                        <Text fw={600} size="md">
                          {option.label_bn}
                        </Text>
                        <Text size="sm" c="dimmed">
                          {option.text_bn}
                        </Text>
                      </Stack>
                    </Group>
                  </Paper>
                );
              })}
            </Stack>
          </Radio.Group>
        </Paper>
        <Paper mt={30} withBorder shadow="md" p="xl" radius="lg" bg="white">
          <Text fw={700} mb="lg" size="md">
            ঘটনার সংক্ষিপ্ত বিবরণ <span style={{ color: 'red' }}>*</span>
          </Text>
          <Textarea
            {...form.getInputProps('description')}
            withAsterisk
            placeholder="ঘটনার সংক্ষিপ্ত বিবরণ দিন। নিজের পরিচয় গোপন রাখুন"
            minRows={7}
            autosize
          />
        </Paper>
        <Box mt={40}>
          <Button fullWidth color="brandRed.7" type="submit">
            রিপোর্ট জমা দিন
          </Button>
        </Box>
      </form>
      <Box mt={40} w="100%" maw="800px">
        <InfoCard title="দ্রষ্টব্য" variant="danger" icon={<IconAlertTriangle />}>
          <Text>
            এই তথ্যগুলো যাচাইকৃত অভিযোগ নয়। এটি বাংলাদেশে বিদ্যমান সমস্যার একটি ডেমো ও জনসচেতনতা
            উদ্যোগ।
          </Text>
        </InfoCard>
      </Box>
    </Box>
  );
}
