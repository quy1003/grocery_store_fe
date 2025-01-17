import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import FavoriteStyles from "@/src/styles/FavoriteStyles";

const CustomNotification = ({ isVisible, title, message, onCancel }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={FavoriteStyles.modalOverlay}>
        <View style={FavoriteStyles.modalContainer}>
          <Text style={FavoriteStyles.modalTitle}>{title}</Text>
          <Text style={FavoriteStyles.modalMessage}>{message}</Text>
          <View style={FavoriteStyles.modalButtons}>
            <TouchableOpacity
              style={FavoriteStyles.cancelButton}
              onPress={onCancel}
            >
              <Text style={FavoriteStyles.cancelButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomNotification;
