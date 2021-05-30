import { takeLatest, put, all, call } from 'redux-saga/effects';
import CurrencyActionTypes from './currency.types';

import OpusClient from '../../GraphQL/OpusClient'
import { CurrencyQuery } from '../../GraphQL/graphQLqueries'

import {  
    fetchCurrenciesSuccess, 
    fetchCurrenciesFailure
} from './currency.actions'



function* fetchCurrencies(){

    try {

        const data = yield OpusClient.post(CurrencyQuery)

        yield put(fetchCurrenciesSuccess(data.currencies))


    } catch (error) {
        yield put(fetchCurrenciesFailure(error))
    }

}

function* onFetchCurrencies(){
    yield takeLatest(
        CurrencyActionTypes.FETCH_CURRENCIES_START,
        fetchCurrencies
    )
}

export function* currencySagas() {
    yield all([
        call(onFetchCurrencies)
    ]);
}