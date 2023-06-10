import CryptoJS from "crypto-js";

const encryptKey = '123'; // change later

//store data to session
export const setlocalData = (key, data) => {
  const jsonData = JSON.stringify(data);
  var encryptJson = encryptData(jsonData, encryptKey);
  localStorage.setItem(key, encryptJson );
};

//get data from session
export const getlocalData = (key) => {
  const jsonData = localStorage.getItem(key);
  var decryptJson = decryptData(jsonData, encryptKey);
  // return JSON.parse(jsonData);
  return decryptJson
};

//remove data from session
export const removelocalData = (key) => {
  localStorage.removeItem(key);
};

export const setSessionData = (key, data) => {
  const jsonData = JSON.stringify(data);
  var encryptJson = encryptData(jsonData, encryptKey);
  sessionStorage.setItem(key, encryptJson );
};

export const getSessionData = (key) => {
  const jsonData = sessionStorage.getItem(key);
  var decryptJson = decryptData(jsonData, encryptKey);
  // return JSON.parse(jsonData);
  return decryptJson
};

export const removeSessionData = (key) => {
  sessionStorage.removeItem(key);
};

export const isSessionSet = (key) => {
  const data1 = sessionStorage.getItem(key)
  const data2 = localStorage.getItem(key)
  if (data1 !== null || data2 !== null) {
    return true
  }else {
    return false
  }
}

// encryption section

export const encryptData = (data, key) => {
  var encryptedData = CryptoJS.AES.encrypt(data, key);
  return encryptedData.toString();
}

export const decryptData = (data, key) => {
  var decryptedData = CryptoJS.AES.decrypt(data, key);
  var jsonData = decryptedData.toString(CryptoJS.enc.Utf8);
  return JSON.parse(jsonData);
}
