import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Header from "./components/Header";
//import Footer from "./components/Footer";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute.js";
import Home from "./pages/home.js";
import Profile from "./pages/Profile.js";
import MovieDetail from "./pages/moiveDetail.js";
//import Authentication from "./pages/Authentication.js";
import DeleteAccount from "./pages/DeleteAccount.js";
import SearchPage from "./pages/searchPage.js";
import ShowtimesPage from "./pages/ShowtimesPage.js";
import SharedFavoritesPage from "./pages/SharedFavoritesPage.js";
import GroupListPage from "./pages/GroupListPage.js";
import GroupPage from "./pages/GroupPage.js";
import UserProvider from "./contexts/UserProvider.js";
import Authentication, { AuthenticationMode } from "./pages/Authentication.js";
import CreateGroupPage from "./pages/CreateGroupPage.js";
import PublicReviews from "./pages/PublicReviews";
import AllWatchlistPage from "./pages/AllWatchlistPage";
//import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetail />,
      },
      {
        path: "/signin",
        element: (
          <Authentication authenticationMode={AuthenticationMode.Login} />
        ),
      },
      {
        path: "/signup",
        element: (
          <Authentication authenticationMode={AuthenticationMode.Register} />
        ),
      },
      {
        path: "/deleteAccount",
        element: <DeleteAccount />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/showtimes",
        element: <ShowtimesPage />,
      },
      {
        path: "/public-reviews",
        element: <PublicReviews />,
      },
      {
        path: "/shared/:id",
        element: <SharedFavoritesPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/groups",
            element: <GroupListPage />,
          },
          {
            path: "/groups/:id",
            element: <GroupPage />,
          },
          {
            path: "/groups/new",
            element: <CreateGroupPage />,
          },
          {
            path: "/watchlist",
            element: <AllWatchlistPage />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// test_index.js_forshowtimes
/*
import React from "react";
import ReactDOM from "react-dom/client";
import ShowtimesPage from "./pages/ShowtimesPage";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ShowtimesPage />
  </React.StrictMode>
);
*/
