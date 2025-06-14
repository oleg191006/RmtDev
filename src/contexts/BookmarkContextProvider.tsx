import { createContext } from "react";
import { useLocalStorage } from "../lib/hooks/useLocalStorage";

type BookmarksContext = {
  bookmarkedIds: number[];
  handleToogleBookmark: (id: number) => void;
};

export const BookmarkContext = createContext<BookmarksContext | null>(null);

type BookmarkContextTypeProps = {
  children: React.ReactNode;
};

const BookmarkContetxtProvider = ({ children }: BookmarkContextTypeProps) => {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarksIds",
    []
  );

  const handleToogleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedIds,
        handleToogleBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContetxtProvider;
