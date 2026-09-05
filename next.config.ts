import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/duolingo-japanese-vocabulary",
  allowedDevOrigins: ["host.docker.internal"],
  devIndicators: false,
};

export default nextConfig;
