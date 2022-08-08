// import fs from "fs";
// import globalDirectories from "global-dirs";

// // returns if current bin (grida) is installed globally
// export function isCurrentBinInstalledGlobally(): "npm" | "yarn" | false {
//   try {
//     const path = fs.realpathSync(process.argv[1]);
//     const g_yarn = path.indexOf(globalDirectories.yarn.packages) === 0;
//     const g_npm =
//       path.indexOf(fs.realpathSync(globalDirectories.npm.packages)) === 0;

//     if (g_npm) {
//       return "npm";
//     } else if (g_yarn) {
//       return "yarn";
//     } else {
//       false;
//     }
//   } catch (e) {
//     //
//   }
//   return false;
// }
