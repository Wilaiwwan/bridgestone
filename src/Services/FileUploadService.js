import api from "../Component/api/api";

const upload = async (files) => {
  let formData = new FormData();
  for (const file of files) {
    formData.append("file_upload", file);
  }

  const result = await api.post(`/api/upload/file`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result;
};

const uploadExcel = async (files) => {
  let formData = new FormData();
  for (const file of files) {
    formData.append("file_upload", file);
  }
  const result = await api.post(`/api/bpoint/employee/point/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result;
};

export default {
  upload,
  uploadExcel,
};
