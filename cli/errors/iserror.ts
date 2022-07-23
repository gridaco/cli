import { HelpError } from "./help-error";

/**
 * Check if result is an error
 */
export function iserror(result: any): result is Error {
  return result instanceof Error;
}

export function ishelperror(result: any): result is HelpError {
  return result instanceof HelpError;
}
