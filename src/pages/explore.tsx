import { Heading, VStack, chakra, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import BooksContainer from "../components/explore-page/BooksContainer";
import NoBooksFound from "../components/explore-page/NoBooksFound";
import Searchbar from "../components/explore-page/Searchbar";
import ErrorMessage from "../components/utils/ErrorMessage";
import LoadingAni from "../components/utils/LoadingAni";
import Navbar from "../components/utils/Navbar";
import { IReturnManyBooks, ISearchTerm } from "../server/schema/book.schema";
import { MAX_RESULTS } from "../utils/constants";
import { trpc } from "../utils/trpc";

const ExplorePage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState<ISearchTerm>({ mainQuery: "" });
  const [page, setPage] = useState(0);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [finalData, setFinalData] = useState<IReturnManyBooks | undefined>(
    undefined
  );
  const [isMainQueryError, setIsMainQueryError] = useState(false);

  const { isLoading, isError } = trpc.useQuery(
    ["books.get-books", { ...searchTerm, startIndex: page * MAX_RESULTS }],
    {
      enabled: isQueryEnabled,
      onSuccess: (data) => setFinalData(data),
      onError: () => setFinalData(undefined),
    }
  );

  const handleSearchClick = () => {
    if (searchTerm.mainQuery !== "") {
      setFinalData(undefined);
      setIsQueryEnabled(true);
      setPage(0);
    } else {
      setIsQueryEnabled(false);
      setIsMainQueryError(true);
    }
  };

  const handleSearchClickForPagination = () => {
    setFinalData(undefined);
    setIsQueryEnabled(true);
  };

  useEffect(() => {
    if (isQueryEnabled) {
      setIsQueryEnabled(false);
    }
  }, [isQueryEnabled]);

  const { status: sessionStatus } = useSession();

  if (sessionStatus === "loading") {
    return (
      <VStack bgColor='gray.100' minH='100vh' justifyContent='center'>
        <LoadingAni />
      </VStack>
    );
  }

  if (sessionStatus === "unauthenticated") {
    return (
      <VStack bgColor='gray.100' minH='100vh' justifyContent='center'>
        <ErrorMessage customMessage='This page is available only for authenticated users' />
      </VStack>
    );
  }

  return (
    <VStack bgColor='gray.100' minH='100vh'>
      <Navbar />
      <VStack pt={20} spacing={10}>
        <Heading color='gray.700' fontSize={{ base: "2xl", md: "4xl" }}>
          Search for your <chakra.span color='blue.500'>favorite</chakra.span>{" "}
          books
        </Heading>
        <Searchbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearchClick={handleSearchClick}
          isError={isMainQueryError}
          setIsError={setIsMainQueryError}
        />
      </VStack>
      {isLoading && <LoadingAni />}
      {isError && (
        <ErrorMessage customMessage="We couldn't find your books. Please try again later." />
      )}
      {finalData && finalData.totalItems === 0 && (
        <NoBooksFound
          setFinalData={setFinalData}
          setSearchTerm={setSearchTerm}
        />
      )}
      {finalData && finalData.totalItems > 0 && (
        <BooksContainer
          handleSearchClick={handleSearchClickForPagination}
          data={finalData}
          page={page}
          setPage={setPage}
        />
      )}
    </VStack>
  );
};

export default ExplorePage;
