import Arg from "arg";

/**
 * Wrap arg to return an error instead of throwing
 */
export function arg<T extends Arg.Spec>(
  argv: string[],
  spec: T,
  stopAtPositional = true,
  permissive = false
): Arg.Result<T> | Error {
  try {
    return Arg(spec, { argv, stopAtPositional, permissive });
  } catch (e: any) {
    return e;
  }
}
