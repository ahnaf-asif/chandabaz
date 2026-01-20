import { createTheme, MantineTheme, rem } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "var(--font-hind-siliguri), sans-serif",
  headings: {
    fontFamily: "var(--font-hind-siliguri), sans-serif",
    fontWeight: "600",
  },

  colors: {
    brandGreen: [
      "#eefcf5", // 0 - Light background (hover states)
      "#dbf7e4", // 1
      "#b0edc7", // 2
      "#82e2a8", // 3
      "#5cd88c", // 4
      "#3bce74", // 5
      "#2eb665", // 6
      "#218e4e", // 7
      "#136838", // 8
      "#00331a", // 9 - Your Base Color (Primary)
    ],
    brandRed: [
      "#ffecec",
      "#ffd8d8",
      "#ffb1b1",
      "#ff8686",
      "#ff6060",
      "#ff4848",
      "#ff3c3c",
      "#e63030",
      "#cd2626",
      "#b51919",
    ],
  },

  primaryColor: "brandGreen",
  primaryShade: 9,

  defaultRadius: "md",

  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
    xl: "0 4px 20px -4px rgba(0, 112, 60, 0.15)", // Your custom colored shadow
  },

  components: {
    Button: {
      defaultProps: {
        size: "md",
      },
    },
    Card: {
      defaultProps: {
        shadow: "sm",
        padding: "lg",
        radius: "md",
        withBorder: true,
      },
      styles: (theme: MantineTheme) => ({
        root: {
          backgroundColor: "var(--mantine-color-body)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows.md,
          },
        },
      }),
    },
    TextInput: {
      defaultProps: {
        size: "md",
      },
      styles: {
        input: {
          backgroundColor: "#f8faf9",
        },
      },
    },
  },
});
