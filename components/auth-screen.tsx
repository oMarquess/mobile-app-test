import { useOAuth, useSignIn, useSignUp } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { usePostHog } from "posthog-react-native";
import { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/theme";

WebBrowser.maybeCompleteAuthSession();

type AuthMode = "sign-up" | "sign-in";

type AuthScreenProps = {
  mode: AuthMode;
};

const codeLength = 6;

export function AuthScreen({ mode }: AuthScreenProps) {
  const { signIn, fetchStatus: signInFetchStatus } = useSignIn();
  const { signUp, fetchStatus: signUpFetchStatus } = useSignUp();
  const posthog = usePostHog();
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const codeInputRef = useRef<TextInput>(null);
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  async function handleGoogleSignIn() {
    try {
      const { createdSessionId, setActive } = await startGoogleOAuthFlow();
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        posthog.capture("google_sign_in_completed", { mode });
        router.replace("/");
      }
    } catch (error) {
      const message = getClerkErrorMessage(error);
      posthog.capture("auth_error", { mode, method: "google", error_message: message });
      setErrorMessage(message);
    }
  }

  const isSignUp = mode === "sign-up";
  const fetchStatus = isSignUp ? signUpFetchStatus : signInFetchStatus;
  const title = isSignUp ? "Create your account" : "Welcome back";
  const subtitle = isSignUp
    ? "Start your language journey today ✨"
    : "Continue your language journey today ✨";
  const buttonLabel = isSignUp ? "Sign Up" : "Sign In";
  const footerCopy = isSignUp
    ? "Already have an account?"
    : "Don’t have an account?";
  const footerAction = isSignUp ? "Log in" : "Sign up";
  const footerHref = isSignUp ? "/sign-in" : "/sign-up";

  function showVerification() {
    setVerificationCode("");
    setIsVerificationVisible(true);
    requestAnimationFrame(() => codeInputRef.current?.focus());
  }

  async function handleSubmit() {
    if (isSubmitting) {
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        if (!signUp || !emailAddress || !password) {
          return;
        }

        const { error: signUpError } = await signUp.password({
          emailAddress,
          password,
        });

        if (signUpError) {
          const message = getClerkErrorMessage(signUpError);
          posthog.capture("auth_error", { mode: "sign-up", method: "email", error_message: message });
          setErrorMessage(message);
          return;
        }

        const { error: emailCodeError } =
          await signUp.verifications.sendEmailCode();

        if (emailCodeError) {
          const message = getClerkErrorMessage(emailCodeError);
          posthog.capture("auth_error", { mode: "sign-up", method: "email", error_message: message });
          setErrorMessage(message);
          return;
        }

        showVerification();
        return;
      }

      if (!signIn || !emailAddress) {
        return;
      }

      const { error: signInError } = await signIn.create({
        identifier: emailAddress,
      });

      if (signInError) {
        const message = getClerkErrorMessage(signInError);
        posthog.capture("auth_error", { mode: "sign-in", method: "email", error_message: message });
        setErrorMessage(message);
        return;
      }

      const { error: emailCodeError } = await signIn.emailCode.sendCode();

      if (emailCodeError) {
        const message = getClerkErrorMessage(emailCodeError);
        posthog.capture("auth_error", { mode: "sign-in", method: "email", error_message: message });
        setErrorMessage(message);
        return;
      }

      showVerification();
    } catch (error) {
      const message = getClerkErrorMessage(error);
      posthog.capture("auth_error", { mode, method: "email", error_message: message });
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCodeChange(value: string) {
    const nextCode = value.replace(/\D/g, "").slice(0, codeLength);

    setVerificationCode(nextCode);

    if (nextCode.length === codeLength) {
      await verifyCode(nextCode);
    }
  }

  async function verifyCode(code: string) {
    if (isSubmitting) {
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        if (!signUp) {
          return;
        }

        const { error: verifyError } =
          await signUp.verifications.verifyEmailCode({
            code,
          });

        if (verifyError) {
          setVerificationCode("");
          setErrorMessage(getClerkErrorMessage(verifyError));
          requestAnimationFrame(() => codeInputRef.current?.focus());
          return;
        }

        if (signUp.status === "complete") {
          const { error: finalizeError } = await signUp.finalize();

          if (finalizeError) {
            setErrorMessage(getClerkErrorMessage(finalizeError));
            return;
          }

          posthog.capture("user_signed_up", { method: "email" });
          setIsVerificationVisible(false);
          router.replace("/");
          return;
        }

        setErrorMessage("Sign up verification is not complete yet.");
        return;
      }

      if (!signIn) {
        return;
      }

      const { error: verifyError } = await signIn.emailCode.verifyCode({
        code,
      });

      if (verifyError) {
        setVerificationCode("");
        const message = getClerkErrorMessage(verifyError);
        posthog.capture("auth_error", { mode: "sign-in", method: "email", error_message: message });
        setErrorMessage(message);
        requestAnimationFrame(() => codeInputRef.current?.focus());
        return;
      }

      if (signIn.status === "complete") {
        const { error: finalizeError } = await signIn.finalize();

        if (finalizeError) {
          setErrorMessage(getClerkErrorMessage(finalizeError));
          return;
        }

        posthog.capture("user_signed_in", { method: "email" });
        setIsVerificationVisible(false);
        router.replace("/");
        return;
      }

      setErrorMessage("Sign in verification is not complete yet.");
    } catch (error) {
      setVerificationCode("");
      const message = getClerkErrorMessage(error);
      posthog.capture("auth_error", { mode, method: "email", error_message: message });
      setErrorMessage(message);
      requestAnimationFrame(() => codeInputRef.current?.focus());
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="flex-1 px-8 pb-9 pt-4">
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={30} color={colors.textPrimary} />
        </Pressable>

        <View className="mt-8">
          <Text className="font-poppins-bold text-[30px] leading-[38px] tracking-[-0.8px] text-text-primary">
            {title}
          </Text>
          <Text className="mt-3 font-poppins-regular text-[18px] leading-[26px] text-text-secondary">
            {subtitle}
          </Text>
        </View>

        <View className="mt-6 h-[126px] items-center overflow-hidden">
          <Image
            source={images.mascotAuth}
            contentFit="contain"
            style={{ width: 240, height: 170 }}
          />
        </View>

        <View className="gap-3">
          <View className="h-[82px] justify-center rounded-[16px] border border-border bg-white px-5">
            <Text className="font-poppins-medium text-sm text-text-secondary">
              Email
            </Text>
            <TextInput
              value={emailAddress}
              onChangeText={setEmailAddress}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="alex@gmail.com"
              placeholderTextColor={colors.textPrimary}
              style={styles.input}
            />
          </View>

          {isSignUp ? (
            <View className="h-[82px] flex-row items-center rounded-[16px] border border-border bg-white px-5">
              <View className="flex-1 justify-center">
                <Text className="font-poppins-medium text-sm text-text-secondary">
                  Password
                </Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder="••••••••••"
                  placeholderTextColor={colors.textPrimary}
                  style={styles.input}
                />
              </View>
              <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={10}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={25} color={colors.textSecondary} />
              </Pressable>
            </View>
          ) : null}
        </View>

        {errorMessage ? (
          <Text className="mt-3 font-poppins-regular text-[13px] leading-[20px] text-error">
            {errorMessage}
          </Text>
        ) : null}

        <Pressable
          onPress={handleSubmit}
          disabled={isSubmitting || fetchStatus === "fetching"}
          style={styles.primaryButton}
        >
          <Text className="font-poppins-semibold text-[20px] text-white">
            {buttonLabel}
          </Text>
        </Pressable>

        <View className="mt-8 flex-row items-center gap-4">
          <View className="h-px flex-1 bg-border" />
          <Text className="font-poppins-medium text-base text-text-secondary">
            or continue with
          </Text>
          <View className="h-px flex-1 bg-border" />
        </View>

        <View className="mt-5 gap-3">
          <SocialButton label="Continue with Google" icon="logo-google" iconType="ionicon" onPress={handleGoogleSignIn} />
          <SocialButton label="Continue with Facebook" icon="logo-facebook" iconType="ionicon" />
          <SocialButton label="Continue with Apple" icon="logo-apple" iconType="ionicon" />
        </View>

        <View className="mt-auto pt-6 flex-row justify-center gap-1">
          <Text className="font-poppins-regular text-base text-text-secondary">
            {footerCopy}
          </Text>
          <Link href={footerHref} asChild>
            <Text className="font-poppins-semibold text-base text-lingua-purple">
              {footerAction}
            </Text>
          </Link>
        </View>
      </View>

      <VerificationModal
        visible={isVerificationVisible}
        code={verificationCode}
        inputRef={codeInputRef}
        onChangeCode={handleCodeChange}
        errorMessage={errorMessage}
        onClose={() => setIsVerificationVisible(false)}
      />
    </SafeAreaView>
  );
}

type SocialButtonProps = {
  label: string;
  icon: string;
  iconType: "ionicon";
  onPress?: () => void;
};

function SocialButton({ label, icon, onPress }: SocialButtonProps) {
  const iconColor = label.includes("Google")
    ? "#4285F4"
    : label.includes("Facebook")
      ? "#1877F2"
      : colors.textPrimary;

  return (
    <Pressable style={styles.socialButton} onPress={onPress}>
      <View style={styles.socialIconContainer}>
        <Ionicons name={icon as any} size={24} color={iconColor} />
      </View>
      <Text className="font-poppins-medium text-[17px] text-text-primary">
        {label}
      </Text>
    </Pressable>
  );
}

type VerificationModalProps = {
  visible: boolean;
  code: string;
  inputRef: React.RefObject<TextInput | null>;
  onChangeCode: (value: string) => void;
  errorMessage: string;
  onClose: () => void;
};

function VerificationModal({
  visible,
  code,
  inputRef,
  onChangeCode,
  errorMessage,
  onClose,
}: VerificationModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} onShow={() => inputRef.current?.focus()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalKeyboardView}
      >
        <Pressable style={styles.modalOverlay} onPress={onClose}>
          <Pressable style={styles.modalCard}>
            <Text className="text-center font-poppins-bold text-[24px] leading-[31px] text-text-primary">
              Check your email
            </Text>
            <Text className="mt-3 text-center font-poppins-regular text-[14px] leading-[23px] text-text-secondary">
              You’ve received an email. Enter the 6-digit verification code to continue.
            </Text>

            <Pressable
              onPress={() => inputRef.current?.focus()}
              className="mt-7 flex-row justify-center gap-2"
            >
              {Array.from({ length: codeLength }).map((_, index) => (
                <View
                  key={index}
                  className="h-12 w-10 items-center justify-center rounded-[12px] border border-border bg-surface"
                >
                  <Text className="font-poppins-semibold text-[20px] text-text-primary">
                    {code[index] ?? ""}
                  </Text>
                </View>
              ))}
            </Pressable>

            {errorMessage ? (
              <Text className="mt-4 text-center font-poppins-regular text-[13px] leading-[20px] text-error">
                {errorMessage}
              </Text>
            ) : null}

            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={onChangeCode}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              maxLength={codeLength}
              style={styles.hiddenCodeInput}
            />
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    alignSelf: "flex-start",
  },
  input: {
    color: colors.textPrimary,
    fontFamily: "Poppins-Regular",
    fontSize: 17,
    lineHeight: 24,
    marginTop: 7,
    padding: 0,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.linguaPurple,
    borderRadius: 13,
    height: 62,
    justifyContent: "center",
    marginTop: 20,
  },
  socialButton: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    height: 56,
    justifyContent: "center",
    position: "relative",
  },
  modalKeyboardView: {
    flex: 1,
  },
  modalOverlay: {
    alignItems: "center",
    backgroundColor: "rgba(13, 19, 43, 0.35)",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: colors.background,
    borderRadius: 24,
    padding: 24,
    width: "100%",
  },
  hiddenCodeInput: {
    position: "absolute",
    opacity: 0,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  socialIconContainer: {
    position: "absolute",
    left: 24,
  },
});

function getClerkErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "errors" in error &&
    Array.isArray(error.errors) &&
    error.errors[0] &&
    typeof error.errors[0] === "object" &&
    "message" in error.errors[0] &&
    typeof error.errors[0].message === "string"
  ) {
    return error.errors[0].message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
