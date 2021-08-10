import { useState } from "react";
import useSWR from "swr";
import Layout from "../components/layout";

const fetcher = (url) =>
  fetch(`/api/link-preview?url=${encodeURIComponent(url)}`).then((res) => {
    if (res.status >= 400) {
      throw res.statusText;
    }
    return res.json();
  });

export default function About() {
  const [url, setUrl] = useState("");
  const { data, error } = useSWR(url, fetcher);

  return (
    <>
      <Layout>
        <h1 className="title">Test</h1>
        <input
          className="input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div>{!(error || data) && url && "⌛"}</div>
        <div>
          <strong>{error}</strong>
        </div>

        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Layout>
      <style jsx>{`
        .input {
          width: 400px;
          padding: 2px 4px;
        }
      `}</style>
    </>
  );
}
