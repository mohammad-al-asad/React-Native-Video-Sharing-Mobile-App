import { DocumentPickerAsset } from "./documentPickerAsset";

export type uploadVideo = {
  title: string;
  video: DocumentPickerAsset;
  thumbnail: DocumentPickerAsset;
  tag: string;
  creator: string;
};
