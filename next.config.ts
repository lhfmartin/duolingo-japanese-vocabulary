import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/duolingo-japanese-vocabulary",
  allowedDevOrigins: ["host.docker.internal"],
};

export default nextConfig;
