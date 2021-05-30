import CurrencyActionTypes from './currency.types'

export const INITIAL_STATE = {
    currencyOverlayHidden: true,
    currencies: [],
    selectedCurrency: { name: 'USD', symbol: '$' },
    currencySymbols: [
        { name: 'USD', symbol: '$' },
        { name: 'GBP', symbol: '£' },
        { name: 'AUD', symbol: 'AU$' },
        { name: 'JPY', symbol: '¥' },
        { name: 'RUB', symbol: '₽' }
    ],
    hasLoaded: false,
    error: null
}

const currencyReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CurrencyActionTypes.TOGGLE_CURRENCY_OVERLAY:
            return {
                ...state,
                currencyOverlayHidden: !state.currencyOverlayHidden
            }
        case CurrencyActionTypes.CHANGE_SELECTED_CURRENCY:
            return {
                ...state,
                selectedCurrency: action.payload
            }
        case CurrencyActionTypes.FETCH_CURRENCIES_START:
            return {
                ...state,
                hasLoaded: false
            }
        case CurrencyActionTypes.FETCH_CURRENCIES_SUCCESS:
            return {
                ...state,
                currencies: action.payload,
                hasLoaded: true
            }
        case CurrencyActionTypes.FETCH_CURRENCIES_FAILURE:
            return {
                ...state,
                hasLoaded: true,
                error: action.payload
            }
        default:
            return state;
    }
}

export default currencyReducer;