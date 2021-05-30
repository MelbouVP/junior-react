import { createSelector } from 'reselect'

const selectShop = state => state.shop

export const selectSelectedCategory = createSelector(
    [selectShop],
    shop => shop.selectedCategory
)

export const selectSelectedProduct = createSelector(
    [selectShop],
    shop => shop.selectedProduct
)

export const selectShopHasLoaded = createSelector(
    [selectShop],
    shop => shop.shopHasLoaded
)

export const selectShopCategoryNames = createSelector(
    [selectShop],
    shop => Object.keys(shop.products)
)

export const selectShopCategoryProducts = createSelector(
    [selectShop],
    shop => shop.products[shop.selectedCategory]
)