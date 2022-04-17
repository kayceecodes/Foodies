import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
import theme from "../src/Theme/Theme";

// App.js
import { wrapper } from "../src/store/store";
import { FC, useState } from "react";
import Header from "@/components/ui/header/Header";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [pageValue, setPageValue] = useState<number>(0);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }   
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <Header pageValue={pageValue} setPageValue={setPageValue} />
      <Component {...pageProps} pageValue={pageValue} />
    </ThemeProvider>
  );
};

export default wrapper.withRedux(MyApp);
