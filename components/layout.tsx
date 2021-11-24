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
    <div className="flex flex-col min-h-screen items-center">
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
        <div className="w-full max-w-4xl p-12">
          <main>{children}</main>
          <div className="inline-block py-0.5 px-2 text-green-800 font-semibold text-2xl mt-12 -ml-1 underline bg-gray-100">
            <Link href="/">
              <a>
                <code>cd ~</code>
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
