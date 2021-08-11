/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Layout from "../components/layout";
import LinkPreview from "../components/link-preview";

export default function About() {
  const [url, setUrl] = useState("");

  return (
    <Layout>
      <h1 className="title">Test</h1>
      <input
        className="input"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <LinkPreview url={url} />
    </Layout>
  );
}
