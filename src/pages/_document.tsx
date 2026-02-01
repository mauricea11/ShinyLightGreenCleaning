import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link
          rel="icon"
          href="/photos/Marie-Jeanne-Bacchus-10.png"
          type="image/png"
        />
        {/* Optional: for Apple/Android devices */}
        <link
          rel="apple-touch-icon"
          href="/photos/Marie-Jeanne-Bacchus-10.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
