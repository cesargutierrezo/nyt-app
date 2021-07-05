import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import getQueryString from "../utils/getQueryString";
import debounce from "lodash/debounce";
import { SEARCH_PARAMS_DELAY } from "../constants";

/**
 * Returns api search parameters and functions to update them.
 * Provides two sets of params:
 *
 * `locationParams`: values parsed directly from the URL search params.
 *
 * `searchParams`: a copy of `locationParams` that is updated through a debounced function.
 * This is useful when using RTK Query hooks to reduce the amount of api calls
 * @typedef {{q?: string, page?: string}} IParams
 * @returns {{setQ: (event: InputEvent) => void, setPage: (page: number | string) => void, locationParams: IParams, searchParams: IParams}}
 */
export const useUrlSearch = () => {
  const {
    replace,
    location: { search },
  } = useHistory();

  const locationParams = Object.fromEntries(new URLSearchParams(search));

  // debounced copy of location params
  const [searchParams, setSearchParams] = useState(locationParams);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearchParams = useCallback(
    debounce(setSearchParams, SEARCH_PARAMS_DELAY),
    []
  );

  useEffect(() => {
    if (searchParams?.q !== locationParams?.q) {
      debouncedSetSearchParams(locationParams);
    } else if (searchParams?.page !== locationParams?.page) {
      setSearchParams(locationParams);
    }
  }, [locationParams, searchParams, debouncedSetSearchParams, setSearchParams]);

  const setQ = (event) => {
    const searchStr = event.target.value || "";
    replace({
      search: searchStr
        ? `?${getQueryString({ ...(searchStr && { q: searchStr }), page: 1 })}`
        : "",
    });
  };

  const setPage = (page) => {
    if (!page) return;
    replace({
      search: `?${getQueryString({
        ...(locationParams.q && { q: locationParams.q }),
        page,
      })}`,
    });
  };

  return { setQ, setPage, locationParams, searchParams };
};
