import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";

export default function useAppwrite(fn: () => Promise<Models.Document[]>) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Models.Document[]>();

  async function fetchData() {
      setIsLoading(true);
    try {
      const res = await fn();
      setData(res);
      
    } catch (error: any) {
      console.log(error.message);
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData()
  }, []);



  return {isLoading,data,refresh:fetchData}
}
