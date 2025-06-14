import useActiveId from "../lib/hooks/useActiveId";
import { jobItem } from "../lib/types/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: jobItem[];
  isLoading: boolean;
};
export function JobList({ jobItems, isLoading }: JobListProps) {
  const activeId = useActiveId();
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={activeId === jobItem.id}
          />
        ))}
    </ul>
  );
}

export default JobList;
