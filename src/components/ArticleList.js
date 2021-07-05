import { Box, Card, Text, Heading } from "grommet";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { articleProps, searchParamsProps } from "../utils/propTypes";

/**
 * Renders a list article summary cards
 * @returns {JSX.Element}
 */
const ArticleList = ({ articles, searchParams }) => {
  return (
    <Box margin={{ top: "small", bottom: "medium" }}>
      {!searchParams.q && (
        <Heading
          margin={{ bottom: "small", top: "none" }}
          level={2}
          size="small"
        >
          Suggested articles
        </Heading>
      )}
      <Box as="ul" pad="none" margin={{ bottom: "small" }} direction="column">
        {articles.map((article) => (
          <Box as="li" margin={{ vertical: "small" }} key={article.id} data-testid="article-result">
            <Link
              to={{
                pathname: `/article/${article.id}`,
                state: { searchParams },
              }}
            >
              <Card pad="medium" background="light-2">
                <Text weight="bold" color="brand">
                  {article.title}
                </Text>
                <Text size="small">{article.date}</Text>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(articleProps.isRequired).isRequired,
  searchParams: searchParamsProps.isRequired,
};

export default ArticleList;
