## Redux

* Store
    - includes application state
* Action
    - (event) describes what just happened
* Reducer
    - update the store

### Steps to redux

* Design the store
* Define the actions
* Create a reducer
* Setup the store

### Design the store

```js
[ 
    {
        stockId: 1,
        company: "",
        price: 0,
        symbol: "",
        marketCap: 0,

    }
]
```
### Define the actions

```js
{
    type: "BUY"
    payload: {
        symbol: ""
    }
}
```

## Create a reducer

```js
const Reducer = (state, action) => {
    if(action.type === "BUY")
    return [
        ...state,
        {
            description: action.payload.symbol
        }
    ]
}
export default Reducer
