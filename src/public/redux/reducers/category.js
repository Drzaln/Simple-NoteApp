const initialState = {
    listCategory: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false
};

export const category = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_CATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                listCategory: action.payload.data.result
            }
        case 'GET_MORE_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_MORE_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_MORE_CATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                listCategory: action.payload.data.result
            }
        case 'GET_CATEGORY_ID_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false
            };
        case 'GET_CATEGORY_ID_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            };
        case 'GET_CATEGORY_ID_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                listCategory: action.payload.data.result
            };
        case "POST_CATEGORY_PENDING":
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            };
        case "POST_CATEGORY_REJECTED":
            return {
                ...state,
                isLoading: false,
                isRejected: true
            };
        case "POST_CATEGORY_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                listCategory: [state.listCategory, action.payload.data[0]]
            };
        case 'EDIT_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false
            };
        case 'EDIT_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            };
        case 'EDIT_CATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                categoryList: [state.listCategory, action.payload.data[0]]
            };
        case 'DELETE_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            };
        case 'DELETE_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            };
        case 'DELETE_CATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                listCategory: action.payload.data.result
            };
        default:
            return state
    }
}