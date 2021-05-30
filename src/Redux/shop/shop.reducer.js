import ShopActionTypes from './shop.types'

export const INITIAL_STATE = {
    products: {},
    selectedCategory: 'clothes',
    selectedProduct: null,
    shopHasLoaded: true,
    error: null
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ShopActionTypes.CHANGE_SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload
            }
        case ShopActionTypes.CHANGE_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload
            }
        case ShopActionTypes.FETCH_PRODUCT_DATA_START:
            return {
                ...state,
                shopHasLoaded: false
            }
        case ShopActionTypes.FETCH_PRODUCT_DATA_SUCCESS:
            return {
                ...state,
                products: {
                    ...state.products,
                    ...action.payload
                },
                shopHasLoaded: true
            }
        case ShopActionTypes.FETCH_PRODUCT_DATA_FAILURE:
            return {
                ...state,
                shopHasLoaded: true,
                error: action.payload
            }
        default:
            return state;
    }
}

export default shopReducer;