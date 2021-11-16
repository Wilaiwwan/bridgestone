const isDevMode =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

class ENVProvider {
  env = {
    isDevMode: isDevMode,
    version: process.env.REACT_APP_VERSION,
  };

  getConfig() {
    return this.env;
  }

  setConfig(envResource) {
    this.env = {
      ...this.env,
      baseUrl: envResource.REACT_APP_BASE_API || "",
      // port: envResource.REACT_APP_PORT
    };
  }

  async init() {
    const response = await fetch("/resources/config.json");
    const results = await response.json();
    this.setConfig(results);
  }
}

export const envInstants = new ENVProvider();

export default envInstants;
