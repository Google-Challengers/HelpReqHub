import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./_firebase_config.js";
import { v4 as uuidv4 } from "uuid";

export const uploadUserProfileImagesToFirebaseStorage = async (
  userId,
  image
) => {
  if (!userId) throw new Error("No user ID has been provided.");

  if (!image || !image.name)
    throw new Error("A valid image has not been provided.");

  const filePath = `users/profile/${userId}/images${image.name + uuidv4()}`;
  const newImageRef = ref(storage, filePath);

  try {
    await uploadBytesResumable(newImageRef, image);
    const url = await getDownloadURL(newImageRef);
    return [true, url];
  } catch (err) {
    return [false, new Error(err.message)];
  }
};
