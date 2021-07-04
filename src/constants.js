export const API_KEY = "aACnEdGI8cU8CVZ610rXsmETOGASeHlY";
export const RESPONSE_FIELDS = [
  "headline",
  "byline",
  "lead_paragraph",
  "snippet",
  "pub_date",
  "_id",
  "web_url",
  "multimedia",
  "type_of_material",
];
export const ARTICLE_ID_PREFIX = "nyt://article/";

export const IMAGE_URL_BASE = "https://static01.nyt.com/";

export const ARTICLES_PER_PAGE = 10;
export const MAX_PAGE = 200; // api doesn't allow >200 page value
export const MAX_ARTICLE = ARTICLES_PER_PAGE * MAX_PAGE;

export const SEARCH_PARAMS_DELAY = 500;
