import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import lightTheme from "prism-react-renderer/themes/github";

export default function CodeHighlight({ children, className }) {
  const content = children.props.children;
  const language = className.split("language-")[1] ?? "javascript";
  return (
    <Highlight
      {...defaultProps}
      theme={lightTheme}
      code={content?.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} text-[13px] p-4 bg-gray-100 font-mono leading-snug w-full`}
          style={style}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
