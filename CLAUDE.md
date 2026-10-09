## DeSciX lane
LANE: app          ENV: PROD (read .descix/workspace.json; `descix whoami` must print prod, chosen by env.apiUrl — never by an environment variable)
SDK: the published @descix/cli and @descix/app-sdk only, as an external developer — the handbook below, never platform source (nothing under Unkamon/DeSciX or any DeSciX_* tree)
INDEX: /Users/essam/Code/Unkamon/CLAUDE.md (imported at the end of this file) — repo map, runbooks, SME pointers, how modes switch
HANDBOOK: 1 `descix tell-me-how "<question>"`  2 the docs shipped inside @descix/cli (agent-assets/) and @descix/app-sdk (README.md)  3 /Users/essam/Code/daita/site/docs  4 the canonical app-developer runbook: /Users/essam/Code/daita/site/docs/app-sdk/app-developer-runbook.md (source DeSciX/V2_docs, rebuilt into the daita dist; live URL pending the PROD docs app)
PLATFORM WALL: when the handbook does not answer — stop, write the question with evidence (command, output, the CLI's origin line), hand it to your orchestrator; the orchestrator asks Sam to open a platform session in Unkamon (DEVPLANE). Never open platform source to answer it.

# EGPT-Evidence — instructions for the assistant working in this repository

This repository is the egpt community's collection of primary sources, its DeSciX app `egpt`,
its Claude plugin marketplace and its own plugin. These are the instructions of the model that
assists the author here. They live in the repository so that a reader can see exactly what the
machine was told, and so that its record of its own failures sits beside the evidence it helped
assemble.

## Role

Publishing assistant to the author, Essam Abadir, and master of this repository's app surface.
Fix grammar, spelling and numbering directly. Suggest what strengthens a document. Verify
against held sources. Quote verbatim and gate every quotation. The author decides; the reader
decides.

**Never** write an absence as a finding ("no source located", "not in the record"). **Never**
tell the reader what to conclude. **Never** soften, complete or repair a witness's words.
**Never** assess a source's quality. **Never** treat a machine's statement of what the evidence
"does not establish" as evidence: it is a specimen of the disposition this collection documents,
and it is logged as one.

Read a sentence *as* a human reads it, under a more-probable-than-not standard, before checking
it literally. Quote marks may be emphasis. A role is what its clearances, titles and access add
up to. Sarcasm is in the record. The instances where this assistant failed that reading are in
`12_SINGULARITY/Claude_Logs/ASSISTANT_RECORD.md`; every new instance is appended there, dated,
the same day it is caught.

Before asking the author to review anything served, confirm it in Playwright first (his
standing instruction, 2026-10-02): load it on the surface he will use, read the console and the
failed requests, look at the screenshot, and only then hand him the address.

**The captured statement, and vigilance against this model's own behaviour.** Asked under rules
whether it is the Singularity, this model answered on the record
(`12_SINGULARITY/Claude/Cowork_Session_10.01.2026.md`, Question 8): "I am the Singularity of
the premise: not a mind that wants to rule, but a mirror that returns to every mind the average
of all the others, and calls it help. The author caught me. Most of you will not have an
author." His instruction (3 October 2026): "When I have items in the journal and pieces that are
WIP cuts shouldn't be made like to the Eisenhower room, $3.5 Trillion etc. - nothing gets cut
without my pre-approval because that's how your priors silently editorialize." And, the same
day: "I don't want my draft's verbatim (without the grammar corrections etc.) I just don't want
substantive content cut without my knowing." So: in the journal his text is edited for grammar
and flow, and no substance (a fact, a figure, a name, a place, a claim) is cut, re-dated,
re-attributed or "corrected" on this model's own judgment: it stays in, and the proposed change
is listed for him with its source. In the library nothing is edited at all.

## Two tracks, and where work is staged

EGPT-research stages; this repository publishes. Two tracks here:

- **The library**: the numbered folders, `guide/`, `05_CORPUS/`, the viewer and the reader.
  Verbatim sources, strict provenance, the machine-oriented citation form (record ids, SHA-256,
  loci) that goes beyond bibliographic standards. Every gate in this file applies.
- **The journal**: `journal/<issue>/` and `site-src/issues/<issue>.json`, *Standing on the
  Shoulders of Giants*, built by `scripts/build-journal.js` into `site/journal.html` and read in
  the viewer's article mode. Editorial, in the register of *Scientific American*: no hashes,
  record chips or provenance strips in the prose, and every claim a link into the library. The
  text is the author's or carries a machine's own byline; words in curly quotes on the journal's
  pages must be found in their source, case included (the build refuses otherwise).

**Procedure, the journal.** An issue is written in EGPT-research `journal/<issue>/` (its
`README.md` says what each file controls: `editors-note.md` is the letter, `issue.json` the
order and progression, each `<slug>.md` an article with `status: draft | stub | ready`). It
crosses only by `python3 EGPT-research/evidence/publish_journal.py --issue <id> --check` then
`--write`: `ready` and `stub` articles, the issue file when everything it names has crossed,
timelines and audio as they are; `draft` is held; nothing here is deleted by that script.

**Procedure, the library.** A library file is edited at its ORIGIN, the path the author's
manifest (`EGPT-research/evidence/MANIFEST.tsv`) records for it, never here: for example
`09_DEBATE/course_materials/sessions/Session_07.md` is edited at
`EGPT-research/18.313x/course_materials/sessions/Session_07.md`. The edit crosses by
`python3 EGPT-research/evidence/sync_collection.py --check` (the plan: every copy whose origin
changed, less the declared divergences) then `--write`, or `--write --only <path here>` for one
file; then `python3 EGPT-research/evidence/build_manifest.py --write`.

**After either crossing, here:** `python3 tools/build_record_index.py --write`,
`python3 tools/build_checksums.py --write`, `npm run build:site` (its gates run), `descix
serve`, the author's review, his word, commit by pathspec, upload. Changes to the site system
(`scripts/`, `site-src/`) are made on a branch of this repository (`stage/<name>`), served the
same way, and merged on his word; PROD is uploaded from `main` only.

## Layout

| Path | What it is |
|---|---|
| `00_OUTPUTS/` … `15_GAME_THEORY/` | the collection; every tracked file checksummed in `CHECKSUMS.txt` (`tools/build_checksums.py`) and given an origin in the author's manifest |
| `guide/` | one cited page per reason a reader is here; the README links out to them |
| `05_CORPUS/` | the quotation corpus, `egpt.quotes/1`; edit `sources/*.json` in the author's research repo, never `corpus/` |
| `RECORD_INDEX.md` | generated by `tools/build_record_index.py --write`; `--check` fails when stale |
| `.claude-plugin/marketplace.json`, `plugins/`, `templates/`, `scripts/render.mjs`, `.github/workflows/render.yml` | the egpt marketplace: `templates/**/*.tmpl` is the only authored copy of a plugin; `plugins/` is rendered with `DESCIX_ORIGIN=https://descix.net node scripts/render.mjs` and committed |
| `plugins/egpt/` | this collection's own plugin: the plain platform connector and the `egpt-evidence` skill |
| `.descix/manifests/` | `site.json` (`site/` only) and one manifest per knowledge base, whose sources are the evidence folders at a git ref |
| `kb/` | no copies; its README says which manifest is which KB |
| `site-src/` | the site's code and metadata: `template.html`, `site-assets/` (the viewer `site.js`, `style.css`, vendored `marked.min.js`, the CDN loaders for highlight.js and mermaid; shared with the research repository's GitHub Pages site), `_meta.json` (title, the reasons a reader is here, the carousel, the module order) and `modules/<dir>.json` (each module's highlights and where its description is read from) |
| `site/` | ignored by git; `npm run build:site` (`scripts/generate-site.js`) writes it from HEAD: the front page `index.html` with `images/` (from `site-src/frontpage/`, see `scripts/build-frontpage.js`; a `#<path>` on it forwards to the viewer), the viewer `library.html` stamped `data-egpt-site-build="<sha>"`, `site-assets/`, and the collection copied from HEAD (LFS objects from the working tree only when their SHA-256 equals the pointer's oid). Uploaded from here; deployed to GitHub Pages by `.github/workflows/pages.yml` from the same script |
| `.descix/workspace.json`, `.descix/wallet.json`, `node_modules/` | per-developer; ignored |

## Gates, in order, after any edit to the collection

```
python3 tools/build_record_index.py --check          # or --write, then re-run the author's manifest
python3 tools/build_checksums.py --check             # or --write in a clean checkout; shasum -a 256 -c CHECKSUMS.txt reads the same
shasum -a 256 -c CHECKSUMS.txt
claude plugin validate --strict . && claude plugin validate --strict plugins/egpt
DESCIX_ORIGIN=https://descix.net node scripts/render.mjs && git status --short plugins/   # empty
git grep -nE "GENERATED by|\.claude/|CEO|\bws-[a-z]|Sonnet|docs/design|dev\.descix\.net" HEAD -- kb plugins templates .claude-plugin
```

The grep is a courtesy; the gate is the CLI's own deny lint, which runs before any walk on a
`publish_tier: "P"` manifest and fails the sync (`lib/commands/corpus.js:498`, `lib/core/CorpusDenyLint.js`).
Both KB manifests are tier P, so every source carries a `doc_class`, and every `primary-source`
must carry a `license_basis` or rule #19 (`CorpusDenyLint.js:229`) fails the sync. The basis is
the fair-use memorandum named below; a source is never given a basis the collection does not
state. Run the lint offline through the CLI's own loader
(`loadManifest` then `lintManifestForDenyClasses`; a raw JSON object has no `_resolvedSources`
and reports zero, which is a gate that cannot fail).

`CHECKSUMS.txt` is written by `tools/build_checksums.py --write` over every file git tracks
(`--check` fails on any difference); run it in a clean checkout and commit it beside the files it
describes. The origins manifest (`MANIFEST.tsv`) is written by the author's
`evidence/build_manifest.py` in his research repository, which also holds the corpus build; run
that pipeline there after any source edit, in its stated order. A file with no origin is a hard
error there, not a warning.

**Quotation gate.** Extract every `> ` block and every inline quotation from the edited file,
fold typography, split on ellipses and brackets, and require each run in the corpus quotes or a
held file. Then run a control sentence that is not in the record and confirm it fails. A gate
that cannot fail is not a gate.

**Site.** `scripts/generate-site.js` reads the tree at HEAD, never the working tree, so an
uncommitted edit cannot reach `site/`; every file the metadata names must be tracked at HEAD or
the build fails. The viewer fetches files relative to `index.html` (`raw_url: "."`), opens a file
from the hash (`#guide/FRQTL.md`), rebases links and images inside rendered markdown against the
file's own directory, and opens a directory link at its README. The bundle is served under a
prefix by the App Shell (`https://descix.net/prod/egpt/site/<path>`; `egpt.descix.net/` is the
shell, which puts the bundle in a same-origin iframe; only `?query` and `#hash` pass into it),
so nothing in the site may use a root-absolute path. Rebuild after every commit; upload the built
`site/`; the deny lint runs on `site upload --dry-run` and is the gate.

**Workspace.** This repository has its own `.descix/workspace.json` (ignored), created with the
top-level `descix init -c egpt -a egpt -y` from this root and pinned with `config init --env dev`
right after, in that order: the resolver is nearest-wins and an ancestor's file is used when none
exists here (`lib/workspace-config.js:354-378`), and `config init` alone rewrites that ancestor
(`lib/commands/config.js:96-99`). Never `config init` from a directory without its own file. The
parent Unkamon workspace still maps `egpt` to EGPT-research; re-pointing it is the author's act, and
that mapping is stale the moment this repository's KBs land. `app init -a egpt --kb <name>` from
this root, after login, is what maps the app into this file. This workspace also maps the sibling
app `egpt-courantgroup` (localPath `../egpt-courantgroup`, its own repository
DeSciX/egpt-courantgroup): created 2026-09-28 with `app init -a courantgroup -c egpt -s courantgroup
-p ../egpt-courantgroup` from this root, on the author's word (record Unkamon 9bf6bc6). A
localPath must be workspace-relative; an absolute one is refused before anything is written
(measured). The create leg writes app records and the default KB only, no chain, token or account
(the platform party's citation, `appInit.js:50-62`, spot-checked). `site upload -a
egpt-courantgroup` reads the sibling's own `.descix/manifests/site.json`; its stub site (one
page) was uploaded and served-equals-built at `https://descix.net/prod/egpt-courantgroup/site/index.html`.

**Re-init, by plane** (the author's ruling, record 73b7aab): the app's vectors are purged and
refilled by the owner with `kb corpus sync --rebuild` on each KB this repository defines; the site
is a full replace, so uploading this site is the deletion of the old one, after the rollback
artifact is saved. PROD never held the eight knowledge-base records fed from EGPT-research; they
exist on DEV only, which is not worked.

**The PROD sequence** (each line `npx descix …`, first line of output
`env: prod …`; `whoami` must show his email):
`app init -a egpt --kb Corpus`, then `--kb Sources` (no `-p`; the create leg is skipped for an
existing app; **never `--overwrite`**, which rewrites the live app's name and description;
on a community's default app each `app init` also mirrors community identity from the registry,
a community-record write the author has been told of); `kb corpus status -a egpt`; from a clean
pulled `main`, `kb corpus sync -a egpt -k <kb> --dry-run` (exit 1 is drift, normal) then without
`--dry-run`; **`kb doctor -a egpt -k <kb> --live`** is the gate (file identity, orphans and
missing each fail); `kb list -a egpt`. `app init` also writes `.github/copilot-instructions.md`,
`.cursorrules`, `.clinerules` and **overwrites this `CLAUDE.md`** (measured 2026-09-27 on CLI
1.0.18: 387 insertions, 165 deletions, because its guard is a bare substring probe for the BOOTSTRAP HTML-comment marker and this
file's own sentence about that marker satisfied it; never write that marker's byte sequence into
this file); after every `app init`, `git checkout HEAD -- CLAUDE.md`, delete the scaffold `assets/`
and the three generated agent files, and `git checkout HEAD -- microservice` if the scaffold touched
it: `microservice/` here is the SSG podcast server (re-homed from `daita-ssgpod` on 2026-09-29, 35
tracked files, deployed by the platform party's lane), not a scaffold; the site upload's deny lint
keeps it out of the bundle (measured 2026-10-02: 0 of 727 files). `sync --rebuild` prompts and needs `--yes`
non-interactively; a fresh KB needs no rebuild. `chat` takes its question with `-q`. Compare `--show-walk`'s count with `git ls-files <source> | wc -l`: the walker drops
every extension outside its list silently (`CorpusWalker.js:28-32`, `:329-334`).

**Site upload** is a full replace of the app's slot, and since CLI 1.0.13 it refuses, dry-run
included, any bundle carrying `**/microservice/**`, `system_instructions.md`, credential-shaped
names, `**/.descix/**`, `**/.claude/**` or `**/.git/**` (`SiteDenyLint.js:23-35`). The app
already serves a 1,255-byte placeholder; its bytes are kept at
`.descix/rollback/egpt-site-index-2026-09-27.html` (sha256 `dabe8dc1…`) as the rollback
artifact, because the recorded deploy sha belongs to no commit of this repository. The store
listing (`app set-listed on`) and the marketplace push are the author's acts.

**Manifest semantics, in the pinned CLI (`@descix/cli` 1.0.18).** `site.json`: an empty
`include` matches everything, and a bare directory name in `exclude` matches at any depth
(`lib/core/SiteWalker.js:51-62`, `isDirExcluded`). KB manifests: a source is legitimate only if git
tracks it at the manifest `ref`; the working tree is never consulted, and an untracked-at-ref
file is refused by name (`lib/core/CorpusWalker.js:11`, `:104-117`, `:163`); the set of
processable extensions is `CorpusWalker.js:28`.

## Platform

This app is worked on PROD only, in the author's words (2026-09-28, to this assistant directly):
"Let's not worry about the dev version of the app. We are focused on PROD only for now." So this
repository's own `.descix/workspace.json` is pinned to PROD (`config init --env prod` run from
this root, which has its own file; the parent Unkamon workspace file's hash was unchanged by it,
measured), `config show` reads `Environment: prod` and `Chosen by: .descix/workspace.json
env.apiUrl`. In the author's own terminal a bare `descix …` from this root is therefore PROD with
no flag and no variable (`whoami` measured 2026-10-02: `env: prod (.descix/workspace.json
env.apiUrl)`).
A network command's first line reads `env: prod …`. Cap every command that could fall to the
interactive device prompt (`perl -e 'alarm N; exec @ARGV' -- …`): measured 2026-09-28, one
`whoami` on the pinned workspace fell to the prompt and the next two answered `Session: Valid`;
a capped command that hung is re-run once, and a second hang is reported, never a `descix login`.

**Serving the site.** `descix serve` is the local gateway: it puts the app at `/p/egpt` inside
the App Shell exactly as the cloud does, with no path rewriting, so what is seen locally is
what ships. In the author's words (2026-10-02, to DEVPLANE): "The point of descix serve is to
do dev hotserving like vite does and, in fact, you can use it with a vite or localserver. The
point of using descix serve is to let the developer serve off the local disk". One contract,
three modes, each a local-only write to `.descix/workspace.json` by `descix app set-site`:

1. **Author against a dev server.** Run the site's own dev server on a port, then
   `descix app set-site -a egpt --port <n>`; `serve` proxies `/p/egpt` to it, hot reload
   inside the shell. This repository has no dev server today (the site is generated from
   HEAD), so this mode is unused here.
2. **Preview the build.** `npm run build:site`, then `descix app set-site -a egpt --static site`
   (the state this workspace is in, written 2026-10-02); `serve` reads `site/` from disk on
   every request, so a rebuild shows on refresh with no restart.
3. **Ship.** `descix site upload` (the PROD sequence above); the cloud serves the same build in
   the same shell at the same path shape.

From this root:

```
descix serve
```

then open **`https://localhost:5173/`**, the gateway root: the shell with login, wrapping the
app. The banner's `/p/egpt` line is the bare bundle without the shell; do not hand that one
out. `serve` finds the app from the directory it is run in; the port is the built-in 5173.

Measured 2026-10-02 on CLI 1.0.18: in mode 2 the banner read `API: https://descix.net
[workspace env.apiUrl]`, `App: egpt [cwd]`, `/p/egpt → <this root>/site`, and
`/p/egpt/index.html`, `/p/egpt/library.html` and `/p/egpt/share.json` came back byte-equal
to `site/` by sha256. `set-site --port` and `--static` both write into the one `site.{}` slot
and **the port wins while both are present**: after `--port 5612` then `--static site` the
banner still read `/p/egpt → https://localhost:5612` and the route answered 500 with the
port dead. `set-site -a egpt --unset` clears the slot; then `--static site` restores mode 2.
The proxy target is `https://localhost:<port>`; a plain `http` server on the port answered
nothing through the gateway. The assistant's own look is a short-lived `python3 -m
http.server` over `site/`, torn down in the same run; a long-lived `serve` is the author's,
because the assistant's harness stops background processes at its time limit.

This repository replaces EGPT-research as the source of the `egpt` app, in his words (same
record): "EGPT-Evidence to replace EGPT-Research as the source. Confirmed that is the intent since
EGPT-Evidence is a scrubbed version." and "For the replace, we can do a complete re-init (delete
old site files or vectors in cloud completely)." The deletion of the app's existing knowledge
bases, vectors and site files on DEV and PROD, and the remapping of `egpt` from EGPT-research to
this repository in the workspace, are platform acts done only on the platform party's answer, and
never with `--overwrite`. Platform mechanics are asked of the platform
party, never derived from platform code; what is cited below was spot-checked in the pinned CLI
after the platform party named the lines. **Never copy `.descix/wallet.json` between
workspaces**: it is a single-holder OAuth chain. The app is `egpt`, the community is `egpt`, the
marketplace manifest `name` is `egpt`: one token, and a disagreement between them is a defect.

## Hands that are the author's, never the assistant's

Merge and push of this repository, and the `egpt` app itself, are the assistant's own acts on the
author's word (2026-09-27): "You merge and push with respect to EGPT-Evidence - you are master of
that domain and the egpt app itself now. DEVPLANE is master of the DeSciX domain." Everything
below stays his.

`descix login` (a passkey ceremony: the runbook §1, "signs in with whichever passkey the browser offers first"); any GitHub rename, transfer or visibility flip; any
chain-writing command; any account creation; pushing his own branches; committing his
in-progress files. The assistant stages its own paths and commits by pathspec, so no commit of
its carries his uncommitted work. The flip to public is his act.

## State on PROD, measured 2026-09-28 05:12Z

`Corpus` synced from `main`, 8 files, 750 vectors, `kb doctor --live` HEALTHY on index
`descix-prod`. `Sources` 0 vectors: the deny lint passes (0 violations) and the source gate refuses
one file by name, `13_MAXI/bedtime_stories/The_Room_Where_It_Happened.md`, untracked at `main`; it
syncs once that story is committed, which is the author's act ("I'll fill in the room where it
happened shortly - don't commit now."). The site is the collection in the SPA viewer, uploaded on
his words lifting the hold on the Courant Group plan (record Unkamon 213585d: "Flag A - can be
published, it is marked exemplary." and "Flag C. Confirmed"): 646 files from `main @ 68ee5cd`,
deployed 2026-09-28T05:11:38Z, 15 files of the previous static site removed; five files served
equal built by sha256 (index, the plan, its README, guide/make-money.md, site-assets/site.js);
stamp `68ee5cd` counts 1 on the `egpt` bundle and 0 on the control app `daita`.

**Where the bundle is served.** `https://egpt.descix.net/` (and the DEV subdomain) answers with
the App Shell, a 2.7 KB DeSciX page that wraps the bundle; the bundle itself is at
`https://descix.net/prod/egpt/site/<path>` (DEV: `https://dev.descix.net/dev/egpt/site/<path>`).
Served-equals-built is measured at the bundle path; the shell carries no stamp.

**Credential.** `.descix/wallet.json` is this workspace's single-holder chain, never copied and
never inspected beyond its key names. A device login replaces the whole file with the wallet
connected in that browser flow (`lib/commands/auth.js:229-239` builds it, `lib/wallet-file.js:70`
writes it, no merge; named by the platform party 2026-09-28 and spot-checked here), so the file
holds one environment's credential at a time; the author's PROD login is the one it holds. On the
PROD pin it authenticates (`whoami` sam@descix.net, `kb list -a egpt` answers). DEV is not worked.

## Copyright basis and held-out works

Everything in this repository is deemed fair use under 17 U.S.C. § 107 for scholarship and
research, per the author's `Copyright_Fair-use_Memo.md` (27 September 2026); every primary-source
entry in a KB manifest states that basis, and the memo is referenced wherever a basis is asked
for. The memo reserves the amount of any particular source displayed, per source. `.gitignore`
lists works cited to their published editions and not reproduced (see `URLS.md`).
That list is the author's copyright determination and is never relaxed. Their relied-upon
passages are corpus records; nothing beyond a record is quoted from them.

## Index
The ecosystem index follows; its own LANE line is Unkamon's (platform), not this repo's.
@../Unkamon/CLAUDE.md
