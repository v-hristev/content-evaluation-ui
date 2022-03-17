import { IGetDocumentsResponse } from "../services/items";
import { ActionPayload } from "../types/common";

export const SET_PERSONAL_CONTENT_LIST = 'SET_PERSONAL_CONTENT_LIST';

export const setPersonalContent = (dispatch: React.Dispatch<ActionPayload<IGetDocumentsResponse>>, payload: IGetDocumentsResponse) => {
    dispatch({
        type: SET_PERSONAL_CONTENT_LIST,
        payload: payload
    });
}