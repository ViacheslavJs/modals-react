
// TODO - basket:
function Basket(props) {
  const basketItems = props.basketItems;
  const setBasketItems = props.setBasketItems;
  const setTotalAddedItems = props.setTotalAddedItems;
  const thumbnails = props.thumbnails;
  let totalAmount = 0;

  const basketItemElements = [];
  
  const deleteBasketItem = (id, event) => {
    event.preventDefault(); 
    setBasketItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[id];
      
      // TODO - подсчёт количества добавленных товаров при удалении:
      let totalCount = 0;
      for (const itemId in updatedItems) {
        totalCount += updatedItems[itemId];
      }
      setTotalAddedItems(totalCount); // Обновляем общее количество добавленных товаров
      console.log('Общее количество добавленных товаров:', totalCount);
      //
      
      return updatedItems;
    });
  };
  
  //
  const clearBasket = () => {
    setBasketItems({});
    const clearedTotalItems = 0;
    setTotalAddedItems(0); // Обнуляем общее количество добавленных товаров
    console.log('Общее количество оставшихся товаров:', clearedTotalItems);
    console.log(basketItems);
    //console.log(clearedTotalItems);
  };
  //

  for (let id in basketItems) {
    const itemValue = basketItems[id];
    const parsedId = parseInt(id, 10);

    if (!isNaN(parsedId) && itemValue !== undefined && itemValue !== null) {
      for (let i = 0; i < thumbnails.length; i++) {
        const thumbnail = thumbnails[i];
        if (thumbnail.id === parsedId) {
          const itemTotal = (thumbnail.price || 0) * itemValue;
          totalAmount += itemTotal;

          basketItemElements.push(
            <div className="basket-item" key={thumbnail.id}>
              <span>{thumbnail.name} - {itemValue} шт.</span>
              <a href="#" onClick={(event) => deleteBasketItem(id, event)}>Удалить</a>
            </div>
          );
          //console.log(thumbnail.name);
          //console.log(basketItemElements);
          console.log(basketItems);

          break;
        }
      }
    }
  }

  return (
    <div className="basket">
      <h3>Корзина</h3>
      {basketItemElements}
      <div className="basket-item">
        <span>Всего <strong>{totalAmount} грн.</strong></span>
      </div>
      <button onClick={clearBasket}>Очистить</button>
    </div>
  );
}
    
export default Basket;

