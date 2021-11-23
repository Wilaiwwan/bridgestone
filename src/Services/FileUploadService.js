import api from "../Component/api/api";

const upload = async (files) => {
  let formData = new FormData();
  console.log(files);
  for (const file of files) {
    formData.append("file_upload", file);
  }

  const result = await api.post(`/api/upload/file`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(result);
  return result;
};

const uploadExcel = async (files) => {
  let formData = new FormData();
  console.log(files, "Files");
  for (const file of files) {
    formData.append("file_upload", file);
  }
  console.log(files, "Filesss");
  const result = await api.post(`/api/bpoint/employee/point/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(result, "Result File");
  return result;
};

export default {
  upload,
  uploadExcel,
};
