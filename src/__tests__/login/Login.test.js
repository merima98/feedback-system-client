import { render, screen } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "react-query";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";

import Login from "../../components/login/Login";

describe("Should test Login component.", () => {
  const queryClient = new QueryClient();

  it("Should render Login component.", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Login />
        </Router>
      </QueryClientProvider>
    );
  });

  it("Should display correct error messages.", async () => {
    const { getByTestId, findByText } = render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Login />
        </Router>
      </QueryClientProvider>
    );
    getByTestId("login-submit-button");
    () => {
      userEvent.click(getByTestId("login-submit-button"));
    };
    findByText("Password is required field!");
    findByText("Email is required field!");
  });

  it("Should display error messages if user does not enter correct inputs.", async () => {
    const { getByTestId, findByText } = render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Login />
        </Router>
      </QueryClientProvider>
    );
    () => {
      userEvent.type(screen.getByPlaceholderText(/Email/i), "admin@test.com");
      userEvent.type(screen.getByPlaceholderText(/Password/i), "a");
    };
    () => {
      userEvent.click(getByTestId("login-submit-button"));
    };
    findByText("Password must have at least four characters!");
  });
});
