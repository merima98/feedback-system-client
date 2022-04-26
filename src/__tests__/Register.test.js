import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";

import Register from "../components/register/Register";

describe("Should test Register component.", () => {
  const queryClient = new QueryClient();

  it("Should render Register component.", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Register />
        </Router>
      </QueryClientProvider>
    );
  });

  it("Should display correct error messages.", async () => {
    const { getByTestId, findByText } = render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Register />
        </Router>
      </QueryClientProvider>
    );

    getByTestId("test-register-button");

    () => {
      userEvent.click(getByTestId("test-register-button"));
    };
    findByText("Password is required field!");
    findByText("First name is required field!");
    findByText("Last name is required field!");
    findByText("Email is required field!");
    findByText("Role is required field!");
  });

  it("Should display error messages if user does not enter correct inputs.", () => {
    const { getByTestId, findByText } = render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Register />
        </Router>
      </QueryClientProvider>
    );

    () => {
      userEvent.type(screen.getByPlaceholderText(/Email/i), "admin@test.com");
      userEvent.type(screen.getByPlaceholderText(/Password/i), "a");
      userEvent.type(screen.getByPlaceholderText(/First name/i), "a");
      userEvent.type(screen.getByPlaceholderText(/Last name/i), "a");
      userEvent.type(screen.getByPlaceholderText(/Your role/i), "a");
      userEvent.click(getByTestId("test-register-button"));
    };

    findByText("First name must have at least two characters!");
    findByText("Last name must have at least two characters!");
    findByText("Password must have at least four characters!");
    findByText("Role must have at least four characters!");
  });
});
