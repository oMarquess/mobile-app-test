<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Lingua AI language learning app. The SDK (`posthog-react-native` v4.46.2) was already installed and `PostHogProvider` was already wired up in the root layout. The wizard added business-critical event tracking across the onboarding and authentication flows, fixed the PostHog client configuration (it was incorrectly disabled in development mode), wrote the correct token and host values to `.env`, and added automatic screen tracking for all Expo Router navigations.

| Event | Description | File |
|---|---|---|
| `get_started_tapped` | User taps Get Started on the onboarding welcome screen — top of conversion funnel | `app/onboarding.tsx` |
| `user_signed_up` | User successfully completes email sign-up with verification code | `components/auth-screen.tsx` |
| `user_signed_in` | User successfully signs in with email verification code | `components/auth-screen.tsx` |
| `google_sign_in_completed` | User authenticates via Google OAuth | `components/auth-screen.tsx` |
| `auth_error` | Authentication error with `mode`, `method`, and `error_message` properties | `components/auth-screen.tsx` |
| `language_selected` | User confirms chosen language with `language_id`, `language_name`, `is_first_selection` | `app/language-select.tsx` |

Additional automatic tracking:
- **Screen views** — every Expo Router navigation is tracked via `posthog.screen()` in `app/_layout.tsx`
- **User identification** — Clerk user ID, email, and name are sent to PostHog on sign-in via `posthog.identify()` (already present, preserved)
- **App lifecycle events** — Application Opened, Backgrounded, etc. via `captureAppLifecycleEvents: true`

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1648706)
- [Onboarding Funnel](/insights/LKAPkR2i) — Get Started → Signed Up → Language Selected (conversion funnel)
- [New Sign-ups Over Time](/insights/WtRLQXi9) — Email sign-ups vs Google sign-ins per day
- [Auth Errors Over Time](/insights/i0iCBZjc) — Auth failures broken down by sign-up vs sign-in mode
- [Language Selections](/insights/31yIM0DM) — Which languages users choose, broken down by language name
- [Sign-in vs Sign-up Conversion](/insights/qf89WS5X) — Daily unique users at each onboarding stage

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-expo/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
