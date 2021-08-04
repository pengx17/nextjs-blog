import Layout from "../components/layout";

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
      <h4>
        twitter:{" "}
        <a href="https://twitter.com/pengx17" target="_blank">
          @pengx17
        </a>
      </h4>
    </Layout>
  );
}
