import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";

import {
  LOGGED_IN_USER_ROUTES,
  NON_LOGGED_IN_USER_ROUTES,
} from "./routing/routes";
import { useAuth, useDarkMode } from "./state";

function App() {
  const isDarkMode = useDarkMode((state) => state.isDarkMode);
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={theme}>
      <Paper
        style={{
          height: "auto",
          minHeight: "100vh",
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Header />
            <Routes>
              {isLoggedIn
                ? LOGGED_IN_USER_ROUTES.map((item) => {
                    return (
                      <Route
                        path={item.path}
                        key={item.path}
                        element={<item.element />}
                      />
                    );
                  })
                : NON_LOGGED_IN_USER_ROUTES.map((item) => {
                    return (
                      <Route
                        path={item.path}
                        key={item.path}
                        element={<item.element />}
                      />
                    );
                  })}
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
