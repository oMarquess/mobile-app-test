import "../global.css";

import { ClerkProvider, useAuth, useUser } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { router, Stack, usePathname, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PostHogProvider, usePostHog } from "posthog-react-native";
import { useEffect, useRef } from "react";

import { posthog } from "@/lib/posthog";
import { useLanguageStore } from "@/store/useLanguageStore";
import { appFonts } from "@/theme/fonts";

const publishableKey =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <PostHogProvider client={posthog}>
      <ClerkProvider publishableKey={publishableKey!} tokenCache={tokenCache}>
        <RootLayoutInner />
      </ClerkProvider>
    </PostHogProvider>
  );
}

function RootLayoutInner() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const ph = usePostHog();
  const segments = useSegments();
  const pathname = usePathname();
  const previousPathname = useRef<string | undefined>(undefined);
  const [fontsLoaded, fontError] = useFonts(appFonts);
  const { selectedLanguageId, _hasHydrated } = useLanguageStore();

  const isReady = (fontsLoaded || !!fontError) && isLoaded && _hasHydrated;

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn && user) {
      ph.identify(user.id, {
        email: user.primaryEmailAddress?.emailAddress ?? null,
        name: user.fullName ?? user.firstName ?? null,
      });
    } else if (!isSignedIn) {
      ph.reset();
    }
  }, [isLoaded, isSignedIn, user, ph]);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      ph.screen(pathname, { previous_screen: previousPathname.current ?? null });
      previousPathname.current = pathname;
    }
  }, [pathname, ph]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const currentRoute = segments[0];
    const isPublicRoute =
      currentRoute === "onboarding" ||
      currentRoute === "sign-up" ||
      currentRoute === "sign-in";
    const isInTabs = currentRoute === "(tabs)";

    if (!isSignedIn && !isPublicRoute) {
      router.replace("/onboarding");
      return;
    }

    if (isSignedIn && isPublicRoute) {
      router.replace(selectedLanguageId ? "/" : "/language-select");
      return;
    }

    if (isSignedIn && !selectedLanguageId && currentRoute !== "language-select") {
      router.replace("/language-select");
      return;
    }

    if (isSignedIn && selectedLanguageId && !isInTabs && !isPublicRoute && currentRoute !== "language-select" && currentRoute !== "lesson") {
      router.replace("/");
    }
  }, [isReady, isSignedIn, selectedLanguageId, segments]);

  if (!isReady) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
