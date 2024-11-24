import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

type propType = {
  text: string;
  handlePress: () => void;
  isLoading?: boolean;
  containerStyle?: string;
  textStyle?: string;
};
const CustomButton = ({
  text,
  handlePress,
  isLoading,
  containerStyle,
  textStyle,
}: propType) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={handlePress}
      activeOpacity={0.5}
      className={`bg-secondary p-3 rounded-xl w-[100%] justify-center items-center mt-10 flex-row ${
        isLoading ? "opacity-50" : ""
      } ${containerStyle}`}
    >
      <Text className={`text-lg font-psemibold ${textStyle}`}>{text}</Text>
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          size="small"
          color="#fff"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
