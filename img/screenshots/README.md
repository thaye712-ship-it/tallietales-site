# Screenshots

**Nothing is here yet, and `android.html` / `iphone.html` do not reference this
folder.** The gallery markup for both pages was written and then lifted back out
so the pages could go live without broken images. Putting it back is the whole
of tomorrow's job.

## Restoring the galleries

The markup is intact in commit **85aa80b**, captions and all:

```sh
git show 85aa80b -- android.html iphone.html
```

Each page had one `<section class="reveal">` headed `<h2>The screens</h2>`,
holding a `.shots` grid of `<figure class="shot">` and a closing
`<p class="fineprint">`. Paste the section back in where it was — directly after
the hero — and drop the files in beside it. The `.shots` styles are already in
`style.css` and were left there.

## The files, and where they come from

Google Drive, **App Information** — the Android set under `Screenshots v1.0/`,
the iPhone set in its own folder. Keep the Drive names unchanged; the restored
markup uses them exactly.

    android/   01-welcome.png  03-new-pile.png  05-pile-list.png
               06-pile-record.png  07-drive-graph.png  10-export.png
               12-settings.png

    iphone/    iphone-project-wdc-table.png  iphone-structure-structures-view.png
               iphone-structure-table-view.png  iphone-substructure-abutment1.png
               iphone-substructure-abutment1-table.png  iphone-new-pile-pile-tab.png
               iphone-new-pile-drive-hammer.png  iphone-hammer-picker-ice.png
               iphone-drive-graph-a1-4.png

Drive is not reachable from the build container — the environment's network
policy denies it — so these have to arrive either by allowing `drive.google.com`
in that policy, or by being added to this repository directly.

## Three things to settle while doing it

- **The `<img>` tags carry no `width`/`height`.** Nobody has confirmed the pixel
  dimensions of either set, and a wrong pair locks the wrong aspect ratio and
  squashes the capture. Measure the files and add them — it stops the page
  jumping as the images load.
- **Two Android screens are missing.** The Drive folder's own README describes
  `04-recorder.png` and `11-instant.png`, but neither is in the folder. The
  recorder is the app's signature screen and the one the Android page most wants.
- **Check every capture before publishing** for a real job number, a real
  contractor, or a real inspector's name. The Android set is a made-up project on
  an emulator; the iPhone set has not been checked.

Also worth restoring the two ledes at the same time. Both were reworded to stop
promising screens that were not there — see the same commit for the originals.
