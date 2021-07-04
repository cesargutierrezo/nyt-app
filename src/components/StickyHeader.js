import { Box, Header, Heading, Text } from "grommet";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Renders sticky app header
 * @returns {JSX.Element}
 */
const StickyHeader = ({ children }) => {
  return (
    <Box style={{ position: "sticky", top: 0 }} background="white">
      <Header background="black" pad="medium" justify="start" align="center">
        <Box margin="auto" width="768px" direction="row" justify="center">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Heading
              size="1em"
              margin="0"
              color="white"
            >
              <Text>New York Times article search app</Text>
            </Heading>
          </Link>
        </Box>
      </Header>
      {children}
    </Box>
  );
};

StickyHeader.propTypes = {
  children: PropTypes.node,
};

StickyHeader.defaultProps = {
  children: null,
};

export default StickyHeader;
