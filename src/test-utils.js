import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Grommet } from "grommet";

import theme from "./theme";
import { getNewStore } from "./redux/store";

const renderWithProviders = (
  ui,
  {
    preloadedState,
    store = getNewStore(),
    history = createMemoryHistory("/"),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <Grommet theme={theme}>
          <Router history={history}>{children}</Router>
        </Grommet>
      </Provider>
    );
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export { renderWithProviders };
