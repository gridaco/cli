# Grida CLI reference

This document describes the Grida CLI commands, arguments, and options.

## Haven't installed Grida CLI yet?

```sh
npx install grida
```

## Commands

### `version` (`-v`)

The `version` command outputs information about your current grida version, platform, and engine channels.

#### Examples

**Output version information**

```sh
$ grida version

# result
grida               : 2022
@grida/client       : 2022
Current platform    : macos
Design SDK          :
Studio              : remote (2022)
```

### `init`

Bootstraps a fresh Grida project within the current directory.

#### Arguments

#### Examples

### `add`

Adds a new package / module / ui to the Grida project.

#### Arguments

- `--name`
- `--no-save`

#### Examples

```sh
$ grida add https://figma.com/files/xxxx
$ grida add https://figma.com/files/xxxx?node-id=xxxx
```
