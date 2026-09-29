# egpt — DeSciX SSG Podcast Server (the egpt app's podcast microservice)

Control-plane microservice that publishes podcasts to Apple Podcasts (and any RSS
client) for the DeSciX SSG content pipeline. Two-plane design: this service manages
show/episode state (in its own KB via the `app_records` record store) and regenerates
the static RSS 2.0 / iTunes `feed.xml` (+ audio enclosures + cover art) onto the
public GCS site plane that Apple polls. The service is never in Apple's request path.

## Commands

- **podcast_create_show** — Register/Update a podcast show's channel metadata (title,
  author, iTunes category, language, explicit flag, cover image, owner email). Validates
  the Apple-required channel fields. One show = one RSS feed at `/{app}/{show}/feed.xml`.

- **podcast_publish_episode** — Publish an episode: loudness-normalize + transcode the
  audio, embed ID3 (cover art + chapters), compute the enclosure byte length + duration,
  upload the enclosure, persist episode state, and regenerate + publish the feed.

- **podcast_unpublish_episode** — Remove an episode by guid and regenerate the feed.

- **podcast_list_episodes** — List a show's episodes and the live feed URL.

- **podcast_regenerate_feed** — Idempotent rebuild of a show's `feed.xml` from stored
  episode state, then republish.

- **podcast_validate_feed** — Dry-run Apple-compliance check of a show's feed (RSS 2.0 +
  iTunes namespace, square 1400–3000px cover, enclosure/guid/pubDate/duration, etc.).

## Use when

You want to publish DeSciX SSG audio (e.g. the 18.313x deep-dives) to Apple Podcasts,
manage podcast shows/episodes, or generate/validate a podcast RSS feed.
