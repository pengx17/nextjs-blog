import Head from "next/head";
import { getMDXComponent } from "mdx-bundler/client";

import { SWRConfig } from "swr";
import { mdxComponents, createSectionWrapper } from "../../components";
import Date from "../../components/date";
import { Layout } from "../../components/layout";
import { getSortedPostsData, getPostData } from "../../lib/posts";
import React from "react";

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

const WrappedH1 = createSectionWrapper("h1");

export default function Post({ source, frontmatter }) {
  const Component = React.useMemo(() => getMDXComponent(source), [source]);
  return (
    <Layout>
      <Head>
        <meta property="og:title" content={frontmatter.title} />
        <title>{frontmatter.title}</title>
      </Head>
      <article className="w-full">
        <section></section>
        <WrappedH1 className="text-4xl my-4 font-serif font-bold leading-snug">
          {frontmatter.title}
        </WrappedH1>
        <div className="text-gray-600 mb-8 ml-0.5">
          <Date dateString={frontmatter.date} />
        </div>
        <SWRConfig value={{ provider: localStorageProvider }}>
          <Component {...source} components={mdxComponents} />
        </SWRConfig>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const items = await getSortedPostsData();
  return {
    paths: items.map((item) => ({
      params: { id: item.id, original: item.fileName },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getPostData(params.id);
  return {
    props: data,
  };
}
