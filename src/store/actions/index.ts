import * as actionsCreators from '../actionsCreators'


export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => App.AppState): void;
}

interface ConsumptionAddAction { type: 'ADD_CONSUPTION', payload: {} }

export function addConsuption(consumption: {}): AppThunkAction<ConsumptionAddAction> {
    return (dispatch) => {
        dispatch(<ConsumptionAddAction>actionsCreators.setConsuption(consumption));
    }
}