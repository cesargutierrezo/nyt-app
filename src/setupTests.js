import "@testing-library/jest-dom/extend-expect";
import { server } from "./mocks/server.js";

window.scrollTo = () => {};
window.computeStyle = () => {};

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => {
  server.close();
  jest.restoreAllMocks();
});
