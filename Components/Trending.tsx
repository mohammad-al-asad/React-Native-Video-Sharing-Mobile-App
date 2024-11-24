import {
  View,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";
import { icons } from "@/constants";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

const TrendingItem = ({ item }: { item: Models.Document }) => {
  const player = useVideoPlayer(item.video, (player) => {
    player.loop = true;
    player.staysActiveInBackground = true;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View className="mr-4">
      {isPlaying ? (
        <View className="w-[162px] h-[288px] my-5  rounded-lg  bg-white/10">
          <VideoView
            contentFit="contain"
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            nativeControls={false}
            style={{ height: "100%", width: "100%" }}
          />
          <TouchableOpacity
            onPress={() => {
              player.pause();
            }}
            style={{ height: "100%", width: "100%" }}
            className="absolute justify-center items-center"
          />
        </View>
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => player.play()}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-[162px] h-[288px] rounded-lg my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const Trending = ({ videos }: { videos: Models.Document[] }) => {

  return (
    <FlatList
      horizontal
      data={videos}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem item={item}  />
      )}
      ListEmptyComponent={() => <View />}
    />
  );
};

export default Trending;
