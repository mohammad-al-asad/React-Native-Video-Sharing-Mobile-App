import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormFild from "@/Components/FormFild";
import { useVideoPlayer, VideoView } from "expo-video";
import { icons } from "@/constants";
import CustomButton from "@/Components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { uploadVideoPost } from "@/lib/appWrite";
import { useGlobalContext } from "@/Contexts/GlobalProvider";
import { DocumentPickerAsset } from "@/Types/documentPickerAsset";
import AntDesign from "@expo/vector-icons/AntDesign";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    video: {
      uri: "",
      name: "",
      mimeType: "",
      size: 0,
    },
    thumbnail: {
      uri: "",
      name: "",
      mimeType: "",
      size: 0,
    },
    tag: "",
  });
  const { user } = useGlobalContext();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const videoSelector = useRef(null);

  const player = useVideoPlayer(form.video.uri, (player) => {
    player.loop = true;
  });

  const openPicker = async (type: string) => {
    const res = await DocumentPicker.getDocumentAsync({
      type:
        type === "image"
          ? ["image/jpeg", "image/jpg", "image/png"]
          : ["video/mp4", "video/gif"],
    });
    // console.log(res);
    if (!res.canceled) {
      if (type === "image") {
        if (typeof res.assets[0].mimeType === "string") {
          setForm({ ...form, thumbnail: res.assets[0] as DocumentPickerAsset });
        }
      } else {
        setForm({ ...form, video: res.assets[0] as DocumentPickerAsset });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Warning", "NO document picked");
      }, 100);
    }
  };

  const submit = async () => {
    if (
      form.tag === "" ||
      form.title === "" ||
      !form.thumbnail.uri ||
      !form.video.uri
    ) {
      return Alert.alert("Please provide all fields");
    }
    try {
      setIsSubmiting(true);
      const res = await uploadVideoPost({ ...form, creator: user.$id });
      Alert.alert("Succeed", "Uploaded succesfully");
    } catch (error: any) {
      console.log(error.message);
      Alert.alert("Failed", error.message);
    } finally {
      setForm({
        title: "",
        video: {
          uri: "",
          name: "",
          mimeType: "",
          size: 0,
        },
        thumbnail: {
          uri: "",
          name: "",
          mimeType: "",
          size: 0,
        },
        tag: "",
      });
      setIsSubmiting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormFild
          containerStyle="mt-10"
          name="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          setValue={(e) => setForm({ ...form, title: e })}
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base mb-3 text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity
            onPress={() => {
              openPicker("video");
            }}
          >
            {form.video.uri ? (
              <View className="w-full h-64 bg-white/10 rounded-lg justify-center">
                <VideoView
                  contentFit="cover"
                  ref={videoSelector}
                  player={player}
                  style={{ height: "100%", width: "100%" }}
                  nativeControls
                />
                <View
                  style={{ height: "100%", width: "100%" }}
                  className="absolute items-end p-4"
                >
                  <AntDesign
                    onPress={() => {
                      setForm({
                        ...form,
                        video: {
                          uri: "",
                          name: "",
                          mimeType: "",
                          size: 0,
                        },
                      });
                    }}
                    name="close"
                    size={24}
                    color="white"
                  />
                </View>
              </View>
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-10 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium mb-3">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail.uri ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="contain"
                className="w-full h-64 rounded-2xl bg-white/10"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black flex justify-center items-center flex-row gap-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormFild
          name="Al Tags"
          value={form.tag}
          placeholder="The AI tag of your video...."
          containerStyle="mt-10"
          setValue={(e) => setForm({ ...form, tag: e })}
        />

        <CustomButton
          text="Submit & Publish"
          handlePress={submit}
          containerStyle="mt-7"
          isLoading={isSubmiting}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
