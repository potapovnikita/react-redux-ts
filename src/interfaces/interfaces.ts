declare namespace App {

    export interface AppState {
        consumptionList: any[];
        categoriesList: categoriesList[];
    }

    export interface ConsumptionItems {
        id?: number;
        name: string;
        price: number;
        category: number;
    }

    export interface categoriesList {
        id: number;
        type: string;
        name: string;
    }

    export interface ConsumptionAddAction { type: 'ADD_CONSUPTION', payload: ConsumptionItems }
}

