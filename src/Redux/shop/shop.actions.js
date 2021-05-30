import ShopActionTypes from './shop.types'

export const changeSelectedCategory = (categoryName) => ({
    type: ShopActionTypes.CHANGE_SELECTED_CATEGORY,
    payload: categoryName
})

export const fetchProductDataStart = () => ({
    type: ShopActionTypes.FETCH_PRODUCT_DATA_START
})

export const fetchProductDataSuccess = (products) => ({
    type: ShopActionTypes.FETCH_PRODUCT_DATA_SUCCESS,
    payload: products
})

export const fetchProductDataFailure = (errorMsg) => ({
    type: ShopActionTypes.FETCH_PRODUCT_DATA_FAILURE,
    payload: errorMsg
})