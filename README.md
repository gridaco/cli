# grida cli

Installation

```sh
npx install grida
# or for existing projects.. (node)
yarn add grida --dev
yarn add @grida/client # optional (recommended)
```

## Commands

```sh
$ grida init
$ grida login
$ grida logout
$ grida config
$ grida ui pull
$ grida ui push
$ grida ui eject
$ grida ui generate
$ grida ui diff
$ grida projects:list
$ grida open
$ grida eject
$ grida add # add new package
$ grida remove <package-name> # remove package
$ grida studio
$ grida docs
$ grida doctor
$ grida build
$ grida help
$ grida run
$ grida run <widget> # or grida preview <widget>
$ grida . # open current directoy in Grida
$ grida publish # publish grida package
$ grida checkout <existing-branch> # design branch
$ grida format
$ grida test
$ grida migrate
$ grida gen-l10n
$ grida remote add
```

<!-- create markdown table -->

| Command    | Example of use   | More information                              |
| ---------- | ---------------- | --------------------------------------------- |
| `help`     | `grida help`     | Show Grida help                               |
| `init`     | `grida init`     | Initialize a new Grida project                |
| `login`    | `grida login`    | Login to Grida                                |
| `logout`   | `grida logout`   | Logout from Grida                             |
| `config`   | `grida config`   | Configure Grida                               |
| `ui pull`  | `grida ui pull`  | Open Grida UI                                 |
| `ui push`  | `grida ui push`  | Push Grida UI                                 |
| `ui eject` | `grida ui eject` | Eject Grida UI                                |
| `eject`    | `grida eject`    | Eject Grida                                   |
| `add`      | `grida add`      | Add new package                               |
| `remove`   | `grida remove`   | Remove package                                |
| `studio`   | `grida studio`   | Open Grida Studio                             |
| `docs`     | `grida docs`     | Open Grida docs                               |
| `doctor`   | `grida doctor`   | Run Grida doctor                              |
| `build`    | `grida build`    | Build Grida                                   |
| `generate` | `grida generate` | Generate Client code with configuration       |
| `run`      | `grida run`      | Run Grida Project or single component         |
| `publish`  | `grida publish`  | Publish Grida package                         |
| `format`   | `grida format`   | Format Grida schema code                      |
| `test`     | `grida test`     | Run Grida tests                               |
| `migrate`  | `grida migrate`  | Run Grida migrations (version up, regenerate) |
| `gen-l10n` | `grida gen-l10n` | Generate Grida localization files             |
