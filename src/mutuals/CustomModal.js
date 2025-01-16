import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import FavoriteStyles from "@/src/styles/FavoriteStyles";

const CustomModal = ({ isVisible, title, message, onCancel, onConfirm }) => {
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
              <Text style={FavoriteStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={FavoriteStyles.deleteButton}
              onPress={onConfirm}
            >
              <Text style={FavoriteStyles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
