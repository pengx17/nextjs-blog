import Head from "next/head";
import Link from "next/link";
import Date from "../components/date";
import { Layout, siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="w-screen h-screen flex sm:items-center justify-self-center flex-col sm:flex-row">
        <div className="sm:flex-1 pl-12 py-2 inline font-serif font-semibold">
          <span className="text-5xl">Index</span>
          <span className="text-gray-600 text-lg ml-1">
            <Link href="/about">pengx17</Link>
          </span>
        </div>
        <div className="sm:flex-1 max-h-full overflow-auto p-12">
          {allPostsData
            .filter((d) => !d.draft)
            .map(({ id, date, title }) => (
              <div className="mb-6" key={id}>
                <Link href={`/posts/${id}`}>
                  <a className="text-xl font-semibold font-serif">{title}</a>
                </Link>
                <br />
                <span className="text-xs text-gray-600">
                  <Date dateString={date} />
                </span>
              </div>
            ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
