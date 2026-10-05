// EldenKill (FFwLo, no license): ULTRAKILL's V1 played inside Elden Ring. Passthrough: a Rust DLL loaded by me3 in
// Elden Ring starts a hidden ULTRAKILL (BepInEx 5 plugin EldenKill.Guest) and the two link over shared memory.
// No license, so upstream fetch (PLATFORM-SPEC section 4, "Upstream fetch"): EldenKill-0.1.0.zip is downloaded by the
// app from the author's release as released, never rehosted. SIGFAI/eldenkill hosts the recipe and the official
// BepInEx 5 x64 zip (LGPL-2.1, unchanged), as in library/ultracraft/build.mjs.
//
// The release zip (backslash entry names, root EldenKill\) is placed twice, with the install file `root`:
//   - Elden Ring step: EldenKill/ into {app} (the SIGF profile folder): eldenkill.dll, eldenkill.me3 (me3 profile,
//     natives path "eldenkill.dll" relative to it), eldenkill.ini, launch-eldenkill.bat. The bat runs
//     `me3 launch --game eldenring --profile <its folder>\eldenkill.me3 --savefile EldenKill.sl2 --disable-arxan`
//     with me3 from %LOCALAPPDATA%\Programs\garyttierney\me3\bin\me3.exe (me3's installer) or PATH, so a portable me3
//     shipped next to it would not be found: me3 is a player prerequisite.
//   - ULTRAKILL step: BepInEx 5, then EldenKill/ULTRAKILL-plugin into {game}/BepInEx/plugins/EldenKill, the folder
//     host-eldenring/src/er/launcher.rs checks for.
// Launch: none from the app. A store launch of Elden Ring starts Easy Anti-Cheat and no mod; the player runs
// launch-eldenkill.bat, and the DLL starts ULTRAKILL itself (ini `ultrakill`, else Desktop\ULTRAKILL, else
// C:\Program Files (x86)\Steam\... or D:\SteamLibrary\...).
//   node library/eldenkill/build.mjs                    (outputs: library/lib.mjs)
import { BEPINEX, asset, card, dl, emit, pinned } from '../lib.mjs';

const UP = {
  repo: 'https://github.com/FFwLo/EldenKill', tag: 'v0.1.0', commit: 'a159cd1f9f094c74206826e5f5f8c310d393c557',
  authors: ['FFwLo'],
  zip: { file: 'EldenKill-0.1.0.zip', sha256: '0c4ab9e313af36c9985638527f1880656d14d45f46c8461645b3223cfac89fcc' }, // = GitHub digest, 2026-10-05
};
const ME3 = { id: 'me3', version: '0.13.0', page: 'https://github.com/garyttierney/me3/releases/tag/v0.13.0', license: 'Apache-2.0' };
const ID = 'eldenkill', VERSION = '0.1.0', NAME = 'EldenKill';
const TAGLINE = 'ULTRAKILL inside Elden Ring: play V1 in the Lands Between, with ULTRAKILL\'s weapons and movement against Elden Ring\'s enemies and bosses (offline).';

const upUrl = `${UP.repo}/releases/download/${UP.tag}/${UP.zip.file}`;
const mod = asset(UP.zip.file, await pinned(upUrl, UP.zip.sha256), { zipped: true, upstream: upUrl });
const bepinex = asset(BEPINEX.file, await pinned(BEPINEX.url, BEPINEX.sha256), { zipped: true });
for (const p of ['EldenKill/eldenkill.dll', 'EldenKill/eldenkill.me3', 'EldenKill/launch-eldenkill.bat', 'EldenKill/ULTRAKILL-plugin/EldenKill.Guest.dll']) {
  if (!mod.contents.some(c => c.path === p)) throw new Error(`${UP.zip.file} has no ${p}`);
}
const assets = [bepinex, mod];

const make = (urls) => ({
  id: `sigf/${ID}`,
  version: VERSION,
  name: NAME,
  tagline: TAGLINE,
  kind: 'passthrough',
  games: [
    { game: 'eldenring', role: 'host', label: 'Elden Ring', engine: 'Elden Ring (FromSoftware) + me3 native DLL (Rust)', apps: { steam: '1245620' }, runtime: 'exe 2.7.1.0 only (fromsoftware-rs 59fbd3b)' },
    { game: 'ultrakill', role: 'guest', label: 'ULTRAKILL', engine: 'ULTRAKILL (Unity, Mono, x64) + BepInEx 5 plugin EldenKill.Guest (C#)', apps: { steam: '1229490' }, runtime: 'current Steam build (upstream pins none)' },
  ],
  requires: [
    { id: ME3.id, version: ME3.version, license: `${ME3.license}; linked, the bat finds only its installer`, page: ME3.page,
      note: 'install with me3_installer.exe (the launch file looks in %LOCALAPPDATA%\\Programs\\garyttierney\\me3\\bin, then PATH)' },
    { id: BEPINEX.id, version: BEPINEX.version, license: `${BEPINEX.license}, shipped unchanged`, page: `${BEPINEX.repo}/releases/tag/v${BEPINEX.version}`,
      note: 'installed into the ULTRAKILL folder by the app', source: { url: urls[bepinex.name], sha256: bepinex.sha256 } },
  ],
  install: [
    // Upstream file as released. root: only EldenKill/ is placed, into the profile folder; launch-eldenkill.bat
    // finds eldenkill.me3 and eldenkill.dll next to itself.
    { game: 'eldenring', strategy: 'profile', loader: 'me3', files: [
      { src: mod.name, dst: '{app}', root: 'EldenKill', unpack: true, contents: mod.contents, ...dl(mod, urls) },
    ] },
    { game: 'ultrakill', strategy: 'game-dir-snapshot', loader: 'bepinex', files: [
      { src: bepinex.name, dst: '{game}', unpack: true, contents: bepinex.contents, ...dl(bepinex, urls) },
      { src: mod.name, dst: '{game}/BepInEx/plugins/EldenKill', root: 'EldenKill/ULTRAKILL-plugin', unpack: true, contents: mod.contents, ...dl(mod, urls) },
    ] },
  ],
  // Nothing the app can start: Elden Ring must go through me3 (launch-eldenkill.bat, offline, EAC off), and the DLL
  // starts ULTRAKILL itself, hidden.
  launch: [],
  files: assets.map(a => ({ name: a.name, ...dl(a, urls) })),
  source: {
    repo: UP.repo, license: 'No license (upstream file) + LGPL-2.1', upstream_license: null, fetch: 'upstream', tag: UP.tag, commit: UP.commit,
    hosted: `https://github.com/SIGFAI/${ID}`,
    release_commit: null, release_note: 'release published 2026-10-05T02:24Z, before the only commit (11:59Z) the tag now points at; eldenkill.me3 differs from the repo',
    bundled: [{ name: 'BepInEx', version: BEPINEX.version, repo: BEPINEX.repo, commit: BEPINEX.commit, license: BEPINEX.license }],
  },
  media: {},
  built_by: { author: UP.authors[0], authors: UP.authors, packaged_by: 'SIGF' },
  idea_by: UP.authors[0],
  built_at: '2026-10-05T00:00:00.000Z',
  ...card(UP.repo),
  notes: [
    'You need both games on Steam: Elden Ring (exe 2.7.1.0) and ULTRAKILL. Windows only, offline only. 16 GB of RAM stutters: two games run at once.',
    `Install me3 ${ME3.version} first with its me3_installer.exe (${ME3.page}).`,
    `To play, run launch-eldenkill.bat in the mashup's profile folder (%LOCALAPPDATA%\\SIGF\\profiles\\sigf-${ID}\\eldenring), not as admin. It starts Elden Ring through me3, offline with Easy Anti-Cheat off and Elden Ring's Arxan anti-tamper off (--disable-arxan, so the frame-rate and ultrawide patches hold), on its own save file EldenKill.sl2: your normal save is never touched. The Play button does not start it.`,
    'Elden Ring then starts ULTRAKILL by itself, hidden. If ULTRAKILL is not in C:\\Program Files (x86)\\Steam or D:\\SteamLibrary, set "ultrakill = <your ULTRAKILL folder>\\ULTRAKILL.exe" in eldenkill.ini in the same profile folder.',
    'BepInEx 5.4.23.5 and the EldenKill plugin are installed into the ULTRAKILL folder, the EldenKill files into the profile folder; Restore removes both. The EldenKill.sl2 save me3 writes is yours and stays.',
    'Release caveat: the author\'s v0.1.0 zip was published before the repo\'s only commit, so it cannot be tied to an exact commit (its eldenkill.me3 also differs from the repo\'s). SIGF scanned it with Windows Defender (clean) and reviewed the source; it is downloaded from the author\'s release as released.',
    'Work in progress (author): you may fall through the map, hit invisible walls or get stuck, and some enemies do not react to hits. Report bugs to the author on the upstream issue tracker.',
  ],
});

// No app fixture: it would commit the author's unlicensed zip into our repo.
emit({ slug: ID, version: VERSION, assets, fixtureAssets: null, make });
