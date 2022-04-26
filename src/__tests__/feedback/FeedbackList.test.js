import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import FeedbackList from "../../components/feedback/feedbackList/FeedbackList";

describe("Should test Feedback list component.", () => {
  const queryClient = new QueryClient();

  it("Should render Feedback list component.", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <FeedbackList />
        </Router>
      </QueryClientProvider>
    );
  });
});
