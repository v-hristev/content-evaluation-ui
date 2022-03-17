<<<<<<< HEAD
import { IGetDocumentsResponse } from "../types/responses";
=======
import { IGetDocumentsResponse } from "../services/items";
>>>>>>> 842101f51d4ca87515b9939876c250368780164c
import { ActionPayload } from "../types/common";

export const SET_PERSONAL_CONTENT_LIST = 'SET_PERSONAL_CONTENT_LIST';

export const setPersonalContent = (dispatch: React.Dispatch<ActionPayload<IGetDocumentsResponse>>, payload: IGetDocumentsResponse) => {
    dispatch({
        type: SET_PERSONAL_CONTENT_LIST,
        payload: payload
    });
}