import { renderWithProviders } from "../../test-utils";
import Article from "../Article";
import articlesearch from "../../mocks/responses/articlesearch.json";
import { ARTICLE_ID_PREFIX, IMAGE_URL_BASE } from "../../constants";

describe("Article", () => {
  const testArticle = articlesearch.response.docs[0];
  const props = {
    match: { params: { id: testArticle._id.replace(ARTICLE_ID_PREFIX, "") } },
    location: { state: {} },
  };

  it("renders article components", async () => {
    const { findByText, findByRole } = renderWithProviders(
      <Article {...props} />
    );
    await findByText(testArticle.headline.main);
    await findByText(testArticle.type_of_material);
    await findByText(testArticle.snippet);
    await findByText(testArticle.byline.original);
    await findByRole("img", {
      src: `${IMAGE_URL_BASE}${testArticle.multimedia[0].src}`,
    });
  });

  it("scroll to top on mount", () => {
    window.scrollTo = jest.fn();
    renderWithProviders(<Article {...props} />);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 });
  });
});
