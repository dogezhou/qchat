await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./src/dist",
  target: "node",
  minify: true,
});
 