import {ReactIntlErrorCode} from "react-intl";

function onError(e) {
    if (e.code === ReactIntlErrorCode.MISSING_DATA
        || e.code === ReactIntlErrorCode.INVALID_CONFIG
        || e.code === ReactIntlErrorCode.MISSING_TRANSLATION
        || e.code === ReactIntlErrorCode.MISSING_DATA
    ) {
        return ''
    }
    console.error('lalallaaaaaaaaaa')
}
export default onError;