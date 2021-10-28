import api from "../Component/api/api";
import qs from "qs";

class FileService {
  async getFile(fileId) {
    try {
      const response = await api({
        url: `/api/upload/get?${fileId}`,
        method: "GET",
        responseType: "blob",
      });
      return response;
    } catch (error) {
      const newError = error;
      throw newError;
    }
  }
}

export default new FileService();
