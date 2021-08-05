import Head from "next/head";
import Link from "next/link";

export const siteTitle = "pengx17";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <>
      <div className="root">
        <Head>
          <link rel="icon" href="/favicon.jpeg" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
          <link href="/fonts/fonts.css" rel="stylesheet" />
        </Head>
        {home && children}
        {!home && (
          <div className="container">
            <main>{children}</main>
            <div className="backToHome">
              <Link href="/">
                <a>← Back to home</a>
              </Link>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          align-items: center;
        }

        .container {
          width: 100%;
          max-width: 60rem;
          padding: 3rem 1rem 2rem;
        }

        .backToHome {
          margin: 3rem 0 0;
        }
      `}</style>
    </>
  );
}
