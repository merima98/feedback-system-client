import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import SingleLatestFeedback from "../../components/feedback/singleLatestFeedback/SingleLatestFeedback";

describe("Should test Single latest feedback component.", () => {
  const queryClient = new QueryClient();

  const user = {
    feedback: [
      {
        id: 1,
        userId: 1,
        reporterId: 1,
        updatedAt: "2022-04-25T08:17:24.099Z",
        createdAt: "2022-04-25T08:17:24.099Z",
        content: "This is my content",
      },
    ],
    id: 1,
    email: "test@test.com",
    firstName: "Test name",
    lastName: "Test last name",
    password: "Password",
    role: "User's role",
  };
  it("Should test single feedback comment details component.", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <SingleLatestFeedback user={user} />
        </Router>
      </QueryClientProvider>
    );
  });
});
