import dedent from "strip-indent";

/**
 * format
 */
export function format(input = ""): string {
  return dedent(input).trimEnd() + "\n";
}
