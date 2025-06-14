import { SortBy } from "../lib/types/types";

type PaginationButtonProps = {
  onClick: (newSortBy: SortBy) => void;
  sortBy: SortBy;
};

export default function Sorting({ onClick, sortBy }: PaginationButtonProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton
        sortBy="relevant"
        onClick={onClick}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        sortBy="recent"
        onClick={onClick}
        isActive={sortBy === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  );
}

interface SortingButtonProps extends PaginationButtonProps {
  children: React.ReactNode;
  isActive?: boolean;
}

function SortingButton({
  sortBy,
  onClick,
  children,
  isActive,
}: SortingButtonProps) {
  return (
    <button
      onClick={() => onClick(sortBy)}
      className={`sorting__button sorting__button--recent ${
        isActive && "sorting__button--active"
      }`}
    >
      {children}
    </button>
  );
}
