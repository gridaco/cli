import chalk from "chalk";
// import terminalLink from "terminal-link";

export function link(url): string {
  // https://github.com/oven-sh/bun/issues/822
  // return terminalLink(url, url, {
  //   fallback: (url) => chalk.underline(url),
  // });
  return url;
}
