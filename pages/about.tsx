import Layout from "../components/layout";
import LinkPreview from "../components/link-preview";

export default function About() {
  return (
    <Layout>
      <h1 className="title">About</h1>
      <h3>
        A{" "}
        <ruby>
          Senior
          <rt>中年</rt>
        </ruby>{" "}
        Frontend Developer
      </h3>
      <LinkPreview url="https://twitter.com/pengx17" />
    </Layout>
  );
}
