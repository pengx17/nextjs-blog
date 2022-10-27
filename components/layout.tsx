import Head from "next/head";
import Link from "next/link";

export const siteTitle = "pengx17";

const BackHome = () => {
  return (
    <div className="inline-block py-0.5 px-2 text-green-800 font-semibold text-2xl mt-12 underline bg-gray-100">
      <Link href="/" className="group relative">
        <code className="group-hover:opacity-0 transition-all">cd ~</code>
        <code className="group-hover:opacity-100 opacity-0 absolute left-0 transition-all">
          ← 🏠
        </code>
      </Link>
    </div>
  );
};

export function Layout({
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
        <main className="max-w-6xl w-full lg:p-12 p-6">
          {children}
          <BackHome />
        </main>
      )}
    </div>
  );
}
