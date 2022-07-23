import chalk from "chalk";
import type { Command, Commands } from "./commands";
import { arg, format, link } from "./utils";
import { HelpError, iserror, unknown } from "./errors";
import { Version } from "./commands";

export class CLI implements Command {
  static new(cmds: Commands): CLI {
    return new CLI(cmds);
  }

  private constructor(private readonly cmds: Commands) {}

  async parse(argv: string[]): Promise<string | Error> {
    const args = arg(argv, {
      "--help": Boolean,
      "-h": "--help",
      "--version": Boolean,
      "-v": "--version",
      "--json": Boolean, // for -v
      "--experimental": Boolean,
      "--preview-feature": Boolean,
      "--early-access-feature": Boolean,
      "--telemetry-information": String,
    });

    if (iserror(args)) {
      return this.help(args.message);
    }

    if (args["--version"]) {
      return Version.new().parse(argv);
    }

    // display help for help flag or no subcommand
    if (args._.length === 0 || args["--help"]) {
      return this.help();
    }

    // check if we have that subcommand
    const cmdName = args._[0];

    const cmd = this.cmds[cmdName];
    if (cmd) {
      // if we have that subcommand, let's ensure that the binary is there in case the command needs it
      let argsForCmd: string[];
      if (args["--experimental"]) {
        argsForCmd = [
          ...args._.slice(1),
          `--experimental=${args["--experimental"]}`,
        ];
      } else if (args["--preview-feature"]) {
        argsForCmd = [
          ...args._.slice(1),
          `--preview-feature=${args["--preview-feature"]}`,
        ];
      } else if (args["--early-access-feature"]) {
        argsForCmd = [
          ...args._.slice(1),
          `--early-access-feature=${args["--early-access-feature"]}`,
        ];
      } else {
        argsForCmd = args._.slice(1);
      }

      return cmd.parse(argsForCmd);
    }
    // unknown command
    return unknown(this.help() as string, args._[0]);
  }

  public help(error?: string) {
    if (error) {
      return new HelpError(`\n${chalk.bold.red(`!`)} ${error}\n${CLI.help}`);
    }
    return CLI.help;
  }

  private static help = format(`
    ${
      process.platform === "win32" ? "" : chalk.bold.green("◭  ")
    }Grida is a design2code toolkit to visually manage and develop your front-end applications. (
      ${
        //link(
        "https://grida.co"
        //)
      })

    ${chalk.bold("Usage")}

      ${chalk.dim("$")} grida [command]

    ${chalk.bold("Commands")}

                init   Set up Grida for your app
            generate   Generate artifacts (e.g. Grida Client)
             migrate   Migrate your database
              studio   Browse your data with Grida Studio
              format   Format your schema

    ${chalk.bold("Flags")}

         --preview-feature   Run Preview Grida commands

    ${chalk.bold("Examples")}

      Set up a new Grida project
      ${chalk.dim("$")} grida init

      Generate artifacts (e.g. Grida Client)
      ${chalk.dim("$")} grida generate

      Browse your data
      ${chalk.dim("$")} grida studio

      Create migrations from your Grida schema, apply them to the database, generate artifacts (e.g. Grida Client)
      ${chalk.dim("$")} grida migrate dev
  `);
}
