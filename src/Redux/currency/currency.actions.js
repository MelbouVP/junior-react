import CurrencyActionTypes from './currency.types';

export const toggleCurrencyOverlay = () => ({
    type: CurrencyActionTypes.TOGGLE_CURRENCY_OVERLAY
})

export const changeSelectedCurrency = (currencyData) => ({
    type: CurrencyActionTypes.CHANGE_SELECTED_CURRENCY,
    payload: currencyData
})

export const fetchCurrenciesStart = () => ({
    type: CurrencyActionTypes.FETCH_CURRENCIES_START,
})

export const fetchCurrenciesSuccess = (data) => ({
    type: CurrencyActionTypes.FETCH_CURRENCIES_SUCCESS,
    payload: data
})

export const fetchCurrenciesFailure = (errorMsg) => ({
    type: CurrencyActionTypes.FETCH_CURRENCIES_FAILURE,
    payload: errorMsg
})