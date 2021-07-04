import { useEffect } from "react";
import { Main, Pagination, TextInput, Spinner, Card, Text } from "grommet";
import { Close as IconClose } from "grommet-icons";
import StickyHeader from "../components/StickyHeader";
import ArticleList from "../components/ArticleList";
import { useGetArticlesQuery } from "../redux/api/nytApi";
import { useUrlSearch } from "../hooks/useUrlSearch";
import { ARTICLES_PER_PAGE, MAX_ARTICLE } from "../constants";

/**
 * Home route component
 * @returns {JSX.Element}
 */
const Home = () => {
  const { setQ, setPage, locationParams, searchParams } = useUrlSearch();

  useEffect(() => {
    // scroll to top on page change
    window.scrollTo({ top: 0 });
  }, [searchParams.page]);

  const { data, isError, isFetching } = useGetArticlesQuery({
    ...searchParams,
  });

  // number of articles available (actual results or api limit based on max available pages)
  const numberItems = data?.meta.hits && Math.min(data.meta.hits, MAX_ARTICLE);

  return (
    <>
      <StickyHeader>
        <TextInput
          placeholder="Search for articles..."
          value={locationParams.q || ""}
          onChange={setQ}
          icon={
            isFetching ? (
              <Spinner size="0.4em" />
            ) : (
              <IconClose
                onClick={setQ}
                role="button"
                cursor="pointer"
                pointerEvents="auto"
              />
            )
          }
          reverse
          size="xlarge"
          name="search-query"
          textAlign="center"
        />
      </StickyHeader>
      <Main
        width="large"
        margin="auto"
        pad={{ top: "medium", bottom: "large", horizontal: "medium" }}
        direction="column"
      >
        {numberItems > 0 && !isFetching && (
          <>
            <ArticleList articles={data.articles} searchParams={searchParams} />
            <Pagination
              numberItems={numberItems}
              page={parseInt(searchParams.page)}
              step={ARTICLES_PER_PAGE}
              onChange={({ page }) => setPage(page)}
              alignSelf="center"
            />
          </>
        )}

        {/* empty article array message */}
        {numberItems === 0 && !isFetching && (
          <Card pad="medium" background="light-2">
            <Text>No articles found 🤔... Try something else!</Text>
          </Card>
        )}

        {/* api error message */}
        {isError && (
          <Card pad="medium" background="error">
            <Text>Something went wrong 😞</Text>
          </Card>
        )}
      </Main>
    </>
  );
};

export default Home;