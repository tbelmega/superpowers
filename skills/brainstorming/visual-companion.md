# Visual Companion Guide

Use the browser only when would the user understand this better by seeing it than reading it?

## Use The Browser For

- UI layouts, mockups, and visual comparisons
- Architecture or flow diagrams
- Questions about look, feel, spacing, or visual hierarchy

## Stay In The Terminal For

- Scope or requirements questions
- Conceptual trade-offs
- API, data-model, or architecture decisions described in words

## Session Setup

- Start the server with `scripts/start-server.sh --project-dir /path/to/project`.
- Save the returned `screen_dir` and share the URL with the user.
- If the server is restarted or launched in the background, read `.server-info` inside `screen_dir` to recover the URL.
- In remote setups, use `--host` and `--url-host` as needed.

## Loop

1. Make sure the server is still alive.
2. Write a new HTML file in `screen_dir`; do not reuse filenames.
3. Tell the user what is on screen and remind them of the URL.
4. On the next turn, Read `$SCREEN_DIR/.events` and combine that with the user's terminal response.
5. Push a waiting screen when returning to terminal-only discussion.

Write content fragments by default; full HTML documents are only needed when you require total control.
