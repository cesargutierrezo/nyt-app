import { Box, Spinner } from "grommet";

/**
 * Renders full screen spinner
 * @returns {JSX.Element}
 */
const Loading = () => (
  <Box
    width="large"
    height="large"
    justify="center"
    align="center"
    margin="auto"
  >
    <Spinner size="xlarge" />
  </Box>
);

export default Loading;
