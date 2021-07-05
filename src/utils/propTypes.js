import PropTypes from "prop-types";

export const searchParamsProps = PropTypes.shape({
  q: PropTypes.string,
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
});

export const articleProps = PropTypes.shape({
  title: PropTypes.string.isRequired,
  byline: PropTypes.string,
  leadParagraph: PropTypes.string,
  snippet: PropTypes.string,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  web_url: PropTypes.string.isRequired,
  image: PropTypes.string,
  typeOfMaterial: PropTypes.string,
});
