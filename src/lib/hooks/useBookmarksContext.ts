import { useContext } from "react";
import { BookmarksContext } from "../../contexts/BookmarkContextProvider";

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "useBookmarksContext must be used within a BookmarkContextProvider"
    );
  }
  return context;
}
