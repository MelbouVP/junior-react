// import ShopActionTypes from './shop.types'

export const INITIAL_STATE = {
    products: {},
    selectedCategory: 'Clothes',
    hasLoaded: true,
    error: null
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default shopReducer;