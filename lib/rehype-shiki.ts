// Credits: https://github.com/mdx-js/mdx/discussions/1939#discussioncomment-2214962
import rehypeParse from "rehype-parse";
import * as shiki from "shiki";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import path from "path";
const themes = ["github-light"];

// FIXME: shiki does not load wasm file correctly
const rehypeShiki = () => async (tree) => {
  let highlighter = await shiki.getHighlighter({
    themes,
    paths: {
      languages: path.join(
        process.cwd(),
        "node_modules",
        "shiki",
        "languages",
        "/"
      ),
      themes: path.join(process.cwd(), "node_modules", "shiki", "themes", "/"),
    },
  });

  visit(tree, (node, index, parent) => {
    // If child is pre, but it contains no code
    if (
      !(
        node.tagName === "pre" &&
        node.children?.[0]?.tagName === "code" &&
        node.children?.[0]?.properties?.className?.[0].startsWith(
          "language-"
        ) &&
        node.children?.[0]?.children?.[0]?.type === "text"
      )
    ) {
      return;
    }

    let code = node.children[0].children[0].value;
    let lang = node.children[0].properties.className[0].slice(
      "language-".length
    );

    parent.children.splice(
      index,
      1,
      ...themes.map((theme) => {
        let n = unified()
          .use(rehypeParse, { fragment: true })
          .parse(highlighter.codeToHtml(code, { theme, lang }));

        // The pre's parent
        // @ts-expect-error ???
        n.children[0].properties.className.push(theme);
        return n;
      })
    );
  });
};

export default rehypeShiki;
