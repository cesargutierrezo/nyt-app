import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";
import { Main, Heading, Box, Paragraph, Anchor, Image, Text } from "grommet";
import { Previous as IconPrevious } from "grommet-icons";
import StickyHeader from "../components/StickyHeader";
import { nytApi, useGetArticlesQuery } from "../redux/api/nytApi";
import getQueryString from "../utils/getQueryString";
import { searchParamsProps } from "../utils/propTypes";

/**
 * Article route component
 * @returns {JSX.Element}
 */
const Article = ({
  match: {
    params: { id },
  },
  location: { state = {} },
}) => {
  const { searchParams: locationSearchParams } = state;

  // get data from previous search result or fetch new data by article id
  const stateQueryResult =
    nytApi.endpoints.getArticles.useQueryState(locationSearchParams);

  const fetchQueryResult = useGetArticlesQuery(
    { id },
    { skip: Boolean(stateQueryResult.data) }
  );

  const data = stateQueryResult.data || fetchQueryResult.data;
  const article = data?.articles.find((article) => article.id === id);

  if (article) {
    return (
      <>
        <StickyHeader>
          <Box
            pad="medium"
            width="large"
            margin="auto"
            justify="between"
            direction="row"
            align="center"
          >
            <Link
              to={{
                pathname: "/",
                search: getQueryString(locationSearchParams),
              }}
            >
              <Text color="brand" weight="bold">
                <IconPrevious color="brand" size="small" /> Back
              </Text>
            </Link>
            <Text weight="bold">{article.typeOfMaterial}</Text>
          </Box>
        </StickyHeader>
        <Main
          pad={{ top: "none", bottom: "large", horizontal: "medium" }}
          width="large"
          margin="auto"
          style={{ display: "block" }}
        >
          {article.image && (
            <Box>
              <Image fit="cover" src={article.image} />
            </Box>
          )}
          <Heading>{article.title}</Heading>
          <Heading level={3}>{article.snippet}</Heading>
          <Heading level={4}>{article.byline}</Heading>
          <Heading level={5}>{article.date}</Heading>
          <Paragraph>
            {article.leadParagraph} (...){" "}
            <Anchor href={article.web_url} target="_blank">
              Read full article
            </Anchor>
          </Paragraph>
        </Main>
      </>
    );
  }

  // redirect to Home page if no article is found
  if (!fetchQueryResult.isFetching && !article) return <Redirect to="/" />;

  return null;
};

Article.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      searchParams: searchParamsProps,
    }).isRequired,
  }).isRequired,
};

export default Article;
