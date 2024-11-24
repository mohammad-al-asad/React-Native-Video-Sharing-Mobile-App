import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormFild from "@/Components/FormFild";
import CustomButton from "@/Components/CustomButton";
import { Link, router } from "expo-router";
import { getUser, signIn } from "@/lib/appWrite";
import { useGlobalContext } from "@/Contexts/GlobalProvider";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const {setUser, setIsLoggedIn} = useGlobalContext()

  const submit = async () => {
    const { email, password } = form;
    if (!email || !password) {
      Alert.alert("Error", "Fill the all flieds");
    } else {
      setIsSubmiting(true);
      try {
        const session = await signIn(email, password);
        router.push("/home");
        const user = await getUser();
        
        setUser(user);
        setIsLoggedIn(true);
        if (!session) throw Error;
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
            Sign In
          </Text>
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
            text="Sign In"
            handlePress={submit}
            isLoading={isSubmiting}
          />
          <Text className="text-white mb-10">
            Don't have an account?{" "}
            <Link href="/sign-up">
              <Text className="text-secondary-100">Sign up</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
