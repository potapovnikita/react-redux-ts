import { createStore, applyMiddleware, compose, GenericStoreEnhancer, combineReducers, Store, StoreEnhancerStoreCreator } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import * as reducers from './reducers'

const windowIfDefined = typeof window === 'undefined' ? null : window as any

const devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__ as () => GenericStoreEnhancer

const logger = createLogger()

const middlewares = [
    thunk,
    logger
]

const initialState: App.AppState = {
    consumptionList: [],
    categoriesList: [
        {
            id: 0,
            type: 'auto',
            name: 'Автомобиль',
        },
        {
            id: 1,
            type: 'food',
            name: 'Продукты',
        },
    ]
}

const rootReducer = combineReducers({
    ...reducers,
})

const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares),
    devToolsExtension ? devToolsExtension() : <S>(next: StoreEnhancerStoreCreator<S>) => next)
) as Store<App.AppState>


export default store