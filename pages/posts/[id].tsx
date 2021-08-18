import { MDXRemote } from "next-mdx-remote";
import dynamic from "next/dynamic";
import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

const components = {
  code: dynamic(() => import("../../components/code")),
  a: dynamic(() => import("../../components/anchor")),
  LinkPreview: dynamic(() => import("../../components/link-preview")),
};

export default function Post({ source, frontMatter }) {
  return (
    <>
      <Layout>
        <Head>
          <title>{frontMatter.title}</title>
        </Head>
        <article>
          <h1 className="title">{frontMatter.title}</h1>
          <div className="light-text">
            <Date dateString={frontMatter.date} />
          </div>
          <MDXRemote {...source} components={components} />
        </article>
      </Layout>
      <style jsx>{`
        .title {
          font-size: 2.5rem;
          margin: 1rem 0;
        }
      `}</style>
    </>
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
