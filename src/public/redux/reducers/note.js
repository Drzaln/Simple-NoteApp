const initialState = {
    listNote: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false
};

export const note = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_NOTE_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_NOTE_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_NOTE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                listNote: action.payload.data.result
            }
        case 'GET_MORE_NOTE_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_MORE_NOTE_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_MORE_NOTE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                listNote: action.payload.data.result
            }
        case 'GET_NOTE_ID_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false
            };
        case 'GET_NOTE_ID_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            };
        case 'GET_NOTE_ID_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                listNote: action.payload.data.result
            };
        case "POST_NOTE_PENDING":
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            };
        case "POST_NOTE_REJECTED":
            return {
                ...state,
                isLoading: false,
                isRejected: true
            };
        case "POST_NOTE_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                listNote: [state.listNote, action.payload.data[0]]
            };
        case 'EDIT_NOTE_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false
            };
        case 'EDIT_NOTE_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            };
        case 'EDIT_NOTE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                nOTEList: [state.listNote, action.payload.data[0]]
            };
        case 'DELETE_NOTE_PENDING':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            };
        case 'DELETE_NOTE_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            };
        case 'DELETE_NOTE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                listNote: action.payload.data.result
            };
        default:
            return state
    }
}