import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";
import React from "react";

const EmptyState = ({ title, subtitle }:{ title:string, subtitle:string }) => {
  return (
    <View className="justify-start items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[216px]"
      />

      <Text className="text-sm font-pmedium text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {subtitle}
      </Text>

      <CustomButton
        text="Back to Explore"
        handlePress={() => router.push("/home")}
        containerStyle="w-full my-4 mb-10"
      />
    </View>
  );
};

export default EmptyState;