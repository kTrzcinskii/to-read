import { Heading, VStack, chakra, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Searchbar from "../components/explore-page/Searchbar";
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

  const { isLoading, isError, error } = trpc.useQuery(
    ["books.get-books", { ...searchTerm, startIndex: page * MAX_RESULTS }],
    {
      enabled: isQueryEnabled,
      onSuccess: (data) => setFinalData(data),
      onError: () => setFinalData(undefined),
    }
  );

  const handleSearchClick = () => {
    if (searchTerm.mainQuery !== "") {
      setIsQueryEnabled(true);
      setPage(0);
    } else {
      setIsQueryEnabled(false);
    }
  };

  useEffect(() => {
    if (isQueryEnabled) {
      setIsQueryEnabled(false);
    }
  }, [searchTerm, isQueryEnabled]);

  console.log(finalData);

  return (
    <VStack bgColor='gray.100' minH='100vh'>
      <Navbar />
      <VStack pt={20} spacing={10}>
        <Heading color='gray.700' fontSize={{ base: "2xl", md: "4xl" }}>
          Search for your <chakra.span color='blue.500'>favorites</chakra.span>{" "}
          books
        </Heading>
        <Searchbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearchClick={handleSearchClick}
        />
      </VStack>
      {isLoading && <LoadingAni />}
    </VStack>
  );
};

export default ExplorePage;
