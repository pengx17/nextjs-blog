/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import useSWR from "swr/immutable";
import { useHasMounted } from "./has-mounted";

const normalizeUrl = (url: string) => {
  if (url.startsWith("/")) {
    return new URL(url, document.location.origin).href;
  }
  return url;
};

const fetcher = (url: string) => {
  return fetch(
    `/api/link-preview?url=${encodeURIComponent(normalizeUrl(url))}`
  ).then((res) => {
    if (res.status >= 400) {
      throw res.statusText;
    }
    return res.json();
  });
};

interface BaseType {
  mediaType: string;
  contentType: string;
  favicons: string[];
  url: string;
  error: any;
}

interface PlaceholderType extends BaseType {
  contentType: "placeholder";
}

interface HTMLResponse extends BaseType {
  title: string;
  siteName: string;
  description: string;
  images: string[];
  videos: string[];
  contentType: `text/html${string}`;
}

interface AudioResponse extends BaseType {
  contentType: `audio/${string}`;
}

interface ImageResponse extends BaseType {
  contentType: `image/${string}`;
}

interface VideoResponse extends BaseType {
  contentType: `video/${string}`;
}

interface ApplicationResponse extends BaseType {
  contentType: `application/${string}`;
}

type Metadata =
  | HTMLResponse
  | AudioResponse
  | ImageResponse
  | VideoResponse
  | ApplicationResponse
  | PlaceholderType;

const isHTML = (d: Metadata): d is HTMLResponse => {
  return (d as any).contentType.startsWith("text/html");
};

const isVideo = (d: Metadata): d is VideoResponse => {
  return (d as any).contentType.startsWith("video/");
};

const isAudio = (d: Metadata): d is AudioResponse => {
  return (d as any).contentType.startsWith("audio/");
};

const isImage = (d: Metadata): d is ImageResponse => {
  return (d as any).contentType.startsWith("image/");
};

const adaptMeta = (d: Metadata) => {
  if (isHTML(d)) {
    return d;
  }

  if (isVideo(d)) {
    return {
      ...d,
      images: [],
      description: <video controls src={d.url} />,
      url: d.url,
    };
  }

  if (isAudio(d)) {
    return {
      ...d,
      images: [],
      description: <audio controls src={d.url} />,
    };
  }

  if (isImage(d)) {
    return {
      ...d,
      images: [],
      description: <img src={d.url} alt="" />,
    };
  }

  return {
    ...d,
    images: [],
    description:
      d.error != null ? "Failed to load link metadata" : "loading ...",
  };
};

type LinkPreviewMetadata = Pick<
  Metadata,
  "contentType" | "error" | "favicons" | "mediaType" | "url"
> & {
  title?: string;
  description: React.ReactNode;
  images?: string[];
};

const useLinkPreview = (href: string): LinkPreviewMetadata | null => {
  const { data, error } = useSWR(href, fetcher);

  return React.useMemo(() => {
    return href
      ? adaptMeta({
          contentType: "placeholder",
          error,
          url: href,
          ...(data ?? {}),
        })
      : null;
  }, [href, error, data]);
};

const getCardSize = (data: LinkPreviewMetadata) => {
  // If link has cover image
  const width = data.images && data.images.length > 0 ? 720 : 400;

  // If link showing placeholder
  let height = 140;

  if (
    data.contentType.startsWith("text/html") ||
    data.contentType.startsWith("audio")
  ) {
    height = 140;
  } else if (
    data.contentType.startsWith("image") ||
    data.contentType.startsWith("video")
  ) {
    height = 300;
  } else {
    height = 100;
  }
  if (!data.description) {
    height -= 30;
  }

  return [width, height];
};

// Credits: taken directly from innos.io
const PreviewCard = ({ data }: { data: LinkPreviewMetadata }) => {
  const [width, height] = getCardSize(data);

  return (
    <>
      <a
        className="root"
        href={data.url}
        rel="noopener noreferrer"
        target="_blank"
        style={{ width, height }}
      >
        <div className="card-container">
          <div className="text-container">
            <div className="text-container-title">{data.title}</div>
            <div className="text-container-description">{data.description}</div>
            <div className="text-container-url-container">
              {data.favicons?.length > 0 && (
                <img src={data.favicons[0]} width={16} height={16} alt="" />
              )}
              <span className="text-container-url">{data.url}</span>
            </div>
          </div>
          {data.images?.[0] && (
            <div className="cover-container">
              <img className="cover-image" src={data.images[0]} alt="" />
            </div>
          )}
        </div>
      </a>
      <style jsx>{`
        .root {
          display: block;
          cursor: pointer;
          user-select: none;
          border-radius: 6px;
          border: 1px solid #dee0e3;
          overflow: hidden;
          border: 1px solid #dee0e3;
          text-decoration: none;
          text-shadow: none;
          max-width: 100%;
        }
        .root:hover {
          border: 1px solid rgba(97, 106, 229, 0.5);
        }
        .card-container {
          width: 100%;
          height: 100%;
          background-color: #f8f8f8;
          display: flex;
          justify-content: space-between;
          align-items: stretch;
        }
        .text-container {
          padding: 12px 16px;
          flex: 2;
          overflow: hidden;
          display: flex;
          flex-flow: column;
        }
        .cover-container {
          flex: 1;
        }
        .text-container-title {
          font-size: 16px;
          font-weight: 500;
          line-height: 26px;
          color: #1f2329;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .text-container-description {
          line-height: 20px;
          font-size: 12px;
          font-weight: 400;
          color: #646a73;
          margin-top: 6px;
          overflow: auto;
          display: flex;
          flex-grow: 1;
        }

        .text-container-description > * {
          align-self: center;
          flex: 1;
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
        .text-container-url-container > img {
          margin-right: 8px;
        }
        .text-container-url {
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
}: {
  url: string;
  showError?: boolean;
}) {
  const hasMounted = useHasMounted();

  const meta = useLinkPreview(hasMounted ? url : null);
  return meta ? <PreviewCard data={meta} /> : null;
}
