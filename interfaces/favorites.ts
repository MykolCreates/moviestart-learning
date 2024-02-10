import { MediaType } from "./apiresult";

export type Favorite = {
    id: string;
    mediaType: MediaType;
    name: string;
    thumbnail: string;
}