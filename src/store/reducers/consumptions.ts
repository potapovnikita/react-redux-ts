import { Action, Reducer } from 'redux'


type ConsumptionItemState = App.ConsumptionItems[];


export const consumptionList: Reducer<ConsumptionItemState> = (state: ConsumptionItemState, incomingAction: Action) => {
    const action = incomingAction as App.ConsumptionAddAction

    console.log('state', state)

    switch (action.type) {
        case 'ADD_CONSUPTION':
            return [{
                id: Number(Date.now().toString()),
                name: action.payload.name,
                price: action.payload.price,
                category: action.payload.category,

            }, ...state ]
    }

    return state || []
};