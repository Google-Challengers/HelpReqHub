import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./_firebase_config.js";
import { v4 as uuidv4 } from "uuid";

export const uploadUserProfileImagesToFirebaseStorage = async (
  dirname,
  image
) => {
  try {
    if (!image || !image.name)
      throw new Error("A valid image has not been provided.");

    const filePath = `users/${dirname}/image-${image.name + uuidv4()}`;
    const newImageRef = ref(storage, filePath);

    await uploadBytesResumable(newImageRef, image);
    const url = await getDownloadURL(newImageRef);
    return [true, url];
  } catch (err) {
    return [false, new Error(err.message)];
  }
};
