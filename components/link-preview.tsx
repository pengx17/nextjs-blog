/* eslint-disable @next/next/no-img-element */
import useSWR from "swr";

const fetcher = (url) =>
  fetch(`/api/link-preview?url=${encodeURIComponent(url)}`).then((res) => {
    if (res.status >= 400) {
      throw res.statusText;
    }
    return res.json();
  });

const example = {
  url: "https://discord.com/channels/@me",
  title: "Discord - A New Way to Chat with Friends & Communities",
  siteName: "Discord",
  description:
    "Discord is the easiest way to communicate over voice, video, and text.  Chat, hang out, and stay close with your friends and communities.",
  mediaType: "website",
  contentType: "text/html",
  images: ["https://discord.com/assets/ee7c382d9257652a88c8f7b7f22a994d.png"],
  videos: [],
  favicons: ["https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico"],
};

// Credits: taken directly from innos.io
const PreviewCard = ({ data }: { data: typeof example }) => {
  return (
    <>
      <a
        className="root"
        href={data.url}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="card-container">
          <div className="text-container">
            <div className="text-container-title">{data.title}</div>
            <div className="text-container-description">{data.description}</div>
            <div className="text-container-url-container">
              <img src={data.favicons[0]} width={16} height={16} alt="favico" />
              <span className="text-container-url">{data.url}</span>
            </div>
          </div>
          <div className="cover-container">
            {data.images[0] && (
              <img className="cover-image" src={data.images[0]} alt="cover" />
            )}
          </div>
        </div>
      </a>
      <style jsx>{`
        .root {
          width: 720px;
          display: block;
          cursor: pointer;
          user-select: none;
          border-radius: 6px;
          border: 1px solid #dee0e3;
          overflow: hidden;
          border: 1px solid #dee0e3;
          text-decoration: none;
        }
        .root:hover {
          border: 1px solid rgba(97, 106, 229, 0.5);
        }
        .card-container {
          width: 100%;
          max-height: 120px;
          background-color: #f8f8f8;
          display: flex;
          justify-content: space-between;
          align-items: stretch;
        }
        .text-container {
          padding: 12px 16px;
          flex-shrink: 2;
          overflow: hidden;
          display: flex;
          flex-flow: column;
        }
        .cover-container {
          width: 33.3%;
          min-width: 33.3%;
          flex-shrink: 1;
          flex-grow: 0;
        }
        .text-container-title {
          font-size: 16px;
          font-weight: 500;
          line-height: 26px;
          color: #1f2329;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .text-container-description {
          max-height: 40px;
          line-height: 20px;
          font-size: 14px;
          font-weight: 400;
          color: #646a73;
          margin-top: 6px;
          overflow: hidden;
          flex-grow: 1;
          flex-shrink: 2;
          text-overflow: ellipsis;
          white-space: break-spaces;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .text-container-url-container {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          min-width: 0;
          flex-direction: row;
          height: 17px;
          line-height: 17px;
          font-size: 12px;
          color: #1f2329;
          margin-top: 6px;
        }
        .text-container-url {
          margin-left: 8px;
          flex-grow: 0;
          flex-shrink: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cover-image {
          object-position: 50% 50%;
          background-size: auto 100%;
          background-position-y: 50%;
          background-repeat: no-repeat;
          object-fit: cover;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default function LinkPreview({
  url,
  showError = false,
}: {
  url: string;
  showError?: boolean;
}) {
  const { data, error } = useSWR(url, fetcher);

  return (
    <>
      {showError && error && !data && (
        <div>
          <strong>{error}</strong>
        </div>
      )}

      {data && <PreviewCard data={data} />}
      <style jsx>{`
        .input {
          width: 400px;
          padding: 2px 4px;
        }
      `}</style>
    </>
  );
}
