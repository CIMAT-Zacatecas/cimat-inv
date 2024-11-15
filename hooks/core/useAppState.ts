import { useEffect, useRef, useCallback } from "react";
import { AppState, Platform } from "react-native";
import { focusManager, onlineManager } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import { useFocusEffect } from "expo-router";

export function useOnlineState() {
  useEffect(() => {
    // Setup network status monitoring
    const unsubscribe = NetInfo.addEventListener((state) => {
      onlineManager.setOnline(!!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Setup app state monitoring
    const subscription = AppState.addEventListener("change", (status) => {
      if (Platform.OS !== "web") {
        focusManager.setFocused(status === "active");
      }
    });

    return () => subscription.remove();
  }, []);
}

export function useAppFocus<T>(refetch: () => Promise<T>) {
  const firstTimeRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch]),
  );
}
