// Bundles css/index.css (following its @imports) into:
//   dist/neoless.css      readable
//   dist/neoless.min.css  minified
// Browser targets come from the "browserslist" field in package.json.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { bundle, browserslistToTargets } from "lightningcss";
import browserslist from "browserslist";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url)));
const targets = browserslistToTargets(browserslist(pkg.browserslist));
const banner = `/*! ${[`${pkg.displayName ?? pkg.name} v${pkg.version}`, pkg.license, pkg.homepage].filter(Boolean).join(" | ")} */\n`;

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist");

let warned = false;
for (const [file, minify] of [["neoless.css", false], ["neoless.min.css", true]]) {
  const { code, warnings } = bundle({ filename: "css/index.css", minify, targets });
  for (const w of warnings) {
    warned = true;
    console.warn(`warning: ${w.message} (${w.loc.filename}:${w.loc.line})`);
  }
  const out = banner + code.toString();
  writeFileSync(`dist/${file}`, out);
  console.log(`dist/${file.padEnd(15)} ${(Buffer.byteLength(out) / 1024).toFixed(1)} kB`);
}

if (warned && process.env.CI) process.exit(1);
