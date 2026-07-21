/**
 * Notes from older editors sometimes escape math delimiters as `\$`.
 * Restore those delimiters before handing the content to remark-math and
 * clean up a couple of legacy fence/delimiter typos found in the archive.
 */
export function normalizeArticleMarkdown(content: string) {
  return content
    .replace(/\\\$/g, "$")
    .replace(/^(.*\S)[ \t]+\$\$[ \t]*$/gm, line => {
      const delimiterCount = line.match(/\$\$/g)?.length ?? 0;
      return delimiterCount === 1
        ? line.replace(/[ \t]+\$\$[ \t]*$/, "")
        : line;
    })
    .replace(/```textt\b/g, "```text");
}
