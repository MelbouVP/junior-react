import { takeLatest, select, put, all, call } from 'redux-saga/effects';
import CurrencyActionTypes from './currency.types';

import OpusClient from '../../GraphQL/graphQLclient'
import { CurrencyQuery } from '../../GraphQL/graphQLqueries'

import {  
    fetchCurrenciesSuccess, 
    fetchCurrenciesFailure, 
    changeSelectedCurrency, 
    changeSelectedCurrencySuccess
} from './currency.actions'

import { selectCurrencySymbols, selectSelectedCurrency } from './currency.selectors'

function* changeCurrency(){

    const currencySymbols = yield select(selectCurrencySymbols)
    const currentCurrency = yield select(selectSelectedCurrency)

    const currency = currencySymbols.filter( currency => currency.name === currentCurrency)

   yield put(changeSelectedCurrencySuccess(currency[0]))
    
}

function* onChangeCurrency(){
    yield takeLatest(
        CurrencyActionTypes.CHANGE_SELECTED_CURRENCY,
        changeCurrency
    )
}



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
        call(onFetchCurrencies),
        call(onChangeCurrency)
    ]);
}