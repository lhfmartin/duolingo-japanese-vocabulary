import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { parseArgs } from "node:util";

const args = parseArgs({
  args: process.argv.slice(2),
  options: {
    hostname: {
      type: "string",
      default: "0.0.0.0",
    },
    port: {
      type: "string",
      default: "8080",
    },
    "rewrite-rule": {
      type: "string",
    },
  },
});

const app = express();

const [oldPath, newPath] = args.values["rewrite-rule"]!.split(":");

app.use(
  "/",
  createProxyMiddleware({
    target: `http://${args.values.hostname}:${args.values.port}`,
    changeOrigin: true,
    pathRewrite: { [oldPath]: newPath },
    pathFilter: oldPath,
  }),
);

app.use(express.static("out"));

app.listen(args.values.port, () =>
  console.log(`Server running on http://${args.values.hostname}:${args.values.port}`),
);
