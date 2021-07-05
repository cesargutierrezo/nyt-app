import { Box, Header, Heading, Text, Anchor } from "grommet";
import {ShareRounded as IconShare} from 'grommet-icons'
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Renders sticky app header
 * @returns {JSX.Element}
 */
const StickyHeader = ({ children }) => {
  return (
    <Box style={{ position: "sticky", top: 0 }} background="white">
      <Header background="black" pad="medium" justify="start">
        <Box margin="auto" width="768px" direction="row" justify="between" align="center">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Heading size="1em" margin="0" color="white">
              <Text>New York Times search app</Text>
            </Heading>
          </Link>
          <Anchor size="small" target="_blank" href="https://github.com/cesargutierrezo/nyt-app">
            GitHub <IconShare size="small" color="accent-1" />
          </Anchor>
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
