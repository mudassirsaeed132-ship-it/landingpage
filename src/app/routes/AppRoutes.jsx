import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routeConfig";
import RouteFallback from "./RouteFallback";

export default function AppRoutes() {
  const element = useRoutes(routes);
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}