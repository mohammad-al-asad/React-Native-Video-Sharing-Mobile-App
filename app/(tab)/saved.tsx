import { View, Text } from "react-native";
import React from "react";
import EmptyState from "@/Components/EmptyState";
import { SafeAreaView } from "react-native-safe-area-context";

const Saved = () => {
  return (
    <SafeAreaView className="h-full bg-primary ">
      <Text className="font-psemibold text-gray-100 text-2xl mt-8 ml-6">
        Saved Videos
      </Text>
      <View className="h-full justify-center">
      <EmptyState
        title="No video is saved"
        subtitle="Save a video to view here"
      />
      </View>
    </SafeAreaView>
  );
};

export default Saved;
