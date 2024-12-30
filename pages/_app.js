import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Head from 'next/head'; // Import Head for metadata
import '../styles/globals.css';
import theme from '../components/theme';
import { AuthProvider } from '../authcontext/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Add Head for favicon */}
      <Head>
        <link rel="icon" href="/assets/Masfavicon.png" />
        <title>MAS</title> {/* Optional: Add a title for the app */}
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
