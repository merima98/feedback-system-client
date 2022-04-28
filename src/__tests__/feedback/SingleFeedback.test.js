import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import SingleFeedback from "../../components/feedback/singleFeedback/SingleFeedback";

describe("Should test Single feedback component.", () => {
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

  it("Should render test Single feedback component.", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <SingleFeedback
            id={user.role}
            email={user.email}
            feedbacks={user.feedback}
            firstName={user.firstName}
            lastName={user.lastName}
            password={user.password}
            role={user.role}
          />
        </Router>
      </QueryClientProvider>
    );
  });
});
