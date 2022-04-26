import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter as Router } from "react-router-dom";
import SingleUser from "../../components/user/SingleUser";

describe("Should test Single user component.", () => {
  const queryClient = new QueryClient();
  it("Should render single user component.", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <SingleUser />
        </Router>
      </QueryClientProvider>
    );
  });

  it("Should have Edit profile button.", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <SingleUser />
        </Router>
      </QueryClientProvider>
    );

    expect(screen.getByRole("button", { name: /Edit profile/i })).toBeEnabled();
  });
});
