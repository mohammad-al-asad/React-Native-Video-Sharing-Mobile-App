import { View, Text, Image, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormFild from "@/Components/FormFild";
import CustomButton from "@/Components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appWrite";
import { useGlobalContext } from "@/Contexts/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const submit = async () => {
    const { username, email, password } = form;

    if (!username || !email || !password) {
      Alert.alert("Error", "Fill the all flieds");
    } else {
      setIsSubmiting(true);
      try {
        const user = await createUser(username, email, password);
        router.push("/home");
        if (!user) throw Error;
        setUser(user);
        setIsLoggedIn(true);
      } catch (error: any) {
        console.log(error.message);
        Alert.alert("Error", error.message);
      } finally {
        setIsSubmiting(false);
      }
    }
  };
  return (
    <SafeAreaView className="h-full bg-primary px-4">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="flex-1 gap-4 justify-center items-center">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[140px] h-[40px] self-start ml-1"
          />
          <Text className="ml-2 mb-2 self-start text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up
          </Text>
          <FormFild
            placeholder="Enter username"
            name="Username"
            value={form.username}
            setValue={(e) => setForm({ ...form, username: e })}
          />
          <FormFild
            placeholder="Enter email"
            name="Email"
            value={form.email}
            setValue={(e) => {
              setForm({ ...form, email: e });
            }}
          />
          <FormFild
            placeholder="Enter password"
            name="Password"
            value={form.password}
            setValue={(e) => {
              setForm({ ...form, password: e });
            }}
          />
          <CustomButton
            text="Sign Up"
            handlePress={submit}
            isLoading={isSubmiting}
          />
          <Text className="text-white mb-10">
            Already have an account?{" "}
            <Link href="/sign-in">
              <Text className="text-secondary-100">Sign in</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
