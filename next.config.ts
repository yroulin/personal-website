import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  const development = phase === PHASE_DEVELOPMENT_SERVER;
  return {
    reactCompiler: true,
    output: development ? undefined : "export",
    typescript: { tsconfigPath: development ? "tsconfig.dev.json" : "tsconfig.json" },
    // The filesystem editor and its API must never enter the static deployment.
    pageExtensions: development
      ? ["site.tsx", "site.ts", "local.tsx", "local.ts"]
      : ["site.tsx", "site.ts"],
  };
}
