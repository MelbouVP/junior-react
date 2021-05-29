import CurrencyActionTypes from './currency.types'

export const INITIAL_STATE = {
    currencyOverlayHidden: true,
    currencies: [],
    selectedCurrency: '',
    error: null
}

const currencyReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default currencyReducer;