const withMDX = require("@next/mdx")();

module.exports = withMDX({
  basePath: process.env.BASE_PATH ?? "",
});
