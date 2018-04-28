// import * as actions from '../constants'

export function setConsuption(consumption: {}) {
    return {
        type: 'ADD_CONSUPTION',
        payload: consumption,
    }
}