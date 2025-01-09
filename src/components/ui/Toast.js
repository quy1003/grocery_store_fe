import React, { useEffect } from "react";
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";

const Toast = ({ message, type, visible, onHide }) => {
  const translateY = new Animated.Value(-100);

  useEffect(() => {
    if (visible) {
      // Slide in
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        speed: 12,
        bounciness: 5,
      }).start();

      // Auto hide after 3 seconds
      const timer = setTimeout(() => {
        hide();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hide = () => {
    Animated.timing(translateY, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onHide();
    });
  };

  const getIcon = () => {
    return type === "success" ? "✓" : "✕";
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY }] },
        type === "success" ? styles.successContainer : styles.errorContainer,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          type === "success" ? styles.successIcon : styles.errorIcon,
        ]}
      >
        <Text style={styles.icon}>{getIcon()}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    marginTop: Platform.OS === "ios" ? 70 : 36,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  successContainer: {
    borderLeftWidth: 4,
    borderLeftColor: "#32a852",
  },
  errorContainer: {
    borderLeftWidth: 4,
    borderLeftColor: "#dc3545",
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  successIcon: {
    backgroundColor: "#32a852",
  },
  errorIcon: {
    backgroundColor: "#dc3545",
  },
  icon: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  message: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
});

export default Toast;
