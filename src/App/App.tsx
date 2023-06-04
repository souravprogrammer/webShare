import { useMemo } from "react";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import NavigationBar from "../Components/common/NaavigationBar";
import Home from "../Components/common/Home";

import { getDesignTheme } from "./Theme/Theme";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

import ShareLayout from "../Components/Layouts/ShareLayout";

function App() {
  const theme = useMemo(
    () => responsiveFontSizes(createTheme(getDesignTheme())),
    []
  );
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div>
            <NavigationBar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/*" element={<ShareLayout />} />
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
