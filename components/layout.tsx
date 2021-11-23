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
          <meta name="description" content="A personal blog by pengx17" />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta
            name="twitter:card"
            content="https://avatars.githubusercontent.com/u/584378"
          />
        </Head>
        {home && children}
        {!home && (
          <div className="container">
            <main>{children}</main>
            <div className="backToHome">
              <Link href="/">
                <a>
                  <code>cd ~</code>
                </a>
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
          padding: 3rem;
        }

        .backToHome {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 3rem 0 0 -1.5rem;
        }
      `}</style>
    </>
  );
}
