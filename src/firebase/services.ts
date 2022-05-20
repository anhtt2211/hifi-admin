import { RcFile } from 'antd/lib/upload';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { storage } from './';

const uploadImage = async (file: RcFile[]) => {
  try {
    const imageFile = file[0];
    const storageRef = ref(
      storage,
      `/admin/images/${imageFile.uid}_${new Date().valueOf()}`,
    );
    const imageUrl = await uploadBytes(storageRef, imageFile).then(
      (snapshot) => {
        const url = getDownloadURL(snapshot.ref);
        return url;
      },
    );
    return { url: imageUrl };
  } catch (error: any) {
    return { error: error?.message ?? 'Something went wrong!' };
  }
};

const deteteImage = async (url: string | undefined) => {
  try {
    const baseurl = '/admin/images%2F';
    if (!url) return;

    const start = url.indexOf(baseurl) + baseurl.length;
    const end = url.indexOf('?alt');

    const fileName = url.slice(start, end);

    const storageRef = ref(storage, `/admin/images/${fileName}`);

    await deleteObject(storageRef);
  } catch (error: any) {
    console.log(error);
    return;
  }
};

export { uploadImage, deteteImage };
