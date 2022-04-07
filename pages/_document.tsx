import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-CN">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Noto+Serif+SC:wght@600;700&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,400;1,700&family=Source+Serif+Pro:ital,wght@0,400;0,600;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
