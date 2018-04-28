import * as  React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../store/actions'

interface AppProps {
    addConsuption: typeof actions.addConsuption
    consumptionList: App.ConsumptionItems[]
    categoriesList: App.categoriesList[]
}

interface IState {
    inputName?: string;
    inputPrice?: string;
    inputCategory?: string;
    error?: string;
    categoriesList: App.categoriesList[];
}


class Main extends React.Component<AppProps, IState> {
    constructor(props: AppProps) {
        super(props)
        this.state = {
            inputName: '',
            inputPrice: '',
            inputCategory: '',
            error: '',
            categoriesList: this.props.categoriesList
        }

        this.onButtonClick = this.onButtonClick.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.getItems = this.getItems.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getCategoriesSelect = this.getCategoriesSelect.bind(this);
        this.getTotalPrice = this.getTotalPrice.bind(this);
    }


    onButtonClick = (event: any) => {
        event.preventDefault();
        if(!this.state.inputName || !this.state.inputPrice || !this.state.inputCategory) {
            this.setState({ error: 'Заполните все поля' })
            alert(this.state.error)
            return
        }

        this.props.addConsuption({
            name: this.state.inputName,
            category: Number(this.state.inputCategory),
            price: this.state.inputPrice
        })

        this.setState({ inputName: '' })
        this.setState({ inputPrice: '' })
    }

    inputChangeHandler(event: any) {
        const type = event.target.id
        const value = event.target.value

        if (type === 'name') {
            this.setState({ inputName: value })
        } else if (type === 'price') {
            this.setState({ inputPrice: value })
        } else if (type === 'category') {
            this.setState({ inputCategory: value })
        }
    }
    getCategoriesSelect() {
        const categoriesList = this.state.categoriesList


        return categoriesList.map((item,index) => <option value={item.id} key={index}>{item.name}</option>)
    }

    getItems(catId: number) {
        const { consumptionList } = this.props

        console.log('consumptionList', consumptionList)

        if (consumptionList.length) {

            return consumptionList.map((item, index) => {
                return catId === item.category ? <div key={index}>
                        <ul>
                            <li>
                                <div> Наименование: {item.name}</div>
                                <div> Цена: {item.price}</div>
                            </li>
                        </ul>
                    </div> : null
            })
        } else return <div>Список расходов пуст</div>
    }

    getTotalPrice(id?: number) {
        const { consumptionList } = this.props
        let price = 0
        consumptionList.map(item => {
            if (!id) {
                price+=Number(item.price)
            } else if(item.category === id) price+=Number(item.price)

        })
        return price
    }

    getCategories() {
        const categoriesList = this.state.categoriesList

        return categoriesList ? categoriesList.map((item, index) => {
            return <div className="categories-container" key={index}>
                <div className="categories-header">{item.name}</div>
                {this.getItems(item.id)}
                <div>Сумма затрат по категории: {this.getTotalPrice(item.id)} руб.</div>
                </div>

        }) : <div>Список пуст</div>
    }

    render() {
        const { inputName, inputPrice, inputCategory }  = this.state
        return <div>
            <h1>Добавить расходы</h1>
            <span>Название</span>
            <input id='name'
                   className="form-item"
                   type="text"
                   value={inputName}
                   placeholder="Введите название расхода..."
                   onChange={this.inputChangeHandler}/>
            <span>Цена</span>
            <input id='price'
                   className="form-item"
                   type="number"
                   value={inputPrice}
                   placeholder="Введите цену расхода..."
                   onChange={this.inputChangeHandler}/>
            <span>Категория</span>
            <select id='category'
                    className="form-item"
                    value={inputCategory}
                    onChange={this.inputChangeHandler}>
                <option></option>
                {this.getCategoriesSelect()}
            </select>
            <button onClick={this.onButtonClick}>Добавить</button>

            <h1>Список расходов</h1>
            <h2>Категории</h2>
            <div>{this.getCategories()}</div>
            <div>Сумма затрат всего: {this.getTotalPrice()} руб.</div>

        </div>
    }
}

// Трансформируем общее состояние в состояние для компонента
const mapStateToProps = (state: App.AppState) => ({
    consumptionList: state.consumptionList,
    categoriesList: state.categoriesList,
})

export const App = connect(
    mapStateToProps,
    (dispatch) => bindActionCreators({ ...actions }, dispatch)
)(Main);
