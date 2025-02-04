import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Head from "next/head";
import "../styles/globals.css";
import theme from "../components/theme"; // Your existing theme
import { AuthProvider } from "../authcontext/AuthContext";
import { useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

function MyApp({ Component, pageProps }) {
  // State for darkMode
  const [darkMode, setDarkMode] = useState(false);

  // Define MUI theme with mode switching
  const themeWithMode = useMemo(
    () =>
      createTheme({
        ...theme, // Spread existing theme to keep your settings
        palette: {
          ...theme.palette,
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <>
      <Head>
        <link rel="icon" href="/assets/Masfavicon.png" />
        <title>MAS</title>
      </Head>
      <AuthProvider>
        <ThemeProvider theme={themeWithMode}>
          <CssBaseline />
          {/* Pass toggleTheme and darkMode to the component */}
          <Component
            {...pageProps}
            toggleTheme={() => setDarkMode((prev) => !prev)} // Toggle theme
            darkMode={darkMode} // Current mode (dark/light)
          />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
