import { packageDirectory } from "pkg-dir";

async function resolveGridaProjectRoot(): Promise<
  {
    engine: "node.js";
  } & NodeJsProjectRoot
> {
  return {
    engine: "node.js",
    ...(await resolveGridaNodeProjectRoot(process.cwd())),
  };
}

interface NodeJsProjectRoot {
  packageRoot: string;
  packageJson: string;
  "grida.config.js": string;
}

/**
 * resolves nearest grida project directory to cwd
 */
async function resolveGridaNodeProjectRoot(
  cwd: string
): Promise<NodeJsProjectRoot> {
  // requirements
  // - package.json
  // - grida.config.js
  //
  // find directory above cwd.
  // find directories with package.json
  // find (
  //     package.json with "grida" as a devDependency(or dependency)
  //     or with grida.config.js file
  // )
  // if multiple directories found, return the one with the highest depth. (nearest to cwd)
  // if no directories found, return null.

  const pkgdir = await packageDirectory({
    cwd: cwd,
  });

  return {
    packageRoot: pkgdir,
    packageJson: `${pkgdir}/package.json`,
    "grida.config.js": `${pkgdir}/grida.config.js`,
  };
}

export { resolveGridaProjectRoot };
