import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import { SWRConfig } from "swr";
import { mdxComponents } from "../../components";
import Date from "../../components/date";
import { Layout } from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

function localStorageProvider() {
  if (typeof window === "undefined") {
    return new Map();
  }
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(JSON.parse(localStorage.getItem("swr_cache") || "[]"));

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("swr_cache", appCache);
  });

  // We still use the map for write & read for performance.
  return map;
}

export default function Post({ source, content, frontMatter }) {
  return (
    <Layout>
      <Head>
        <meta property="og:title" content={frontMatter.title} />
        <meta
          property="og:description"
          content={content.substr(0, 140).replace(/\n/g, " ")}
        />
        <title>{frontMatter.title}</title>
      </Head>
      <article className="w-full">
        <h1 className="text-4xl my-4 font-serif font-bold">
          {frontMatter.title}
        </h1>
        <div className="text-gray-600 mb-8">
          <Date dateString={frontMatter.date} />
        </div>
        <SWRConfig value={{ provider: localStorageProvider }}>
          <MDXRemote {...source} components={mdxComponents} />
        </SWRConfig>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getPostData(params.id);
  return data;
}
