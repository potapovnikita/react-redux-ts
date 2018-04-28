import './styles/style.styl'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'


import { App } from './components/App'




const render = () => {
    ReactDOM.render(
            <Provider store={ store }>
                <App />
            </Provider>,
        document.getElementById('app')
    )
}

render()
