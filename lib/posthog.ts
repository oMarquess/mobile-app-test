import PostHog from "posthog-react-native";

const apiKey = process.env.EXPO_PUBLIC_POSTHOG_API_KEY;
const host = process.env.EXPO_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export const posthog = new PostHog(apiKey ?? "placeholder_key", {
  host,
  disabled: !apiKey,
  captureAppLifecycleEvents: true,
  flushAt: 20,
  flushInterval: 10000,
});
