import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// file: a File or Blob object, path: storage path (e.g. "images/userid/filename.png")
export async function uploadImage(file, path) {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
