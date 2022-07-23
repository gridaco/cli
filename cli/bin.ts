// import { program } from "commander";
// import add from "@grida-cli/add";
// import { designTo } from "@designto/code";
// import { isCurrentBinInstalledGlobally } from "./utils";
import { CLI } from "./cli";
import { Version } from "./commands";
import { iserror, ishelperror } from "./errors";
// program.name("grida").description("grida CLI").version("0.0.1");

// program
//   .command("add")
//   .description("Add new grida package to existing project")
//   .argument("<package>", "package name or url to add")
//   .option(
//     "--name",
//     "explicit name of package (required when adding via url",
//     undefined
//   )
//   .option("--no-save", "display just the first substring", false)
//   .action(handleAdd);

interface AddCommandOptions {
  name?: string;
  save?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const packageJson = require("../package.json");
const commandArray = process.argv.slice(2);
// const isGridaInstalledGlobally = isCurrentBinInstalledGlobally();

async function main(): Promise<number> {
  const cli = CLI.new({
    version: Version.new(),
    // doctor: Doctor.new()
  });

  const result = await cli.parse(commandArray);
  if (ishelperror(result)) {
    console.error(result.message);
    return 1;
  } else if (iserror(result)) {
    console.error(result);
    return 1;
  }
  console.log(result);

  return 0;
}

// process.on("SIGINT", () => {
//   process.exit(0); // now the "exit" event will fire
// });

// ====================================================================================
/**
 * main entry point
 */
if (require.main === module) {
  main()
    .then((code) => {
      if (code !== 0) {
        process.exit(code);
      }
    })
    .catch((err) => {
      // Sindre's pkg p-map & co are using AggregateError, it is an iterator.
      if (typeof err[Symbol.iterator] === "function") {
        for (const individualError of err) {
          // handleIndividualError(individualError);
        }
      } else {
        // handleIndividualError(err);
      }
    });
}
// ====================================================================================
