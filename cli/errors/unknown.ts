import chalk from "chalk";
import { HelpError } from "./help-error";

/**
 * Unknown command
 */
export function unknown(helpTemplate: string, cmd: string): HelpError {
  return new HelpError(
    `\n${chalk.bold.red(`!`)} Unknown command "${cmd}"\n${helpTemplate}`
  );
}
