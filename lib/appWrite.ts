import { DocumentPickerAsset } from "@/Types/documentPickerAsset";
import { uploadVideo } from "@/Types/uploadVideo";
import {
  Client,
  ID,
  Account,
  Databases,
  Avatars,
  Query,
  Storage,
  ImageGravity,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.asad.aora",
  projectId: "6738766e0003faeeb499",
  storageId: "67387c57001edb6288cb",
  databaseId: "673877bb001ab35008ae",
  userCollectionId: "673877db000dc76580ef",
  videoCollectionId: "67387807001c1ee54e42",
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newUserAccount) throw Error("newUserAccount");
    const avatarUrl = avatar.getInitials(username);
    signIn(email, password);
    const user = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newUserAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    return user;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw Error;
    return session;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error: any) {
    console.log(error.message);
    throw Error(error);
  }
};

export const getUser = async () => {
  try {
    const userAccount = await account.get();
    if (!userAccount) throw Error;
    const user = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", userAccount.$id)]
    );
    if (!user) throw Error;
    return user.documents[0];
  } catch (error: any) {
    console.log(error.message);
    throw Error(error);
  }
};

export const getAllVideos = async () => {
  try {
    const videos = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    return videos.documents;
  } catch (error: any) {
    console.log(error.message);
    throw Error(error);
  }
};

export const getLatestVideos = async () => {
  try {
    const videos = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return videos.documents;
  } catch (error: any) {
    console.log(error.message);
    throw Error(error);
  }
};

export const getUserVideos = async (userId: string) => {
  try {
    const videos = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );
    return videos.documents;
  } catch (error: any) {
    console.log(error.message);
    throw Error(error);
  }
};

export const searchVideos = async (query: string) => {
  try {
    const videos = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("tag", query)]
    );
    return videos.documents;
  } catch (error: any) {
    console.log(error.message);
    throw Error(error);
  }
};

const getFileUrl = async (fileId: string, type: string) => {
  let fileUrl: URL;
  const gravity: ImageGravity = "top" as ImageGravity;
  if (type === "video") {
    fileUrl = await storage.getFileView(appwriteConfig.storageId, fileId);
  } else if (type === "image") {
    fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      gravity,
      100
    );
  } else {
    throw new Error("Invalid file type");
  }
  if (!fileUrl) throw Error;
  return fileUrl;
};

const uploadFile = async (fileObj: DocumentPickerAsset, type: string) => {
  if (!fileObj) return;
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      { ...fileObj, type: fileObj.mimeType }
    );

    const url = getFileUrl(uploadedFile.$id, type);
    return url;
  } catch (error: any) {
    console.log(error.message);
    throw Error(error);
  }
};

export const uploadVideoPost = async (form: uploadVideo) => {
  try {
    const [videoUrl, thumbnailUrl] = await Promise.all([
      uploadFile(form.video, "video"),
      uploadFile(form.thumbnail, "image"),
    ]);
    const videoPost = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        ...form,
        thumbnail: thumbnailUrl,
        video: videoUrl,
      }
    );
    return videoPost;
  } catch (error: any) {
    console.log(error.message);
    throw Error(error);
  }
};
