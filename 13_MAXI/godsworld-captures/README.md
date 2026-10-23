# Gods World loop captures (shipped build DeSciX/egpt-godsworld main 3867a5d6)

Every capture was taken from a clean extract (`git archive 3867a5d6`) of the public main, served on 127.0.0.1:5671. The files it used are byte-identical to the ones PROD serves under https://egpt-godsworld.descix.net/prod/egpt-godsworld/site/ (sha256 compared on app.html, index.html, app-assets/maxi-lab.js, and the Record's turns/01, turns/08, settled.png, clip-03.mp4, project/sketch.js, lab.json). The stamp strip under each image is part of the capture.

| # | Beat | File | On screen | Code commit | Proposed collection path |
|---|---|---|---|---|---|
| 1 | (a) scene as observed | dse-tunnel-rebuild-3867a5d6-1.png | Maxi's Lab (site/app.html?scene=dse-tunnel-rebuild&mode=3d&intro=0): the registry scene "Double Slit (Tunnel, symmetric)", 3D, renderer three, paused at tick 1248, seed 42. The conversation panel is empty (not signed in). The Info panel shows the scene's card ("Double slit"). | 3867a5d6 | 13_MAXI/godsworld-captures/dse-tunnel-rebuild-3867a5d6-1.png |
| 2 | (b) Maxi's statement | dse-tunnel-rebuild-3867a5d6-2.png | The served file site/memories/mm-dse-tunnel-rebuild-olc2/turns/01-designer.answer.md in full: the Designer role's answer to the outline "imagine the 3D double slit with the detector screen moved 40 pixels farther from the slit wall", ending with its json:plan block (one change: screen centre to [365, 200, 0]; hands setCamera, dragTo; prediction). Record run mmolc2, local brain. | 3867a5d6 (file bytes unchanged since 527989bb) | 13_MAXI/godsworld-captures/dse-tunnel-rebuild-3867a5d6-2.png |
| 3 | (c) the scene program after Maxi's change | dse-tunnel-rebuild-3867a5d6-3.png | Maxi's Lab running the Record's project/sketch.js (the project at stop, `screen` rect [355, 0, 20, 400]), opened through MaxiLab.openSketch with renderer three and set to the Builder's recorded camera pose (azimuth 180, elevation 0, distance 520). Paused at tick 1359, seed 42. The Scene code panel is scrolled to the `screen:` line. | 3867a5d6 (sketch bytes unchanged since 527989bb) | 13_MAXI/godsworld-captures/dse-tunnel-rebuild-3867a5d6-3.png |
| 4 | (d) observation | dse-tunnel-rebuild-527989bb-4.png | The served still site/memories/mm-dse-tunnel-rebuild-olc2/settled.png at 600×400: the last frame of the hand-back clip clip-03.mp4 (dragTo, ticks 41826–42126), with the plate at rest at its new place. | 527989bb (the first public commit that carries the still; served unchanged at 3867a5d6) | 13_MAXI/godsworld-captures/dse-tunnel-rebuild-527989bb-4.png |
| 5 | (d) comparison back to observation | dse-tunnel-rebuild-3867a5d6-5.png | The served file site/memories/mm-dse-tunnel-rebuild-olc2/turns/08-owl.answer.md in full: the Owl role's account of the 8 frames of clip-03.mp4, "THE OUTLINE, PART BY PART", "THE PREDICTION, ITEM BY ITEM", and its json:verdict ("approve"). | 3867a5d6 (file bytes unchanged since 527989bb) | 13_MAXI/godsworld-captures/dse-tunnel-rebuild-3867a5d6-5.png |

Stamp fields per capture: scene (id#mode and label), seed, tick, commit and capture time (UTC). For 1 and 3, the scene, seed and tick were read from the running page (MaxiLab.inventory, runner seed) when the screenshot was taken. For 2, 4 and 5 they come from the Record's own lab.json/record.json: run mmolc2, record-01, ticks 21965–42126 (the hand-back clip covers 41826–42126). The Record does not store a seed, and the stamp says so.

## The app

Public URL: https://egpt-godsworld.descix.net/

One-line statement, verbatim from site/app.html line 8 (the `<meta name="description">` content) in the public checkout at 3867a5d6:

> Maxi's Lab: the FRQTL scene with Maxi's conversation beside it. Say what to imagine; Maxi builds it from the frqtl SDK and looks at it through his own eyes.
