import { lazy } from "react";
import PublicShell from "../layout/PublicShell/PublicShell";
import RouteFallback from "./RouteFallback";

const LandingPage = lazy(() => import("../../features/landing/pages/LandingPage"));
const SearchPage = lazy(() => import("../../features/search/pages/SearchPage"));
const ListingDetailPage = lazy(() => import("../../features/listing/pages/ListingDetailPage"));

export const routes = [
  {
    element: <PublicShell />,
    errorElement: <RouteFallback />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "listing/:id", element: <ListingDetailPage /> },
    ],
  },
];