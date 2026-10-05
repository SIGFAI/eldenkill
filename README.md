# EldenKill

ULTRAKILL inside Elden Ring: play V1 in the Lands Between, with ULTRAKILL's weapons and movement against Elden Ring's enemies and bosses (offline).

**EldenKill is made by [FFwLo](https://github.com/FFwLo).** All credit for the mod goes to them.

- Original project: https://github.com/FFwLo/EldenKill
- Report bugs and ask questions there: https://github.com/FFwLo/EldenKill/issues
- Upstream release packaged here: [v0.1.0](https://github.com/FFwLo/EldenKill/releases/tag/v0.1.0) (commit [`a159cd1`](https://github.com/FFwLo/EldenKill/tree/a159cd1f9f094c74206826e5f5f8c310d393c557))

> **Beta.** Nobody at SIGF has played this build yet. Back up your saves.
> Bugs in the mod itself go to the author's issue tracker above; problems with the one-click install go to this repository's issues.

## What you need

- **Elden Ring** ([Steam](https://store.steampowered.com/app/1245620/)): exe 2.7.1.0 only (fromsoftware-rs 59fbd3b).
- **ULTRAKILL** ([Steam](https://store.steampowered.com/app/1229490/)): current Steam build (upstream pins none).
- me3 0.13.0: install with me3_installer.exe (the launch file looks in %LOCALAPPDATA%\Programs\garyttierney\me3\bin, then PATH) (https://github.com/garyttierney/me3/releases/tag/v0.13.0).
- Windows and the [SIGF app](https://sigf.ai). The app installs bepinex 5.4.23.5 for you.

## Install

In the SIGF app, open **EldenKill** in the catalog, press **Install**, then **Play**. **Restore** puts your game folders back exactly as they were.
The app follows `mashup.json` in this repository: every download is pinned by sha256. The files come from the release [`v0.1.0`](../../releases/tag/v0.1.0) and, for `EldenKill-0.1.0.zip`, from the author's own release.

### Good to know

- You need both games on Steam: Elden Ring (exe 2.7.1.0) and ULTRAKILL. Windows only, offline only. 16 GB of RAM stutters: two games run at once.
- Install me3 0.13.0 first with its me3_installer.exe (https://github.com/garyttierney/me3/releases/tag/v0.13.0).
- To play, run launch-eldenkill.bat in the mashup's profile folder (%LOCALAPPDATA%\SIGF\profiles\sigf-eldenkill\eldenring), not as admin. It starts Elden Ring through me3, offline with Easy Anti-Cheat off and Elden Ring's Arxan anti-tamper off (--disable-arxan, so the frame-rate and ultrawide patches hold), on its own save file EldenKill.sl2: your normal save is never touched. The Play button does not start it.
- Elden Ring then starts ULTRAKILL by itself, hidden. If ULTRAKILL is not in C:\Program Files (x86)\Steam or D:\SteamLibrary, set "ultrakill = <your ULTRAKILL folder>\ULTRAKILL.exe" in eldenkill.ini in the same profile folder.
- BepInEx 5.4.23.5 and the EldenKill plugin are installed into the ULTRAKILL folder, the EldenKill files into the profile folder; Restore removes both. The EldenKill.sl2 save me3 writes is yours and stays.
- Release caveat: the author's v0.1.0 zip was published before the repo's only commit, so it cannot be tied to an exact commit (its eldenkill.me3 also differs from the repo's). SIGF scanned it with Windows Defender (clean) and reviewed the source; it is downloaded from the author's release as released.
- Work in progress (author): you may fall through the map, hit invisible walls or get stuck, and some enemies do not react to hits. Report bugs to the author on the upstream issue tracker.

## What this repository holds

EldenKill has no license (its README says "No license chosen yet"), so SIGF may not rehost it. This repository holds **only SIGF's own files**, never the author's:

1. This README, `THIRD-PARTY.md`, `sigf/` (the script that built the recipe, for reference) and `mashup.json` (the SIGF app recipe).
2. Not here: `EldenKill-0.1.0.zip` (sha256 `0c4ab9e313af36c9985638527f1880656d14d45f46c8461645b3223cfac89fcc`). The app downloads it on the player's demand from the author's release, as released: https://github.com/FFwLo/EldenKill/releases/download/v0.1.0/EldenKill-0.1.0.zip
3. The release `v0.1.0`:

| Asset | Size | sha256 | What it is |
|---|---|---|---|
| `BepInEx_win_x64_5.4.23.5.zip` | 639118 B | `82f9878551030f54657792c0740d9d51a09500eeae1fba21106b0c441e6732c4` | BepInEx 5.4.23.5 x64, the official build, unchanged (see THIRD-PARTY.md); unpacked into the ULTRAKILL folder. |

The sha256 of every file inside the zips is in `mashup.json` (`contents`).

## Licenses

| Part | License | Where |
|---|---|---|
| EldenKill (`EldenKill-0.1.0.zip`, the author's release file) | no license: all rights reserved by FFwLo. Not stored here; the app downloads it from the author's release | https://github.com/FFwLo/EldenKill |
| BepInEx 5.4.23.5 and what its zip bundles (release asset) | MIT; UnityDoorstop LGPL-2.1 | `THIRD-PARTY.md` |

## Why this repository exists

The SIGF app (https://sigf.ai) installs mods from recipes (`mashup.json`) whose downloads are pinned release files. This repository makes EldenKill installable in one click, credited to FFwLo. If you are the author and want anything changed or taken down, open an issue here.
