import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../src/Theme/Theme";

// App.js
import { wrapper } from "../src/store/store";
import { FC, useState } from "react";
import Header from "@/components/ui/header/Header";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../utility/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

function MyApp(props: any) {
  const [pageValue, setPageValue] = useState<number>(0);
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  // React.useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector("#jss-server-side");
  //   if (jssStyles) {
  //     jssStyles.parentElement!.removeChild(jssStyles);
  //   }
  // }, []);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header pageValue={pageValue} setPageValue={setPageValue} />
        <Component {...pageProps} pageValue={pageValue} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default wrapper.withRedux(MyApp);
