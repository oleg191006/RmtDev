import { useContext } from "react";
import { BookmarkContext } from "../../contexts/BookmarkContextProvider";

export function useBookmarksContext() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error(
      "useBookmarksContext must be used within a BookmarkContextProvider"
    );
  }
  return context;
}
