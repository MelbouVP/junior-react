import { takeLatest, put, select, all, call } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';

import OpusClient from '../../GraphQL/OpusClient'
import { CategoryDataQuery } from '../../GraphQL/graphQLqueries'

import {  
    fetchProductDataSuccess, 
    fetchProductDataFailure
} from './shop.actions'

import { selectSelectedCategory, selectShopCategoryNames } from './shop.selectors'


function* fetchProductData(){

    try {

        const category = yield select(selectSelectedCategory)
        const categories = yield select(selectShopCategoryNames)

        if(categories.find(categoryName => categoryName === category)) return


        const data = yield OpusClient.post(CategoryDataQuery(category))

        let categoryProducts = {}

        categoryProducts[data.category.name] = data.category.products

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