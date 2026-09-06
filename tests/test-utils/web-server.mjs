import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import nextConfig from "../../next.config.ts";
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
  },
});

const app = express();

app.use(
  nextConfig.basePath,
  createProxyMiddleware({
    target: `http://${args.values.hostname}:${args.values.port}`,
    changeOrigin: true,
    pathRewrite: { [`^/${nextConfig.basePath}`]: "" },
  }),
);

app.use(express.static("out"));

app.listen(args.values.port, () =>
  console.log(`Server running on http://${args.values.hostname}:${args.values.port}`),
);
