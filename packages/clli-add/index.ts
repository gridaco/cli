import { resolveGridaProjectRoot } from "@grida-cli/project-root";
/**
 * $ grida add <pkg> <option>
 */
async function add() {
  const project = await resolveGridaProjectRoot();
  project["grida.config.js"];
  console.log(project);

  //
}

export default add;
