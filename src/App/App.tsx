import { useMemo } from "react";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import NavigationBar from "../Components/common/NaavigationBar";

import { getDesignTheme } from "./Theme/Theme";

function App() {
  const theme = useMemo(
    () => responsiveFontSizes(createTheme(getDesignTheme("light"))),
    []
  );
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <NavigationBar />
          <div>hello</div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
