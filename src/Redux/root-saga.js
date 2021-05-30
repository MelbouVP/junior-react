import { all, call } from 'redux-saga/effects';

import { currencySagas } from './currency/currency.sagas'


export default function* rootSaga() {
    yield all([
        call(currencySagas)
    ]);
}