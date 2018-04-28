import { Reducer } from 'redux'


type categoriesList = App.categoriesList[];


export const categoriesList: Reducer<categoriesList> = (state: categoriesList) => {

    console.log('state', state)

    return state || []
};