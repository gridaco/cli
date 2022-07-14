import { program } from "commander";
import add from "@grida-cli/add";

program.name("grida").description("grida CLI").version("0.0.1");

program
  .command("add")
  .description("Add new grida package to existing project")
  .argument("<package>", "package name or url to add")
  .option(
    "--name",
    "explicit name of package (required when adding via url",
    undefined
  )
  .option("--no-save", "display just the first substring", false)
  .action(handleAdd);

interface AddCommandOptions {
  name?: string;
  save?: boolean;
}

function handleAdd(pkg, options: AddCommandOptions) {
  add();
  console.log(`Adding ${pkg} to project`, JSON.stringify(options, null, 2));
}

program.parse();
