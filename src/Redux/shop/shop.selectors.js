import { createSelector } from 'reselect'

const selectShop = state => state.shop


export const selectHasLoaded = createSelector(
    [selectShop],
    shop => shop.hasLoaded
)