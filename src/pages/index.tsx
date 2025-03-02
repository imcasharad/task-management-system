import { RouteObject } from "react-router-dom";
import {HomePage} from "./home/HomePage";
import GroupPage from "./group/GroupPage";
import SettingsPage from "./settings/SettingsPage";
import {ManageCategories} from "./settings/ManageCategories";
import {ManageCategoryTypes} from "./settings/ManageCategoryTypes";

// Define route objects with path and element
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/groups",
    element: <GroupPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/settings/manage-categories",
    element: <ManageCategories />,
  },
  {
    path: "/settings/manage-category-types",
    element: <ManageCategoryTypes />,
  },
];

// TODO: Add more routes as new pages are created (e.g., clients, plans)
// {
//   path: "/clients",
//   element: <ClientPage />,
// },
// {
//   path: "/plans",
//   element: <PlanPage />,
// },