// app/_layout.tsx
import FontAwesome from "@expo/vector-icons/FontAwesome";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Slot, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { supabase } from "../lib/supabase";
import { useUserStore } from "../store/userStore";
import type { User as SupabaseAuthUser } from "@supabase/supabase-js";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(auth)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const colorScheme = useColorScheme();

  const [fontsLoaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const fetchAndSetUser = async (authUser: SupabaseAuthUser) => {
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        return;
      }

      const user = { authUser, profile: profileData };
      setUser(user);
    };

    async function prepare() {
      try {
        // Initialize session
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          await fetchAndSetUser(data.session.user);
        } else {
          clearUser();
        }

        // Set up auth state change listener
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === "SIGNED_IN" && session) {
            await fetchAndSetUser(session.user);
          } else if (event === "SIGNED_OUT") {
            clearUser();
          }

          if (event === "PASSWORD_RECOVERY") {
            router.push("/reset-password");
          }
        });

        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }
    }

    if (fontsLoaded) {
      prepare();
    }
  }, [fontsLoaded, setUser, clearUser]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="system">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
