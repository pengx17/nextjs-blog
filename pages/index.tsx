import Head from "next/head";
import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";

export default function Home({ allPostsData }) {
  return (
    <>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className="home-container">
          <div className="left">
            <h1>Index</h1>
            <h3 className="light-text"> pengx17</h3>
          </div>
          <ul className="right list">
            {allPostsData.map(({ id, date, title }) => (
              <li className="list-item" key={id}>
                <Link href={`/posts/${id}`}>
                  <a className="blog-item-title">{title}</a>
                </Link>
                <br />
                <small className="light-text">
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
      <style jsx>{`
        .home-container {
          min-height: 100vh;
          width: 100vw;
          justify-self: center;
          display: flex;
          align-items: center;
          padding: 3rem;
        }

        .left {
          display: inline;
          flex: 1;
        }

        .left > * {
          display: inline;
          vertical-align: baseline;
          margin: 0;
        }

        .left > h1 {
          font-weight: 600;
          font-size: 3rem;
        }

        .right {
          flex: 1;
          display: flex;
          flex-flow: column;
        }

        .blog-item-title {
          font-size: 1.2rem;
          font-family: var(--font-serif);
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
