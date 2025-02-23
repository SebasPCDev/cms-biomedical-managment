import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#fbfbfb",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          color: "#fbfbfb",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          color: "#fbfbfb",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #333",
          color: "#fbfbfb",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#fbfbfb",
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: "#fbfbfb",
          backgroundColor: "#1e1e1e",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          color: "#fbfbfb",
        },
      },
    },
  },
});

export default theme;
