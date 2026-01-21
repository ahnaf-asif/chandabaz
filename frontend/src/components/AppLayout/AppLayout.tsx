'use client';
import Link from 'next/link';
import {
  AppShell,
  Group,
  Burger,
  Button,
  Text,
  ThemeIcon,
  Stack,
  UnstyledButton,
  Container,
  Box,
  Divider,
  Anchor,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAlertTriangle } from '@tabler/icons-react';
import classes from './AppLayout.module.css';
import { usePathname } from 'next/navigation';

const links = [
  { link: '/', label: 'হোম' },
  { link: '/report', label: 'রিপোর্ট করুন' },
  { link: '/stats', label: 'পরিসংখ্যান' },
  { link: '/about', label: 'সম্পর্কে' },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  const pathname = usePathname();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      // onClick={(event) => event.preventDefault()}
      data-active={pathname === link.link || undefined}
    >
      {link.label}
    </Link>
  ));

  const mobileItems = links.map((link) => (
    <UnstyledButton
      data-active={pathname == link.link || undefined}
      key={link.label}
      className={classes.mobileLink}
      onClick={() => toggle()}
    >
      {link.label}
    </UnstyledButton>
  ));

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding={0}
    >
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between">
            <Group>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

              <Group gap="xs">
                <ThemeIcon color="brandGreen.8" size="lg" radius="md">
                  <IconAlertTriangle size="1.2rem" />
                </ThemeIcon>
                <Text
                  component={Link}
                  href="/"
                  fw={800}
                  size="xl"
                  c="brandGreen.9"
                  style={{ letterSpacing: '-0.5px' }}
                >
                  চাঁন্দাবাজ
                </Text>
              </Group>
            </Group>

            <Group gap="xl" visibleFrom="sm">
              {items}
            </Group>

            <Group visibleFrom="sm">
              <Button component={Link} href="/report" color="brandRed.7" radius="md" fw={600}>
                রিপোর্ট করুন
              </Button>
            </Group>

            <Button color="brandRed.7" size="xs" radius="md" hiddenFrom="sm">
              রিপোর্ট
            </Button>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap="xs">
          {mobileItems}
          <Button color="brandRed.7" fullWidth mt="md" radius="md">
            রিপোর্ট করুন
          </Button>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <div className="page-transition">{children}</div>
      </AppShell.Main>

      <Box
        pt="xl"
        pb="md"
        bg="gray.0"
        style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}
      >
        <Container size="lg" mb="xl">
          <Text ta="center">
            <IconAlertTriangle color="red" size={16} /> এটি একটি ব্যাঙ্গাত্মক সচেতনতামূলক
            প্ল্যাটফর্ম, আইনি কর্তৃপক্ষ নয়।
          </Text>
          <Divider my="md" />
        </Container>

        <Container size="lg">
          <Group justify="space-between" align="center">
            <Stack gap={0}>
              <Group gap="xs" mb={5}>
                <ThemeIcon color="brandGreen" size="sm" radius="sm">
                  <IconAlertTriangle size="0.8rem" />
                </ThemeIcon>
                <Text fw={700} c="brandGreen.9">
                  চাঁদাবাজ.AI
                </Text>
              </Group>
              <Text size="xs" c="dimmed">
                চাঁদা চাইলে রসিদ নাই, রিপোর্ট আছে
              </Text>
            </Stack>

            <Group gap="lg">
              {links.map((link) => (
                <Anchor component={Link} key={link.link} size="sm" c="dimmed" href={link.link}>
                  {link.label}
                </Anchor>
              ))}
            </Group>
          </Group>

          <Divider my="md" />

          <Text ta="center" size="xs" c="dimmed">
            © 2026 চাঁন্দাবাজ — জনসচেতনতার জন্য নির্মিত
          </Text>
        </Container>
      </Box>
    </AppShell>
  );
}
