function isMobile() {
  const agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  const ua = navigator.userAgent;
  return agents.some((v) => ua.includes(v));
}

export const [CROSS_WISE, VERTICAL] = ["crosswise", "vertical"];
export const getOrientation = () => {
  if (window.orientation === 90 || window.orientation === -90) {
    return CROSS_WISE;
  }
  return VERTICAL;
};

export const IS_MOBILE = isMobile();

/**
 *
 * @param {*} name 查找的key
 * @param {*} str url
 * @returns
 */
export const getQueryString = (name, str = window.location.href) => {
  if (!name) return null;

  const isArray = Array.isArray(name);
  const isHashRouter = str.includes("#");
  if (isHashRouter) {
    str = str.replace(/#/g, "");
  }
  const url = new URL(str);
  const getString = (key) => {
    const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    const r = url.search.substr(1).match(reg);
    return r;
  };

  if (isArray) {
    return name.map((n) => {
      const res = getString(n);
      return res ? decodeURIComponent(res[2]) : null;
    });
  }

  const res = getString(name);
  return res ? decodeURIComponent(res[2]) : null;
};

/**
 * 脱敏
 */

export const noPassByMobile = (str) => {
  if (null !== str && str !== undefined) {
    var pat = /(\d{3})\d*(\d{4})/;
    return str.replace(pat, "$1****$2");
  } else {
    return "";
  }
};

/**
 * 脱敏名字
 */
export const noPassByName = (str) => {
  if (null !== str && str !== undefined) {
    if (str.length <= 3) {
      return "*" + str.substring(1, str.length);
    } else if (str.length > 3 && str.length <= 6) {
      return "**" + str.substring(2, str.length);
    } else if (str.length > 6) {
      return str.substring(0, 2) + "****" + str.substring(6, str.length);
    }
  } else {
    return "";
  }
};

/**
 * 从signon 获取名字，与xxx签名， xxx合同
 */
export const getEnterpriseAndContractName = () => {
  try {
    const { name, receivers, contractId } = JSON.parse(
      sessionStorage["dto"] ?? {}
    );

    let mainName = name || "";
    let contractName = receivers.length
      ? receivers[0].enterpriseName || receivers[0].realName
      : "";

    return [contractName, mainName, contractId];
  } catch (e) {
    return new Array(3).fill("");
  }
};
