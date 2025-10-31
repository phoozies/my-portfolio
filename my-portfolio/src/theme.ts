import { createTheme } from '@mui/material/styles'

export const pixelTheme = createTheme({
  typography: {
    fontFamily: '"Courier New", monospace',
    allVariants: {
      fontFamily: '"Courier New", monospace',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Courier New", monospace',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Courier New", monospace',
        },
        label: {
          fontFamily: '"Courier New", monospace',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Courier New", monospace',
          textTransform: 'uppercase',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          fontFamily: '"Courier New", monospace',
        },
      },
    },
  },
})
