// components/ui/Toast.tsx
import { CheckCircle, XCircle } from "lucide-react-native"; // make sure to install lucide-react-native
import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { useToastStore } from "../../store/useToastStore";

export function Toast() {
  const { open, success, message, hideToast } = useToastStore();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (open) {
      // fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        // fade out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => hideToast());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [open, hideToast, fadeAnim]);

  if (!open) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: success ? "#4ade80" : "#f87171", // lighter green and red
          opacity: fadeAnim,
        },
      ]}
    >
      {success ? <CheckCircle size={20} color="#fff" /> : <XCircle size={20} color="#fff" />}
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    zIndex: 9999,
  },
  message: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
  },
});
