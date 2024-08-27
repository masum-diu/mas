import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import '../styles/globals.css'
import theme from '../components/theme'
import { AuthProvider } from '../authcontext/AuthContext'

function MyApp({ Component, pageProps }) {
  return <>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  </>
}

export default MyApp
