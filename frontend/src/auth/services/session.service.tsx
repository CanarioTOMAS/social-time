export const setLocalStorageValue = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const getLocalStorageValue = (key: string) => {
  try {

    if (typeof window !== 'undefined') {
      const value = localStorage.getItem(key);
      console.log(value)
      return value?value:""      
    }
    return "";
  } catch (error) {
    console.error("Ocurrió un error:", error);
    return "";
  }
};
