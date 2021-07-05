import { rest } from "msw";
import articlesearch from "./responses/articlesearch.json";

export const handlers = [
  rest.get(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json/",
    (req, res, ctx) => {
      return res(ctx.json(articlesearch));
    }
  ),
];
