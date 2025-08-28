import qs from "query-string";

interface IUrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export const formUrlQuery = ({ params, key, value }: IUrlQueryParams) => {
  const queryString = qs.parse(params);
  queryString[key] = value;

  return qs.stringify({
    url: window.location.pathname,
    query: queryString,
  });
};

export const removeKeysFromQuery = () => {};
