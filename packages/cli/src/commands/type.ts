export interface Command {
  parse(argv: string[]): Promise<string | Error>;
}

export type Commands = { [command: string]: Command };
