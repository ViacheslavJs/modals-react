
// TODO - basket:
function Basket(props) {
  const basketItems = props.basketItems;
  const setBasketItems = props.setBasketItems;
  const thumbnails = props.thumbnails;
  let totalAmount = 0;

  const basketItemElements = [];
  
  const deleteBasketItem = (id, event) => {
    event.preventDefault(); 
    props.setBasketItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[id];
      return updatedItems;
    });
  };

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
      <button onClick={setBasketItems}>Очистить</button>
    </div>
  );
}
    
export default Basket;

