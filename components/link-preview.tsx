"use client";

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

export const getCardSize = (data: LinkPreviewMetadata) => {
  // If link has cover image
  let width =
    data.images && data.images.length > 0 && data.description ? 720 : 400;

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

  if (!data.description && data.images?.length !== 0) {
    height -= 60;
  }

  return [width, height];
};

// Credits: taken directly from innos.io
const PreviewCard = ({ data }: { data: LinkPreviewMetadata }) => {
  const [width, height] = getCardSize(data);

  return (
    <a
      className="block cursor-pointer select-none rounded-md border border-gray-200 overflow-hidden max-w-[90vw] hover:border-blue-200 shadow-sm"
      href={data.url}
      rel="noopener noreferrer"
      target="_blank"
      style={{ width, height }}
    >
      <div className="h-full bg-gray-50 flex justify-between items-stretch">
        <div className="py-3 px-4 flex-[2] overflow-hidden flex-col flex">
          <div className="text-base text-gray-800 font-medium leading-6 text-ellipsis whitespace-nowrap shrink-0">
            {data.title}
          </div>
          <div className="leading-5 text-xs font-normal text-gray-500 mt-1.5 flex flex-grow overflow-auto">
            {data.description}
          </div>
          <div className="flex items-center flex-nowrap min-w-0 flex-row h-4 leading-4 text-xs text-gray-700 mt-1.5">
            {data.favicons?.length > 0 && (
              <img
                className="mr-2"
                src={data.favicons[0]}
                width={16}
                height={16}
                alt=""
              />
            )}
            <span className="grow-0 shrink min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
              {data.url}
            </span>
          </div>
        </div>
        {data.images?.[0] && (
          <div className="flex-1">
            <img
              className="object-cover overflow-hidden h-full float-right"
              src={data.images[0]}
              alt=""
            />
          </div>
        )}
      </div>
    </a>
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
