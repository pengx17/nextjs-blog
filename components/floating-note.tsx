import React from "react";
import ReactDom from "react-dom";
import { useHoverDirty, useWindowSize } from "react-use";

import { useHasMounted } from "./has-mounted";

export function FloatingNote({ label, children, ...props }) {
  const triggerRef = React.useRef<HTMLElement>(null);
  const [anchor, setAnchor] = React.useState<HTMLElement>(null);
  const asideRef = React.useRef<HTMLElement>(null);
  const hasMounted = useHasMounted();
  const triggerHovering = useHoverDirty(triggerRef, hasMounted);
  const asideHovering = useHoverDirty(asideRef, hasMounted && !!anchor);

  React.useEffect(() => {
    if (triggerRef.current && !anchor && hasMounted) {
      setTimeout(() => {
        let el = triggerRef.current;
        do {
          el = el.parentElement;
        } while (el && el.tagName !== "SECTION");
        el = el?.querySelector("[data-aside-container]");
        setAnchor(el);
      }, 100);
    }
  }, [triggerRef, anchor, hasMounted]);

  // This will trigger re-render when window size changed.
  useWindowSize();

  if (!hasMounted) {
    return null;
  }

  const asideEl =
    anchor &&
    ReactDom.createPortal(
      <aside
        ref={asideRef}
        style={{
          borderColor: triggerHovering ? "rgba(31, 41, 55)" : null,
          lineHeight: 1.6,
        }}
        className="p-2 mb-1 text-gray-800 rounded border-2 text-xs bg-gray-100 transition hover:border-gray-800"
      >
        {children}
      </aside>,
      anchor
    );

  const asideVisible =
    !!asideEl &&
    window.getComputedStyle(anchor.parentElement).display !== "none";

  return (
    <span
      ref={triggerRef}
      style={{
        textDecorationStyle: "dotted",
        textDecorationColor: "rgba(31, 41, 55)",
        textDecorationLine: asideVisible ? "underline" : "none",
        textUnderlineOffset: "2px",
        backgroundColor: asideHovering ? "rgb(209, 213, 219)" : "",
      }}
      className="cursor-pointer hover:bg-gray-300 transition"
      {...props}
    >
      {label ?? "💭"}
      {asideEl}
    </span>
  );
}
