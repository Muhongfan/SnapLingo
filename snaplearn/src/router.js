import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.scss";
import { CssVarsProvider } from "@mui/joy/styles";
import React, { useEffect, useState } from "react";
import Login from "./pages/Login/Login";

function Routers() {


  return (
<main>
     <Switch>
    <CssVarsProvider>
        {/* Conditionally render the Header component */}
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
    </CssVarsProvider>
    </Switch>
  </main>
  );
}

export default Routes;
