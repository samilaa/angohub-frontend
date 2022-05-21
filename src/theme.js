import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: [
      'Archivo',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  palette: {
    primary: {
      main: '#f1f1f1'
    },
    secondary: {
      main: '#19857b'
    },
    background: {
      main: '#121212'
    },
    error: {
      main: red.A400
    }
  }
})

export default theme
