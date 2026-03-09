export const ROUTES = {
  home: "/",
  search: "/search",
  listing: (id = ":id") => `/listing/${id}`,
};