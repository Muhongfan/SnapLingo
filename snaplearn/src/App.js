import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Date from "./pages/Date/Date";
import Category from "./pages/Category/Category.js";
import Details from "./pages/Details/Details.js";

import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import RealtimeDetection from "./pages/RealtimeDetection/RealtimeDetection.js";
function App() {
  return (
    <BrowserRouter>
      <CssVarsProvider>
        <div className="header">
          <Header />
        </div>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <>
                <Main />
              </>
            }
          />
          <Route
            path="/Gallery"
            element={
              <>
                <Date />
              </>
            }
          />

          <Route
            path="/Capture"
            element={
              <>
                <Details />
              </>
            }
          />
          <Route
            path="/category"
            element={
              <>
                <Category category="Category A" />
              </>
            }
          />
          <Route
            path="/realtime-detection"
            element={
              <>
                <RealtimeDetection />
              </>
            }
          />
        </Routes>
        <Footer />
      </CssVarsProvider>
    </BrowserRouter>
  );
}

export default App;
