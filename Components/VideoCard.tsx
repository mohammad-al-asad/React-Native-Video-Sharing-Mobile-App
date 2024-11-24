import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

const VideoCard = ({
  title,
  thumbnail,
  video,
  creator,
  avatar,
}: {
  title: string;
  thumbnail: string;
  video: string;
  creator: string;
  avatar: string;
}) => {
  const player = useVideoPlayer(video, (player) => {
    player.loop = true;
    player.staysActiveInBackground = true;
  });
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="rounded-lg w-full h-full"
              resizeMode="contain"
            />
          </View>
          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {isPlaying ? (
        <View className="rounded-xl w-full h-60 mt-3 bg-white/10">
          <VideoView
          style={{
            width: "100%",
            height: "100%",
          }}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          contentFit="cover"
        />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            player.play();
          }}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
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

export default VideoCard;
