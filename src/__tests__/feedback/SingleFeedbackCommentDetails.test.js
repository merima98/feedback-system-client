import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import SingleFeedbackCommentDetails from "../../components/feedback/singleFeedback/SingleFeedbackCommentDetails";

describe("Should test Single Feedback comment details.", () => {
  const queryClient = new QueryClient();

  it("Should test single feedback comment details component.", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <SingleFeedbackCommentDetails />
        </Router>
      </QueryClientProvider>
    );
  });
});
