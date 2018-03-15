export const SIGN_IN_SUCCESS = 0;
export const SIGN_IN_FAIL = -1;
export const SIGN_IN_URL = 'api/signIn';

export const PATH_ROUTE_KEY = 'pathRouteKey';

export const CHANGE_PASS_SUCC = '0';
export const CHANGE_PASS_FAIL = '1';
export const CHANGE_PASS_OLD_ERROR = '-1';

// export const APP_TITLE_NAME = '哈尔滨市安全生产综合监督管理平台';
export const APP_TITLE_NAME = '哈尔滨市人民调解平台';
export const SESSION_TIMEOUT_MSG = '用户登录已超时';

export const CAPTCHA_URL = process.env.NODE_ENV === 'production' ? 'captcha.jpg':'assets/images/captcha-photo.jpg';

export const IMG_DIR_URL = process.env.NODE_ENV === 'production' ? 'assets/':'assets/images/';
export const IMG_LOGO_URL = IMG_DIR_URL + 'index-logo.png';
export const IMG_OPERATION_URL = IMG_DIR_URL + 'icon-operation.png';
export const IMG_MODIFY_URL = IMG_DIR_URL + 'icon-modify.png';
export const IMG_OUT_URL = IMG_DIR_URL + 'icon-out.png';
export const IMG_LOGIN_BG_URL = IMG_DIR_URL + 'login-bg.png';
export const IMG_NO_DATA = IMG_DIR_URL + 'nodata.jpg';
export const IMG_Loading_URL = IMG_DIR_URL + 'loading.gif';
export const GO_BACK_URL = IMG_DIR_URL + 'icon-back.png';
export const ENVELOPE_Logo_Img = IMG_DIR_URL + 'logo.jpg';