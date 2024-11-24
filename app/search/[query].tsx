import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import useAppwrite from "@/lib/useAppwrite";
import { searchVideos } from "@/lib/appWrite";
import EmptyState from "@/Components/EmptyState";
import VideoCard from "@/Components/VideoCard";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/Components/SearchInput";

const Search = () => {
  const {query} = useLocalSearchParams()
  const { data: videos,refresh } = useAppwrite(() => searchVideos(query as string));
  useEffect(() => {
    if (refresh) refresh();
  }, [query]);
  
  return (
    <SafeAreaView className="h-full bg-primary px-2">
      <FlatList
        data={videos ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this Query"
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query as string}/>
              </View>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
