import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter as Router } from "react-router-dom";

import FeedbackDetails from "../../components/feedback/feedbackDetails/FeedbackDetails";

describe("Should test Feedback details component.", () => {
  const queryClient = new QueryClient();
  it("Should render FeedbackDetials component.", () => {
    const component = render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <FeedbackDetails />
        </Router>
      </QueryClientProvider>
    );

    expect(screen.getByTestId("test-new-feedback-form")).toBeInTheDocument();
  });
});
