import ShopActionTypes from './shop.types'

export const INITIAL_STATE = {
    products: {},
    selectedCategory: '',
    error: null
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default shopReducer;