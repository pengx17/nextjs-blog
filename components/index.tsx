import dynamic from "next/dynamic";
import React from "react";
import { Anchor } from "./anchor";
import { FloatingNote } from "./floating-note";
import { Icon } from "./icon";

const cx = (...args: string[]) => {
  return args.filter(Boolean).join(" ");
};

const hWrapper = (Tag, defaultClassName) =>
  React.forwardRef(({ className, children, ...rest }: any, ref) => {
    return (
      <Tag
        ref={ref}
        className={cx("font-serif relative", className, defaultClassName)}
        {...rest}
      >
        <>
          {children}
          <span
            style={{
              position: "absolute",
              right: "calc(100% + .2rem)",
              opacity: ".1",
              top: "calc(50% - .4em)",
              fontSize: "0.8em",
              lineHeight: 1,
            }}
            className="font-normal font-mono uppercase select-none"
          >
            {Tag}
          </span>
        </>
      </Tag>
    );
  });

const createSectionWrapper =
  (Tag) =>
  ({ className, ...props }) => {
    return (
      <section className={cx("my-4 relative flex", className)}>
        <Tag className="flex-1" {...props} />
        <aside className="md:hidden lg:block lg:w-48 xl:w-72 h-full left-full pl-2 flex-shrink-0">
          <div
            className="sticky right-0 top-4 bottom-4 min-h-full"
            data-aside-container
          />
        </aside>
      </section>
    );
  };

const wrapNative = (Tag, className?: string) =>
  React.forwardRef(({ className: c, ...props }: any, ref) => {
    return <Tag ref={ref} className={cx(className, c)} {...props} />;
  });

// Components to be injected to MDX
export const mdxComponents = {
  a: Anchor,
  code: dynamic(() => import("./code")),
  LinkPreview: dynamic(() => import("./link-preview")),
  note: FloatingNote,
  Icon: Icon,

  // Default ones
  inlineCode: (props) => (
    <code
      className="bg-gray-100 rounded"
      style={{ fontSize: "0.8em", padding: "0.1em 0.2em", lineHeight: 1 }}
    >
      {props.children}
    </code>
  ),
  p: wrapNative("p"),
  h1: hWrapper("h1", "text-3xl font-bold my-8"),
  h2: hWrapper("h2", "text-2xl font-bold my-8"),
  h3: hWrapper("h3", "text-xl font-bold my-6"),
  h4: hWrapper("h4", "text-xl font-semibold my-4"),
  // Should not use H5 & H6
  hr: wrapNative("hr", "h-1.5 border-gray-400 border-t border-b my-4"),
  blockquote: wrapNative(
    "blockquote",
    "py-0.5 px-4 border-green-900 border-l-4"
  ),
  pre: wrapNative("pre", "whitespace-pre-wrap"),
  ul: wrapNative("ul", "list-disc pl-10"),
};

["p", "blockquote", "pre", "ul", "ol", "hr"].forEach((tag) => {
  mdxComponents[tag] = createSectionWrapper(mdxComponents[tag]);
});