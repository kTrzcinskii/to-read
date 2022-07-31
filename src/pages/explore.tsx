import { Heading, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import Searchbar from "../components/explore-page/Searchbar";
import Navbar from "../components/utils/Navbar";
import { ISearchTerm } from "../server/schema/book.schema";
import { trpc } from "../utils/trpc";

const ExplorePage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState<ISearchTerm>({ mainQuery: "" });
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  const { data, isLoading, isError, error } = trpc.useQuery(
    ["books.get-books", { ...searchTerm }],
    { enabled: isQueryEnabled }
  );

  const handleSearchClick = () => {
    if (searchTerm.mainQuery !== "") {
      setIsQueryEnabled(true);
    } else {
      setIsQueryEnabled(false);
    }
  };

  return (
    <VStack bgColor='gray.100' minH='100vh'>
      <Navbar />
      <VStack pt={20} spacing={10}>
        <Heading color='gray.700' fontSize={{ base: "2xl", md: "4xl" }}>
          Search for your favorites books
        </Heading>
        <Searchbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearchClick={handleSearchClick}
        />
      </VStack>
    </VStack>
  );
};

export default ExplorePage;
