import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import lightTheme from "prism-react-renderer/themes/vsLight";

export default function Code({ children, className }) {
  const language = className?.replace(/language-/, "") ?? "javascript";

  return (
    <Highlight
      {...defaultProps}
      theme={lightTheme}
      code={children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div
          className={className}
          style={{
            ...style,
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </div>
      )}
    </Highlight>
  );
}
