import { useEffect } from "react";
import "../styles/ColorElement.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Perform localStorage action
    if (!localStorage.getItem("myPokemon")) {
      localStorage.setItem("myPokemon", null);
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
