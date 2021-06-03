import { takeLatest, put, select, all, call } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';

import OpusClient from '../../GraphQL/OpusClient'
import { CategoryDataQuery } from '../../GraphQL/graphQLqueries'

import {  
    fetchProductDataSuccess, 
    fetchProductDataFailure
} from './shop.actions'

import { selectSelectedCategory, selectShopCategoryNames } from './shop.selectors'

import { createInitialProductPagination } from './shop.utils'

function* fetchProductData(){

    try {

        // returns currently selected product category name
        const category = yield select(selectSelectedCategory)
        // returns list of categories that already exist in state 
        // i.e. products have been already fetched for the category
        const categories = yield select(selectShopCategoryNames)

        // if category already exists then don't fetch products again
        if(categories.find(categoryName => categoryName === category)) return


        // receive data with category name and products
        const data = yield OpusClient.post(CategoryDataQuery(category))

        let categoryProducts = {}

        // creates mock pagination for received records
        let productPagination = createInitialProductPagination(data.category.products.length)

        categoryProducts[data.category.name] = { products: data.category.products, ...productPagination }

        yield put(fetchProductDataSuccess(categoryProducts))


    } catch (error) {
        yield put(fetchProductDataFailure(error))
    }

}

function* onFetchProductData(){
    yield takeLatest(
        [
            ShopActionTypes.FETCH_PRODUCT_DATA_START,
            ShopActionTypes.CHANGE_SELECTED_CATEGORY
        ],
        fetchProductData
    )
}

export function* shopSagas() {
    yield all([
        call(onFetchProductData)
    ]);
}