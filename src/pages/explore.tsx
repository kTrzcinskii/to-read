import { Heading, VStack, chakra } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
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

const defBool = (x: any): boolean => {
  return typeof x === "string" && x !== "";
};

const ExplorePage: NextPage = () => {
  const router = useRouter();
  const { mainQuery, author, title, category, publisher, langCode, queryPage } =
    router.query;

  const defaultMainQuery = defBool(mainQuery) ? String(mainQuery) : "";
  const defaultAuthor = defBool(author) ? String(author) : undefined;
  const defaultTitle = defBool(title) ? String(title) : undefined;
  const defaultCategory = defBool(category) ? String(category) : undefined;
  const defaultPublisher = defBool(publisher) ? String(publisher) : undefined;
  const defaultLangCode = defBool(langCode) ? String(langCode) : undefined;

  const defaultPage =
    defBool(queryPage) && Number(queryPage) !== NaN ? Number(queryPage) : 0;

  const [searchTerm, setSearchTerm] = useState<ISearchTerm>({
    mainQuery: defaultMainQuery,
    author: defaultAuthor,
    title: defaultTitle,
    category: defaultCategory,
    langCode: defaultLangCode,
    publisher: defaultPublisher,
  });
  const [page, setPage] = useState(defaultPage);
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

  const updateRoute = (num: number = 0) => {
    let queryObj: any = {};
    for (const [key, value] of Object.entries(searchTerm)) {
      if (value !== "" && value !== undefined) {
        queryObj[key] = value;
      }
    }

    queryObj.queryPage = page + num;

    router.push({ pathname: "/explore", query: { ...queryObj } }, undefined, {
      shallow: true,
    });
  };

  const handleSearchClick = () => {
    if (searchTerm.mainQuery !== "") {
      setFinalData(undefined);
      setIsQueryEnabled(true);
      setPage(0);
      updateRoute();
    } else {
      setIsQueryEnabled(false);
      setIsMainQueryError(true);
    }
  };

  const handleSearchClickForPagination = (x: number) => {
    setFinalData(undefined);
    setIsQueryEnabled(true);
    updateRoute(x);
  };

  useEffect(() => {
    if (isQueryEnabled) {
      setIsQueryEnabled(false);
    }
  }, [isQueryEnabled]);

  useEffect(() => {
    const {
      mainQuery,
      author,
      title,
      category,
      publisher,
      langCode,
      queryPage,
    } = router.query;

    const defaultMainQuery = defBool(mainQuery) ? String(mainQuery) : "";
    const defaultAuthor = defBool(author) ? String(author) : undefined;
    const defaultTitle = defBool(title) ? String(title) : undefined;
    const defaultCategory = defBool(category) ? String(category) : undefined;
    const defaultPublisher = defBool(publisher) ? String(publisher) : undefined;
    const defaultLangCode = defBool(langCode) ? String(langCode) : undefined;

    const defaultPage =
      defBool(queryPage) && Number(queryPage) !== NaN ? Number(queryPage) : 0;

    setSearchTerm({
      mainQuery: defaultMainQuery,
      author: defaultAuthor,
      title: defaultTitle,
      category: defaultCategory,
      langCode: defaultLangCode,
      publisher: defaultPublisher,
    });
    setPage(defaultPage);

    if (defaultMainQuery !== "") {
      setFinalData(undefined);
      setIsQueryEnabled(true);
    }
  }, [router.query]);

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
