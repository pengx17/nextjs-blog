import React from "react";
import Tippy from "@tippyjs/react";

import LinkPreview from "./link-preview";

export default function Anchor({ ...props }) {
  return (
    <Tippy
      interactive
      delay={100}
      sticky
      followCursor="horizontal"
      animation="fade"
      arrow={false}
      content={<LinkPreview url={props.href} />}
    >
      <a data-anchor {...props} />
    </Tippy>
  );
}