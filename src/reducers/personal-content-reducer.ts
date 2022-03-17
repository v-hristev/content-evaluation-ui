import { SET_PERSONAL_CONTENT_LIST } from "../actions/personal-content-actions";


export function personalContentReducer(_: any, {type, payload}: any) {
    switch (type) {
        case SET_PERSONAL_CONTENT_LIST:
            return {
                ...payload,
            };
        default:
            throw new Error(`Unhandled action type: ${type}`);
    }
}
