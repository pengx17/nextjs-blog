import { getPostData } from "../../../../lib/bundle-post";
import { getSortedPostsData } from "../../../../lib/posts";
import { Renderer } from "./renderer";

export default async function Post({ params }) {
  const { source, frontmatter } = await getPostData(params.id);
  return (
    <>
      <article className="w-full">
        <>
          <section></section>
          <Renderer source={source} frontmatter={frontmatter} />
        </>
      </article>
    </>
  );
}

export async function generateStaticParams() {
  const items = await getSortedPostsData();
  return items.map((item) => ({
    id: item.id,
  }));
}
