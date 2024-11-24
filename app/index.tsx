import CustomButton from "@/Components/CustomButton";
import { images } from "@/constants";
import { useGlobalContext } from "@/Contexts/GlobalProvider";
import { Redirect, router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
  if (isLoading)
    return (
      <SafeAreaView className="h-full bg-primary justify-center items-center">
        <Text className=" text-2xl text-white">Loading...</Text>
      </SafeAreaView>
    );
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-[130px] w-[130px]"
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            className="max-w-[380px] h-[298px]"
          />
          <View className="relative mt-5">
            <Text className="text-4xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -right-10 -bottom-2"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center px-6">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <CustomButton
            text="Continue with Email"
            handlePress={() => {
              router.push("/sign-in");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
