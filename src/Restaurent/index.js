import {Component} from 'react'
import {FaCartArrowDown} from 'react-icons/fa'

class Restaurent extends Component {
  state = {itemsList: [], displayItemsList: [], cart: 0}

  componentDidMount() {
    this.getMenuList()
  }

  getMenuList = async () => {
    const apiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(apiUrl)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      console.log(typeof data[0].table_menu_list)
      const menuItemsList = data[0].table_menu_list.map(item2 => ({
        categoryDishes: item2.category_dishes.map(dishDetails => ({
          addOnCat: dishDetails.addonCat.map(item3 => ({
            addOnCategory: item3.addon_category,
            addOnCategoryId: item3.addon_category_id,
            addOnSelection: item3.addon_selection,
          })),
          dishAvailability: dishDetails.dish_Availability,
          dishType: dishDetails.dish_Type,
          dishCalories: dishDetails.dish_calories,
          dishCurrency: dishDetails.dish_currency,
          dishDescription: dishDetails.dish_description,
          dishId: dishDetails.dish_id,
          dishImage: dishDetails.dish_image,
          dishName: dishDetails.dish_name,
          dishPrice: dishDetails.dish_price,
          dishCount: 0,
        })),
        menuCategory: item2.menu_category,
        menuCategoryId: item2.menu_category_id,
        menuCategoryImage: item2.menu_category_image,
      }))
      console.log(menuItemsList)
      const displayItemsList = menuItemsList.filter(
        item => item.menuCategory === 'Salads and Soup',
      )
      console.log(displayItemsList[0].categoryDishes)

      this.setState({
        itemsList: menuItemsList,
        displayItemsList: displayItemsList[0].categoryDishes,
      })
    }
  }

  getDisplayItemsList = e => {
    const {itemsList} = this.state
    console.log(e)
    const displayItemsList = itemsList.filter(item => item.menuCategory === e)
    console.log(displayItemsList[0].categoryDishes)
    this.setState({displayItemsList: displayItemsList[0].categoryDishes})
  }

  increaseCount = id => {
    const {displayItemsList, cart} = this.state
    const updatedItem = displayItemsList.filter(item => item.dishId === id)
    console.log(displayItemsList)
    console.log(updatedItem[0].dishCount)
    if (updatedItem[0].dishCount > 0 || updatedItem[0].dishCount === 0) {
      updatedItem[0].dishCount += 1
    }
    const updatedItemList = displayItemsList.map(item =>
      item.dishId === id ? updatedItem[0] : item,
    )
    let updatedCart
    if (cart > 0 || cart === 0) {
      updatedCart = cart + 1
    } else {
      updatedCart = 0
    }
    console.log(updatedItemList)
    this.setState({displayItemsList: updatedItemList, cart: updatedCart})
  }

  decreaseCount = id => {
    const {displayItemsList, cart} = this.state
    const updatedItem = displayItemsList.filter(item => item.dishId === id)
    console.log(displayItemsList)
    console.log(updatedItem[0].dishCount)
    if (updatedItem[0].dishCount > 0) {
      updatedItem[0].dishCount -= 1
    }
    const updatedItemList = displayItemsList.map(item =>
      item.dishId === id ? updatedItem[0] : item,
    )

    console.log(updatedItemList)
    let updatedCart
    if (cart > 0) {
      updatedCart = cart - 1
    } else {
      updatedCart = 0
    }

    this.setState({displayItemsList: updatedItemList, cart: updatedCart})
  }

  render() {
    const {itemsList, displayItemsList, cart} = this.state

    return (
      <div>
        <div>
          <h1>UNI Resto Cafe</h1>
          <p>My Orders</p>
          <FaCartArrowDown />
          <p>{cart}</p>
        </div>
        <div>
          <ul>
            {itemsList.map(item => (
              <li
                key={item.menuCategoryId}
                onClick={() => this.getDisplayItemsList(item.menuCategory)}
              >
                <button type="button">{item.menuCategory}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {displayItemsList.map(item => (
              <li key={item.dishId}>
                <div>
                  <h1>{item.dishName}</h1>
                  <p>
                    {item.dishCurrency} {item.dishPrice}
                  </p>
                  <p>{item.dishDescription}</p>
                  <p>{item.dishCalories} calories</p>
                  <img src={item.dishImage} alt={item.dishName} />
                  <button
                    type="button"
                    onClick={() => this.decreaseCount(item.dishId)}
                  >
                    -
                  </button>
                  <p>{item.dishCount}</p>
                  <button
                    type="button"
                    onClick={() => this.increaseCount(item.dishId)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Restaurent
