import { Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { store } from "../../../App";
import Logger from "../../common/Logger";
// import Strings from "../../common/Strings";
// import VersionInfo from 'react-native-version-info';

import { AsyncParamsKeys, Constants, Flash } from "../../common/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getHeaderToken = async () => {
  let token = await AsyncStorage.getItem(AsyncParamsKeys.Token);
  if (!token) {
    token = "";
  } else {
    token = "Bearer " + token;
  }
  return token;
};

/* GET Api Call */
export async function getFetch(apiUrl, actionType, header, body = {}) {
  // Logger.log("==================================", header);
  Logger.log(" URL:- " + apiUrl);
  Logger.log("actionType:- " + actionType);
  const state = await NetInfo.fetch();
  if (state.isConnected) {
    let authenticationToken = await getHeaderToken();
    store.dispatch({ type: actionType });
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: authenticationToken,
        // "Accept-Language": Strings.getLanguage(),
        // 'AppVersion': VersionInfo.buildVersion,
        // 'Platform': Platform.OS == "ios" ? "iOS" : "Android"
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        return {
          responseCode: 404,
          message: "Network Error! Please try again later.",
        };
      });
    return response;
  } else {
    // return false;
    return {
      responseCode: 404,
      message: "Network Error! Please try again later.",
    };
  }
}

/* Api wrapper for GET Request */
export var getApi = (apiUrl, actionType, header, body = {}) => {
  return new Promise(async (resolve, reject) => {
    const resData = await getFetch(apiUrl, actionType, header, body);
    Logger.log(resData, " response data");
    if (resData == false) {
      reject({ code: 404, message: "Network Error! Please try again later." });
    } else if (resData.code == 401) {
      reject(resData);
    } else {
      resolve(resData);
    }
  });
};

/* POST Api Call */
export async function postFetch(apiUrl, actionType, header = {}, body = {}) {
  const state = await NetInfo.fetch();
  if (state.isConnected) {
    store.dispatch({ type: actionType });
    console.log("POSTFETCH", JSON.stringify(body));
    const response = await fetch(apiUrl, {
      method: "POST",
      mode: "no-cors",
      headers: header,
      body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        Logger.error(error);
        return {
          responseCode: 404,
          message: "Network Error! Please try again later.",
        };
      });
    return response;
  } else {
    // return false;
    return {
      responseCode: 404,
      message: "Network Error! Please try again later.",
    };
  }
}

/* POST File Fetch Api Call */
export async function postFileFetchFetch(
  apiUrl,
  actionType,
  header = {},
  body = {}
) {
  const state = await NetInfo.fetch();
  if (state.isConnected) {
    store.dispatch({ type: actionType });
    console.log("URLFETCHFECTH", apiUrl);
    const response = await fetch(apiUrl, {
      method: "POST",
      mode: "no-cors",
      headers: header,
      body: body,
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        Logger.error(error);
        return {
          responseCode: 404,
          message: "Network Error! Please try again later.",
        };
      });
    return response;
  } else {
    // return false;
    return {
      responseCode: 404,
      message: "Network Error! Please try again later.",
    };
  }
}

/* Api wrapper for POST Request */
export var postApi = (apiUrl, actionType, header, body = {}) => {
  Logger.log("==================================");
  Logger.log(" URL:- " + apiUrl);
  Logger.log("actionType:- " + actionType);
  //Logger.log("header:- ", header)
  Logger.log("body:- " + JSON.stringify(body));
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    // authorization: "Bearer " + header,
    // "Accept-Language": Strings.getLanguage(),
    // 'AppVersion': VersionInfo.buildVersion,
    // 'Platform': Platform.OS == "ios" ? "iOS" : "Android"
  };
  return new Promise(async (resolve, reject) => {
    let authenticationToken = await getHeaderToken();
    headers["authorization"] = authenticationToken;

    const resData = await postFetch(apiUrl, actionType, headers, body);
    console.log("resDataaa", resData)
    Logger.log("POST Response:- " + JSON.stringify(resData));
    if (resData == false) {
      reject({ code: 404, message: "Network Error! Please try again later." });
    } else if (resData.code == 401) {
      //  || resData.code == 400 removed
      reject(resData);
    } else {
      resolve(resData);
    }
  });
};

export var postFileApi = (apiUrl, actionType, header, body = {}) => {
  Logger.log("==================================");
  Logger.log(" URL:- " + apiUrl);
  Logger.log("actionType:- " + actionType);
  //Logger.log("header:- ", header)
  Logger.log("body:- " + JSON.stringify(body));

  var headers = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    // authorization: "Bearer " + header,
    // "Accept-Language": Strings.getLanguage(),
    // 'AppVersion': VersionInfo.buildVersion,
    // 'Platform': Platform.OS == "ios" ? "iOS" : "Android"
  };

  return new Promise(async (resolve, reject) => {
    let authenticationToken = await getHeaderToken();
    headers["authorization"] = authenticationToken;

    const resData = await postFileFetchFetch(apiUrl, actionType, headers, body);
    Logger.log("POST Response:- " + JSON.stringify(resData));
    if (resData == false) {
      reject({ code: 404, message: "Network Error! Please try again later." });
    } else if (resData.code == 401) {
      reject(resData);
    } else {
      resolve(resData);
    }
  });
};

export var postFileApiWithoutHeader = (apiUrl, actionType, header, body = {}) => {
  Logger.log("==================================");
  Logger.log(" URL:- " + apiUrl);
  Logger.log("actionType:- " + actionType);
  //Logger.log("header:- ", header)
  Logger.log("body Normal", body);
  Logger.log("body:- " + JSON.stringify(body));

  var headers = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    // authorization: "Bearer " + header,
    // "Accept-Language": Strings.getLanguage(),
    // 'AppVersion': VersionInfo.buildVersion,
    // 'Platform': Platform.OS == "ios" ? "iOS" : "Android"
  };

  return new Promise(async (resolve, reject) => {
    // let authenticationToken = await getHeaderToken();
    // headers["authorization"] = authenticationToken;

    const resData = await postFileFetchFetch(apiUrl, actionType, headers, body);
    Logger.log("POST Response:- " + JSON.stringify(resData));
    if (resData == false) {
      reject({ code: 404, message: "Network Error! Please try again later." });
    } else if (resData.code == 401) {
      reject(resData);
    } else {
      resolve(resData);
    }
  });
};

/* Api wrapper for DELETE Request */
export var deleteApi = (apiUrl, actionType, header) => {
  Logger.log("==================================");
  Logger.log(" URL:- " + apiUrl);
  Logger.log("actionType:- " + actionType);
  // Logger.log("header:- ", header)
  // Logger.log("body:- " + JSON.stringify(body))
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    // authorization: "Bearer " + header,
    // "Accept-Language": Strings.getLanguage(),
    // 'AppVersion': VersionInfo.buildVersion,
    // 'Platform': Platform.OS == "ios" ? "iOS" : "Android"
  };
  return new Promise(async (resolve, reject) => {
    let authenticationToken = await getHeaderToken();
    headers["authorization"] = authenticationToken;

    const resData = await deleteFetch(apiUrl, actionType, headers);
    Logger.log("POST Response:- " + JSON.stringify(resData));
    if (resData == false) {
      reject({ code: 404, message: "Network Error! Please try again later." });
    } else if (resData.code == 401) {
      reject(resData);
    } else {
      resolve(resData);
    }
  });
};

/* DELETE Api Call */
export async function deleteFetch(apiUrl, actionType, header = {}) {
  const state = await NetInfo.fetch();
  if (state.isConnected) {
    store.dispatch({ type: actionType });
    const response = await fetch(apiUrl, {
      method: "DELETE",
      mode: "no-cors",
      headers: header,
      // body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        Logger.error(error);
        return {
          responseCode: 404,
          message: "Network Error! Please try again later.",
        };
      });
    return response;
  } else {
    // return false;
    return {
      responseCode: 404,
      message: "Network Error! Please try again later.",
    };
  }
}
