import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './root-reducer'
import rootSaga from './root-saga'

const sagaMiddleWare = createSagaMiddleware()


const middleWares = [sagaMiddleWare];

if ( process.env.NODE_ENV === 'development') {
    middleWares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middleWares))

sagaMiddleWare.run(rootSaga)