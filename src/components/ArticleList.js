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
    <Box
      as="ul"
      pad="none"
      margin={{ top: "medium", bottom: "large" }}
      direction="column"
      gap="medium"
    >
      {!searchParams.q && (
        <Heading margin="none" level={3}>
          Suggested articles
        </Heading>
      )}
      {articles.map((article) => (
        <Link
          to={{ pathname: `/article/${article.id}`, state: { searchParams } }}
          key={article.id}
        >
          <Card pad="medium" background="light-2" as="li">
            <Text weight="bold" color="brand">
              {article.title}
            </Text>
            <Text size="small">{article.date}</Text>
          </Card>
        </Link>
      ))}
    </Box>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(articleProps.isRequired).isRequired,
  searchParams: searchParamsProps.isRequired,
};

export default ArticleList;
