import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.EMPTY_BASE_PATH === "true" ? "" : "/duolingo-japanese-vocabulary",
};

export default nextConfig;
