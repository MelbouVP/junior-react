import { all, call } from 'redux-saga/effects';

import { currencySagas } from './currency/currency.sagas'
import { shopSagas } from './shop/shop.sagas'

export default function* rootSaga() {
    yield all([
        call(currencySagas),
        call(shopSagas)
    ]);
}