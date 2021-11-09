import api from "../Component/api/api";

const upload = async (files) => {
  let formData = new FormData();
  console.log(files);
  for (const file of files) {
    formData.append("file_upload", file);
  }

  const result = await api.post(
    `/api/upload/file`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(result);
  return result;
};

export default {
  upload,
};
