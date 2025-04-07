const redirectUrlKey = "redirectUrl";

const urlManager = {
  setRedirectUrl: (url?: string) => {
    console.log("url", url);
    if (typeof window !== "undefined") {
      const path = url || window.location.pathname;
      localStorage.setItem(redirectUrlKey, path);
    }
  },
  getRedirectUrl: (defaultValue: string = "/") => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(redirectUrlKey) || defaultValue;
    }
    return defaultValue;
  },
};

export default urlManager;
