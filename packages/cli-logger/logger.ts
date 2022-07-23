import chalk from "chalk";

export const tags = {
  error: chalk.red("grida:error"),
  warn: chalk.yellow("grida:warn"),
  info: chalk.cyan("grida:info"),
};

export const should = {
  warn: !process.env.GRIDA_DISABLE_WARNINGS,
};

export function log(...data: any[]) {
  console.log(...data);
}

export function warn(message: any, ...optionalParams: any[]) {
  if (should.warn) {
    console.warn(`${tags.warn} ${message}`, ...optionalParams);
  }
}

export function info(message: any, ...optionalParams: any[]) {
  console.info(`${tags.info} ${message}`, ...optionalParams);
}

export function error(message: any, ...optionalParams: any[]) {
  console.error(`${tags.error} ${message}`, ...optionalParams);
}
