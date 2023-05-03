import { PersonDetails } from '../../models/Data';
import {
    BOOKMARK_ACTIONS,
    BookmarkAction,
    BookmarkProps,
} from '../actions/bookmarkActions';

const initialState: BookmarkProps = {
    bookmarks: [],
};

const bookmarkReducer = (state = initialState, action: BookmarkAction) => {
    switch (action.type) {
        case BOOKMARK_ACTIONS.ADD_BOOKMARK:
            return {
                ...state,
                bookmarks: [
                    ...state.bookmarks.filter(
                        item => item.id.value !== (action.payload as PersonDetails).id.value
                    ),
                    action.payload,
                ],
            };
        case BOOKMARK_ACTIONS.REMOVE_BOOKMARK:
            return {
                ...state,
                bookmarks: [
                    ...state.bookmarks.filter(
                        item => item.id.value !== (action.payload as PersonDetails).id.value
                    ),
                ],
            };
        case BOOKMARK_ACTIONS.REMOVE_ALL_BOOKMARK:
            return {
                bookmarks: [],
            };
        default:
            return state;
    }
};
export default bookmarkReducer;