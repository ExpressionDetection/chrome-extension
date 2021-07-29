import { memo } from "react";
import Impression from "../Impression";
import Summary from "../Summary";

type TimelineItemType = "summary" | "impression";
interface Props {
  type: TimelineItemType;
  payload: any;
}

const TimelineItemComponent = {
  summary: Summary,
  impression: Impression,
};

const TimelineItem: React.FC<Props> = ({ type, payload, ...rest }) => {
  const Component = TimelineItemComponent[type];
  return <Component {...payload} {...rest} />;
};

export default memo(TimelineItem);
