import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarkContext } from "../contexts/BookmarkContextProvider";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error(
      "BookmarkIcon must be used within a BookmarkContextProvider"
    );
  }
  const { bookmarkedIds, handleToogleBookmark } = context;
  console.log(bookmarkedIds);
  return (
    <button
      onClick={(e) => {
        handleToogleBookmark(id);
        e.stopPropagation();
        e.preventDefault();
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
