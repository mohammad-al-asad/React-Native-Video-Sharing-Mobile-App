import { View, Text, Image, FlatList } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "@/lib/useAppwrite";
import { getAllVideos,getLatestVideos } from "@/lib/appWrite";
import VideoCard from "@/Components/VideoCard";
import SearchInput from "@/Components/SearchInput";
import { useGlobalContext } from "@/Contexts/GlobalProvider";
import Trending from "@/Components/Trending";
import EmptyState from "@/Components/EmptyState";

const Home = () => {
  const {user} = useGlobalContext()
  const {refresh,data:videos} = useAppwrite(getAllVideos)
  const {data:latestVideos} = useAppwrite(getLatestVideos)

  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
      data={videos ?? []}
      keyExtractor={(item)=> item.$id}
      renderItem={({item})=>(
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
          subtitle="Be the first one to create a video"
        />
      )}
      ListHeaderComponent={()=>(
        <View className="flex my-5 px-4 space-y-5">
        <View className="flex justify-between items-start flex-row mb-6">
          <View>
            <Text className="font-pmedium text-sm text-gray-100">
              Welcome Back
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              {user?.username}
            </Text>
          </View>

          <View className="mt-1.5">
            <Image
              source={images.logoSmall}
              className="w-9 h-10"
              resizeMode="contain"
            />
          </View>
        </View>

        <SearchInput/>

        <View className="w-full flex-1 pt-5 pb-8">
          <Text className="text-lg font-pregular text-gray-100 mb-3">
            Latest Videos
          </Text>

          <Trending videos={latestVideos ?? []} />
        </View>
      </View>
      )}
      refreshing={refreshing}
      onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

export default Home;
