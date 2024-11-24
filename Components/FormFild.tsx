import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

type propType = {
  name: string;
  placeholder?: string;
  value:string,
  setValue:(e:any)=>void,
  containerStyle?:string
};
const FormFild = ({ name, placeholder,value,setValue,containerStyle }: propType) => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`gap-2 ${containerStyle}`}>
      <Text className="text-base ml-2 text-gray-100 font-pmedium">{name}</Text>
      <View className={`w-[100%] h-16 rounded-xl bg-black-100  flex flex-row items-center relative`}>
        <TextInput
          className="w-full h-full pl-4 text-white text-base rounded-xl border-2 focus:border-secondary pr-14"
          secureTextEntry={name === "Password" && !showPassword}
          placeholder={placeholder}
          placeholderTextColor={"#7B7B8B"}
          value={value}
          onChangeText={setValue}
        />
        {name === "Password" && (
            <TouchableOpacity className="absolute right-2 mr-2" onPress={()=> setShowPassword(!showPassword)}>
                <Image className="h-8 w-8"  source={showPassword? icons.eye: icons.eyeHide}/>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormFild;
