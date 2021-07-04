/**
 * Accepts a params object and transforms it into a url search params string
 * @param {any} params
 * @returns
 */
const getQueryString = (params = {}) => {
  return Object.keys(params)
    .map((k) => {
      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    })
    .join("&");
};

export default getQueryString;
