import { MDXRemote } from "next-mdx-remote";
import dynamic from "next/dynamic";
import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { SWRConfig } from "swr";
import React from "react";

const HNo = ({ tag, className, children, ...rest }) => {
  return React.createElement(
    tag,
    {
      className: "font-serif relative " + (className ?? ""),
      ...rest,
    },
    <>
      {children}
      <span
        style={{
          position: "absolute",
          right: "calc(100% + .2rem)",
          opacity: ".1",
          top: "calc(50% - .4em)",
          fontSize: "0.8em",
          lineHeight: 1,
        }}
        className="font-normal font-mono uppercase select-none"
      >
        {tag}
      </span>
    </>
  );
};

const components = {
  code: dynamic(() => import("../../components/code")),
  inlineCode: (props) => (
    <code
      className="py-0.5 px-1 bg-gray-100 rounded"
      style={{ fontSize: "0.8em" }}
    >
      {props.children}
    </code>
  ),
  a: dynamic(() => import("../../components/anchor")),
  LinkPreview: dynamic(() => import("../../components/link-preview")),
  Icon: dynamic(() => import("../../components/icon")),
  p: (props) => <p className="my-4" {...props} />,
  h1: (props) => (
    <HNo tag="h1" className="text-3xl font-bold my-8" {...props} />
  ),
  h2: (props) => (
    <HNo tag="h2" className="text-2xl font-bold my-8" {...props} />
  ),
  h3: (props) => <HNo tag="h3" className="text-xl font-bold my-6" {...props} />,
  h4: (props) => (
    <HNo tag="h4" className="text-xl font-semibold my-4" {...props} />
  ),
  h5: (props) => (
    <HNo tag="h5" className="text-xl font-medium my-4" {...props} />
  ),
  h6: (props) => (
    <HNo
      tag="h6"
      className="text-xl font-medium text-gray-800 my-4"
      {...props}
    />
  ),
  hr: (props) => (
    <hr className="h-1.5 border-gray-400 border-t border-b my-8" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-4 py-0.5 px-4 border-green-900 border-l-4"
      {...props}
    />
  ),
  ul: (props) => <ul className="list-disc pl-10 my-4" {...props} />,
};

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
      <article>
        <h1 className="text-4xl my-4 font-serif font-bold">
          {frontMatter.title}
        </h1>
        <div className="text-gray-600 mb-8">
          <Date dateString={frontMatter.date} />
        </div>
        <SWRConfig value={{ provider: localStorageProvider }}>
          <MDXRemote {...source} components={components} />
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
