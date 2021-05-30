import { createSelector } from 'reselect'

const selectCurrency = state => state.currency

export const selectCurrencies = createSelector(
    [selectCurrency],
    currency => currency.currencies
)

export const selectCurrencySymbols = createSelector(
    [selectCurrency],
    currency => currency.currencySymbols
)

export const selectSelectedCurrency = createSelector(
    [selectCurrency],
    currency => currency.selectedCurrency
)

export const selectCurrencyOverlayHidden = createSelector(
    [selectCurrency],
    currency => currency.currencyOverlayHidden
)


export const selectCurrencyHasLoaded = createSelector(
    [selectCurrency],
    currency => currency.hasLoaded
)