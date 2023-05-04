import { PersonDetails } from "../../models/Data";

export interface BookmarkProps {
    bookmarks: PersonDetails[];
}

export interface BookmarkAction {
    type: BOOKMARK_ACTIONS;
    payload: PersonDetails | string ;
}

export enum BOOKMARK_ACTIONS {
    ADD_BOOKMARK = 'ADD_BOOKMARK',
    REMOVE_BOOKMARK = 'REMOVE_BOOKMARK',
    REMOVE_ALL_BOOKMARK = 'REMOVE_ALL_BOOKMARK',
    VERIFY_BOOKMARK = 'VERIFY_BOOKMARK'
}
 
export const addBookmark = (bookmark: PersonDetails) => {
    return {
        type: BOOKMARK_ACTIONS.ADD_BOOKMARK,
        payload: bookmark,
    };
}

export const removeBookmark = (bookmark: PersonDetails) => {
    return {
        type: BOOKMARK_ACTIONS.REMOVE_BOOKMARK,
        payload: bookmark,
    };
}

export const verifyBookmark = (bookmark: PersonDetails) => {
    return {
        type: BOOKMARK_ACTIONS.VERIFY_BOOKMARK,
        payload: bookmark,
    };
}

export const removeAllBookmark = () => {
    return {
        type: BOOKMARK_ACTIONS.REMOVE_ALL_BOOKMARK,
    };
}