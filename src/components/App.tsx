import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import Sorting from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import useJobItems from "../lib/hooks/useJobItems";
import useDebounce from "../lib/hooks/useDebounce";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants/constants";
import { SortBy } from "../lib/types/types";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 1000);
  const [jobItems, isLoading] = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  const totalNumberofResults = jobItems?.length;
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = currentPage * RESULTS_PER_PAGE;
  const maxPage = Math.ceil(totalNumberofResults / RESULTS_PER_PAGE) || 1;
  const jobItemsSorted = [...jobItems]?.sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return a.daysAgo - b.daysAgo;
    }
  });
  const jobItemsSliced = jobItemsSorted?.slice(startIndex, endIndex);

  const handleChangePage = (direction: string) => {
    if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleChangeSortBy = (newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  };

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchText={searchText} onSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberofResults={totalNumberofResults} />
            <Sorting onClick={handleChangeSortBy} sortBy={sortBy} />
          </SidebarTop>

          <JobList isLoading={isLoading} jobItems={jobItemsSliced} />
          <PaginationControls
            currentPage={currentPage}
            onClick={handleChangePage}
            maxPage={maxPage}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
