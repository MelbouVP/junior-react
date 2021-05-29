import { createSelector } from 'reselect'

const selectCurrency = state => state.currency


export const selectCurrencyOverlayHidden = createSelector(
    [selectCurrency],
    currency => currency.currencyOverlayHidden
)