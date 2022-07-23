import chalk from "chalk";
import { HelpError } from "../errors";
import { arg, format } from "../utils";
import type { Command } from "./type";

const _package_json = require("../package.json"); // eslint-disable-line @typescript-eslint/no-var-requires

export class Version implements Command {
  static new(): Version {
    return new Version();
  }

  private static help = format(`
  Print current version of Grida components

  ${chalk.bold("Usage")}

    ${chalk.dim("$")} grida -v [options]
    ${chalk.dim("$")} grida version [options]

  ${chalk.bold("Options")}

    -h, --help     Display this help message
`);

  async parse(argv: string[]) {
    const args = arg(argv, {
      "--help": Boolean,
      "-h": "--help",
      "--version": Boolean,
      "-v": "--version",
      "--json": Boolean,
      "--telemetry-information": String,
    });

    if (args["--help"]) {
      return this.help();
    }

    throw new Error("not implemented");
  }

  public help(error?: string): string | HelpError {
    if (error) {
      return new HelpError(
        `\n${chalk.bold.red(`!`)} ${error}\n${Version.help}`
      );
    }

    return Version.help;
  }
}
