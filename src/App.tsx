import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";

import {
  LOGGED_IN_USER_ROUTES,
  NON_LOGGED_IN_USER_ROUTES,
} from "./routing/routes";
import { useAuth } from "./state";

function App() {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const queryClient = new QueryClient();
  return (
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
  );
}

export default App;
