import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { format } from "fecha";
import {
  API_KEY,
  ARTICLE_ID_PREFIX,
  IMAGE_URL_BASE,
  RESPONSE_FIELDS,
} from "../../constants";

export const nytApi = createApi({
  reducerPath: "nytApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.nytimes.com/svc/search/v2/",
  }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ q, page = 1, id }) => {
        return {
          url: "articlesearch.json/",
          params: {
            ...(q && { q }),
            page: parseInt(page) - 1,
            "api-key": API_KEY,
            fl: RESPONSE_FIELDS.join(","),
            fq: `document_type:("article")${
              id ? ` AND _id:("${ARTICLE_ID_PREFIX}${id}")` : ""
            }`,
            sort: "newest",
          },
        };
      },
      transformResponse: ({ response: { docs, meta } }) => {
        const articles = docs.map((article) => ({
          title: article.headline.main,
          byline: article.byline.original,
          leadParagraph: article.lead_paragraph,
          snippet: article.snippet,
          date: format(new Date(article.pub_date), "mediumDate"),
          id: article["_id"].replace(ARTICLE_ID_PREFIX, ""),
          web_url: article.web_url,
          image: article.multimedia[0]?.url
            ? `${IMAGE_URL_BASE}${article.multimedia[0].url}`
            : null,
          typeOfMaterial: article?.type_of_material,
        }));

        return { articles, meta };
      },
    }),
  }),
});

export const { useGetArticlesQuery } = nytApi;
