import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home.js";
import Profile from "./pages/Profile.js";
import MovieDetail from "./pages/moiveDetail.js";
import Authentication from "./pages/Authentication.js";
import RemoveAccount from "./pages/RemoveAccount.js";
import SearchPage from "./pages/searchPage.js";
import ShowtimesPage from "./pages/ShowtimesPage.js";
import PublicReviews from "./pages/PublicReviews";
import ForgotPassword from "./pages/ForgotPassword.js"
import ResetPassword from "./pages/ResetPassword.js"
import { UserProvider } from './context/UserProvider';
import SignIn from "./pages/signIn.js";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/removeaccount" element={<RemoveAccount />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/showtimes" element={<ShowtimesPage />} />
          <Route path="/public-reviews" element={<PublicReviews />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} /> 
          <Route path="/Signin" element={<SignIn />} />

      
        </Routes>
        

        {/* Conditionally render Footer only on the Home page */}
        {window.location.pathname === "/" && <Footer />}
      </Router>
      </UserProvider>
    </div>
  );
};

export default App;
