
import react, { useState, useEffect } from 'react'

export default function Form() {

  const [items, setItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);
  const [itemDeleted, setItemDeleted] = useState(false);

  const [textValue, setTextValue] = useState("");

  const [timeoutId, setTimeoutId] = useState();

  const handleClick = e => {
    e.preventDefault();
    if (textValue) {
      setItems(prevItems => ([
        ...prevItems,
        {
          id: Date.now(),
          itemText: textValue
        }
      ]))
      setTextValue("");
      setItemAdded(true);
      setTimeoutId(setTimeout(() => {
        setItemAdded(false);
      }, 1500))
      clearInterval(timeoutId)
    } else {
      alert("Enter Text!")
    }
  }

  const onChange = e => {
    const { value } = e.target
    setTextValue(value)
  }

  const deleteItem = id => {
    setItems(items.filter(item => item.id !== id))
  }

  const itemElem = items.map(item => {
    return (
      <div key={item.id} className='item__wrapper'>
        <div className="item__container">
          <p className='item__text'>{item.itemText}</p>
        </div>
        <img onClick={() => {
          deleteItem(item.id)
        }} className='item__trash' src="./icons/trash.svg" alt="" />
      </div>
    )
  })

  return (
    <>
      <div className="container form__container">
        <div className="form__wrapper">
          <h2 className="form__title">Items To Buy</h2>
          <form className="form__main-cont">
            <input onChange={onChange} value={textValue} className="form__input" type="text" placeholder="Add a New Item" />
            <button onClick={handleClick} className="form__btn">Add</button>
          </form>
          {itemAdded && <p className='item__added'>Item Added Successfuly <img src="./icons/checkmark.svg" alt="" /> </p>}
        </div>
      </div>
      {!cartOpen && <button className='cart__btn'>
        <img onClick={() => {
          setCartOpen(prevOpen => !prevOpen)
        }} className='cart__img' src="./icons/cart.svg" alt="" />
      </button>}
      {cartOpen && <div className="cart__items-cont">
        <img onClick={() => {
          setCartOpen(prevOpen => !prevOpen)
        }} className='close__img' src="./icons/close.svg" alt="" />
        <h2 className='cart__title'>Your Cart</h2>
        <div className="items__container">
          {itemElem}
        </div>
      </div>}
    </>
  );
}