import { within } from "@testing-library/react";
import { rest } from "msw";
import { renderWithProviders } from "../../test-utils";
import articlesearch from "../../mocks/responses/articlesearch.json";
import articlesearchEmpty from "../../mocks/responses/articlesearchEmpty.json";
import Home from "../Home";
import { server } from "../../mocks/server";

describe("Home", () => {
  it("renders search input", () => {
    const { getByPlaceholderText } = renderWithProviders(<Home />);
    expect(getByPlaceholderText(/Search for articles.../i)).toBeInTheDocument();
  });

  it("renders suggested heading", async () => {
    const { findByText } = renderWithProviders(<Home />);
    await findByText("Suggested articles");
  });

  it("renders article list", async () => {
    const { findAllByTestId } = renderWithProviders(<Home />);
    expect.assertions(articlesearch.response.docs.length);
    const elements = await findAllByTestId("article-result");

    elements.forEach((element, index) => {
      expect(
        within(element).getByText(
          articlesearch.response.docs[index].headline.main
        )
      ).toBeInTheDocument();
    });
  });

  it("handles no articles found", async () => {
    server.use(
      rest.get(
        "https://api.nytimes.com/svc/search/v2/articlesearch.json/",
        (req, res, ctx) => {
          return res(ctx.json(articlesearchEmpty));
        }
      )
    );
    const { findByText } = renderWithProviders(<Home />);
    await findByText(/No articles found/i);
  });

  it("handles api error", async () => {
    server.use(
      rest.get(
        "https://api.nytimes.com/svc/search/v2/articlesearch.json/",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    const { findByText } = renderWithProviders(<Home />);
    await findByText(/Something went wrong/i);
  });
});
