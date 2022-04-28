import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import LatestFeedbackList from "../../components/feedback/latestFeedbackList/LatestFeedbackList";

describe("Should test Latest feedback list component.", () => {
  const queryClient = new QueryClient();

  it("Should render Latest feedback list component.", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <LatestFeedbackList />
        </Router>
      </QueryClientProvider>
    );
  });
});
