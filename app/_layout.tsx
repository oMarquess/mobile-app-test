import "../global.css";

import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { router, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

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
    <ClerkProvider publishableKey={publishableKey!} tokenCache={tokenCache}>
      <RootLayoutInner />
    </ClerkProvider>
  );
}

function RootLayoutInner() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const [fontsLoaded, fontError] = useFonts(appFonts);

  const isReady = (fontsLoaded || !!fontError) && isLoaded;

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const currentRoute = segments[0];
    const isPublicRoute =
      currentRoute === "onboarding" ||
      currentRoute === "sign-up" ||
      currentRoute === "sign-in";

    if (!isSignedIn && !isPublicRoute) {
      router.replace("/onboarding");
      return;
    }

    if (isSignedIn && isPublicRoute) {
      router.replace("/");
    }
  }, [isReady, isSignedIn, segments]);

  if (!isReady) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
