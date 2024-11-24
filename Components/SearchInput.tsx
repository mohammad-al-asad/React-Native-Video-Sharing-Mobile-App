import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { RelativePathString, router, usePathname } from "expo-router";

const SearchInput = ({
  initialQuery
}: {
  initialQuery?: string
}) => {
  const [query, setQuery] = useState(initialQuery || "");
  const path = usePathname();
  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 bg-black-100 rounded-2xl border-black-200 relative">
      <TextInput
        className="w-full h-full pl-4 text-white text-base rounded-2xl border-2 focus:border-secondary pr-14"
        placeholder="Search a video topic"
        placeholderTextColor={"#7B7B8B"}
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity
        className="absolute right-5"
        onPress={() => {
          
          if (query === "") {
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );
          }
          if (path.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}` as RelativePathString);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
