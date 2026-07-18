# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into azizbecha.dev, an Astro personal blog and portfolio site using View Transitions (ClientRouter). A `posthog.astro` initialization component was created and injected into the shared `BaseHead.astro` component so that PostHog loads on every page with a stack-overflow guard for soft navigation. Eight custom events were instrumented across five files, covering blog reading, content sharing, search engagement, and contact outreach.

| Event | Description | File |
|-------|-------------|------|
| `blog_post_viewed` | Fired when a user views a blog post, with post metadata as properties. | `src/layouts/BlogPost.astro` |
| `post_link_copied` | Fired when a user copies the current blog post URL via the copy-link button. | `src/components/ShareButtons.astro` |
| `post_shared` | Fired when a user shares the current blog post via the native share API. | `src/components/ShareButtons.astro` |
| `npx_command_copied` | Fired when a user copies the `npx azizbecha` command from the footer. | `src/components/Footer.astro` |
| `contact_channel_clicked` | Fired when a user clicks a contact channel link (email, GitHub, X, LinkedIn). | `src/pages/contact.astro` |
| `search_opened` | Fired when a user opens the search dialog via button click or keyboard shortcut. | `src/components/SearchDialog.astro` |
| `search_completed` | Fired when a search query returns results, with the query and result count. | `src/components/SearchDialog.astro` |
| `search_result_clicked` | Fired when a user clicks a search result, with the query and selected result title. | `src/components/SearchDialog.astro` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics (wizard)](https://us.posthog.com/project/518479/dashboard/1869587)
- **Blog post views over time**: [View insight](https://us.posthog.com/project/518479/insights/41UUejQV)
- **Top posts by views**: [View insight](https://us.posthog.com/project/518479/insights/Df1puAKE)
- **Content sharing funnel**: [View insight](https://us.posthog.com/project/518479/insights/z1IUZWp7)
- **Search engagement**: [View insight](https://us.posthog.com/project/518479/insights/dvn0MseK)
- **Contact channel clicks**: [View insight](https://us.posthog.com/project/518479/insights/a9fOQ416)

## Verify before merging

- [ ] Run a full production build (`pnpm build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
