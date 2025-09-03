import ROUTES from "@/constants/routes";

export const DEFAULT_EMPTY = {
  title: "No data found",
  message:
    "Looks like a database is taking a nap. Wake it up with some new entries",
  button: {
    text: "Add data",
    href: ROUTES.HOME,
  },
};
