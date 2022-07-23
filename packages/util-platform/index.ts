import os from "os";
import fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);
const exists = promisify(fs.exists);

export type Platform =
  | "native"
  | "darwin"
  | "darwin-arm64"
  | "debian-openssl-1.0.x"
  | "debian-openssl-1.1.x"
  | "debian-openssl-3.0.x"
  | "rhel-openssl-1.0.x"
  | "rhel-openssl-1.1.x"
  | "rhel-openssl-3.0.x"
  | "linux-arm64-openssl-1.1.x"
  | "linux-arm64-openssl-1.0.x"
  | "linux-arm64-openssl-3.0.x"
  | "linux-arm-openssl-1.1.x"
  | "linux-arm-openssl-1.0.x"
  | "linux-arm-openssl-3.0.x"
  | "linux-musl"
  | "linux-nixos"
  | "windows"
  | "freebsd11"
  | "freebsd12"
  | "freebsd13"
  | "openbsd"
  | "netbsd"
  | "arm";

export const platforms: Array<Platform> = [
  "darwin",
  "darwin-arm64",
  "debian-openssl-1.0.x",
  "debian-openssl-1.1.x",
  "debian-openssl-3.0.x",
  "rhel-openssl-1.0.x",
  "rhel-openssl-1.1.x",
  "rhel-openssl-3.0.x",
  "linux-arm64-openssl-1.1.x",
  "linux-arm64-openssl-1.0.x",
  "linux-arm64-openssl-3.0.x",
  "linux-arm-openssl-1.1.x",
  "linux-arm-openssl-1.0.x",
  "linux-arm-openssl-3.0.x",
  "linux-musl",
  "linux-nixos",
  "windows",
  "freebsd11",
  "freebsd12",
  "freebsd13",
  "openbsd",
  "netbsd",
  "arm",
];

// https://www.geeksforgeeks.org/node-js-process-arch-property/
export type Arch =
  | "x32"
  | "x64"
  | "arm"
  | "arm64"
  | "s390"
  | "s390x"
  | "mipsel"
  | "ia32"
  | "mips"
  | "ppc"
  | "ppc64";
export type GetOSResult = {
  platform: NodeJS.Platform;
  libssl?: string;
  arch: Arch;
  distro?:
    | "rhel"
    | "debian"
    | "musl"
    | "arm"
    | "nixos"
    | "freebsd11"
    | "freebsd12"
    | "freebsd13";
};

export async function getos(): Promise<GetOSResult> {
  const platform = os.platform();
  const arch = process.arch as Arch;
  if (platform === "freebsd") {
    // TODO: bring this back after bun supports child_process#exec
    // const version = await _exec(`freebsd-version`);
    // if (version && version.trim().length > 0) {
    //   const regex = /^(\d+)\.?/;
    //   const match = regex.exec(version);
    //   if (match) {
    //     return {
    //       platform: "freebsd",
    //       distro: `freebsd${match[1]}` as GetOSResult["distro"],
    //       arch,
    //     };
    //   }
    // }
    return {
      platform: "freebsd",
      distro: `freebsd13`, // FIXME:
      arch,
    };
  }

  if (platform !== "linux") {
    return {
      platform,
      arch,
    };
  }

  return {
    platform: "linux",
    distro: await resolveDistro(),
    arch,
  };
}

export async function getPlatform(): Promise<Platform> {
  const { platform, libssl, distro, arch } = await getos();

  // Apple Silicon (M1)
  if (platform === "darwin" && arch === "arm64") {
    return "darwin-arm64";
  }

  if (platform === "darwin") {
    return "darwin";
  }

  if (platform === "win32") {
    return "windows";
  }

  if (platform === "freebsd") {
    return distro as Platform;
  }

  if (platform === "openbsd") {
    return "openbsd";
  }

  if (platform === "netbsd") {
    return "netbsd";
  }
  if (platform === "linux" && arch === "arm64") {
    // 64 bit ARM
    return `linux-arm64-openssl-${libssl}` as Platform;
  }

  if (platform === "linux" && arch === "arm") {
    // 32 bit ARM
    return `linux-arm-openssl-${libssl}` as Platform;
  }

  if (platform === "linux" && distro === "nixos") {
    return "linux-nixos";
  }

  if (platform === "linux" && distro === "musl") {
    return "linux-musl";
  }

  // when the platform is linux
  if (platform === "linux" && distro && libssl) {
    return (distro + "-openssl-" + libssl) as Platform;
  }

  // if just OpenSSL is known, fallback to debian with a specific libssl version
  if (libssl) {
    return ("debian-openssl-" + libssl) as Platform;
  }

  // if just the distro is known, fallback to latest OpenSSL 1.1
  if (distro) {
    return (distro + "-openssl-1.1.x") as Platform;
  }

  // use the debian build with OpenSSL 1.1 as a last resort
  return "debian-openssl-1.1.x";
}

export function parseDistro(input: string): GetOSResult["distro"] {
  const idRegex = /^ID="?([^"\n]*)"?$/im;
  const idLikeRegex = /^ID_LIKE="?([^"\n]*)"?$/im;

  const idMatch = idRegex.exec(input);
  const id = (idMatch && idMatch[1] && idMatch[1].toLowerCase()) || "";

  const idLikeMatch = idLikeRegex.exec(input);
  const idLike =
    (idLikeMatch && idLikeMatch[1] && idLikeMatch[1].toLowerCase()) || "";

  if (id === "raspbian") {
    return "arm";
  }

  if (id === "nixos") {
    return "nixos";
  }

  if (
    idLike.includes("centos") ||
    idLike.includes("fedora") ||
    idLike.includes("rhel") ||
    id === "fedora"
  ) {
    return "rhel";
  }

  if (
    idLike.includes("debian") ||
    idLike.includes("ubuntu") ||
    id === "debian"
  ) {
    return "debian";
  }

  return;
}

export async function resolveDistro(): Promise<
  undefined | GetOSResult["distro"]
> {
  // https://github.com/retrohacker/getos/blob/master/os.json
  const osReleaseFile = "/etc/os-release";
  const alpineReleaseFile = "/etc/alpine-release";

  if (await exists(alpineReleaseFile)) {
    return "musl";
  } else if (await exists(osReleaseFile)) {
    return parseDistro(await readFile(osReleaseFile, "utf-8"));
  } else {
    return;
  }
}

// TODO: bring this back after bun supports child_process#exec
// import { exec } from "child_process";
// async function _exec(cmd: string): Promise<string | undefined> {
//   return new Promise((resolve) => {
//     try {
//       exec(cmd, (err, stdout) => {
//         resolve(String(stdout));
//       });
//     } catch (e) {
//       resolve(undefined);
//       return undefined;
//     }

//     return undefined;
//   });
// }
