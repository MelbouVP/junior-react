import { createSelector } from 'reselect'

const selectShop = state => state.shop

export const selectSelectedCategory = createSelector(
    [selectShop],
    shop => shop.selectedCategory
)

export const selectShopHasLoaded = createSelector(
    [selectShop],
    shop => shop.shopHasLoaded
)

export const selectShopCategoryKeys = createSelector(
    [selectShop],
    shop => Object.keys(shop.products)
)