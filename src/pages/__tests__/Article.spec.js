import { renderWithProviders } from "../../test-utils";
import Article from "../Article";
import articlesearch from "../../mocks/responses/articlesearch.json";
import { ARTICLE_ID_PREFIX } from "../../constants";

describe("Article", () => {
  it("renders article components", async () => {
    const testArticle = articlesearch.response.docs[0];
    const props = {
      match: { params: { id: testArticle._id.replace(ARTICLE_ID_PREFIX, "") } },
      location: { state: {} },
    };
    const { findByText } = renderWithProviders(<Article {...props} />);
    await findByText(testArticle.headline.main);
    await findByText(testArticle.type_of_material);
    await findByText(testArticle.snippet);
    await findByText(testArticle.byline.original);
  });
});
