import { Feedback } from "../../../model/feedback";

const SingleFeedback = (props: Feedback) => {
  const { userId, reporterId, content, createdAt, updatedAt, id } = props;
  return <div>{content}</div>;
};

export default SingleFeedback;
