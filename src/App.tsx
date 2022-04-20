import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";

import { NON_LOGGED_IN_USER_ROUTES } from "./routing/routes";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          {NON_LOGGED_IN_USER_ROUTES.map((item) => {
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
