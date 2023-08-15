export const setSessionService = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getSessionServices = (key: string) => {
  try {
    const auth = localStorage.getItem(key);
    console.log(key);
    if (auth && auth !== "") {
      const parsedAuth = JSON.parse(auth);
      return parsedAuth;
    } else {
      return null;
    }
  } catch (error) {
    localStorage.removeItem('token');
    console.error("Ocurrió un error:", error);
    return null;
  }
};
