//import React from 'react'; // если используются классовые компоненты
//import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import './styles/CardProduct.css';
import PopUp from './PopUp';
import Modal from './Modal';
import PopCart from './PopCart';
import { thumbnails } from './data/cardproduct.data.js';
import { images } from './data/cardproduct.data.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

//
import Basket from './Basket';
import './styles/Basket.css';

//
function CardProduct() {   
     
  const [modalActive, setModalActive] = useState(false); // открыть/закрыть мод. окно изображений
  
  const [popActive, setPopActive] = useState(false); // открыть/закрыть поп-ап описаний
  //console.log(popActive); // начальное значение переменной popActive - 
  // оно будет изменяться при клике - либо false, либо переданный id
  
  const [selectedThumbnail, setSelectedThumbnail] = useState(null); 
  // значение этой переменной будет равно переданному id объекта из массива thumbnails
  
  const [selectedImageId, setSelectedImageId] = useState(null);
  //const pageScroll = document.getElementsByTagName('body')[0]; 
  
  const [basketItems, setBasketItems] = useState({}); //TODO
  const [cartActive, setCartActive] = useState(false); //TODO
  
  const [totalAddedItems, setTotalAddedItems] = useState(0); // Состояние для общего количества добавленных товаров

  
  //
  const [isPopUpDisplayed, setPopUpDisplayed] = useState(false);
  const [PopUpComponent, setPopUpComponent] = useState(null);
  const loadPopUpComponent = async () => {
    const loadResult = await import('./PopUp.js')
    setPopUpComponent(() => loadResult.default)
 }
 //
 
 //
  const [isPopCartDisplayed, setPopCartDisplayed] = useState(false);
  const [PopCartComponent, setPopCartComponent] = useState(null);
  const loadPopCartComponent = async () => {
    const loadResult = await import('./PopCart.js')
    setPopCartComponent(() => loadResult.default)
 }
 //
  
  function imageClose() {
    setModalActive(false);
    document.body.classList.remove('scroll');
  }
  
  function handleThumbnailClick(thumbnailId) {
    setModalActive(true);
    setSelectedImageId(thumbnailId);   
    document.body.classList.add('scroll');
  }
  
  function popClick(thumbnail) {
    setPopActive(thumbnail.id); // TODO or
    //setPopActive(true); // TODO or
    setSelectedThumbnail(thumbnail);
    document.body.classList.add('scroll');  
    
    // Динамический импорт с помощью async:
    setPopUpDisplayed(true);
    loadPopUpComponent();
    
    //console.log(typeof thumbnail); // object
    //console.log(thumbnail); // объект из массива thumbnails
    //console.log(thumbnail.text); // извлекаем поля - id, text и т.д.
    //console.log(thumbnail.id);
  }
  
  function popClose() {
    setPopActive(false);
    document.body.classList.remove('scroll');        
  }  
  
  function cartClick() {
    setCartActive(true);
    setPopCartDisplayed(true);
    loadPopCartComponent();
    document.body.classList.add('scroll');  
  }
  
  function cartClose() {
    setCartActive(false);
    document.body.classList.remove('scroll');  
  }
  
  //TODO
  function addBasket(id, event) {
    event.preventDefault(); // 'event' используем в случае ссылки вместо кнопки
    //console.log(id);
    //console.log(basketItems);
    setBasketItems((prevItems) => { // Используется функция обновления состояния корзины.
      const updatedItems = { ...prevItems }; // Создание копии текущего состояния корзины.
      /*
      //console.log(prevItems);
      //console.log(updatedItems);
      updatedItems[id] = id in updatedItems ? updatedItems[id] + 1 : 1;
      //console.log(updatedItems[id]);
      //console.log(updatedItems);
      //console.log(prevItems);
      return updatedItems;
      */
     
    // TODO - подсчёт количества добавленных товаров: 
    // Проверка, существует ли товар с указанным id в корзине.
    if (id in updatedItems) {
      updatedItems[id] = updatedItems[id] + 1; // Если существует, увеличиваем количество на 1.
    } else {
      updatedItems[id] = 1; // Если нет, создаем запись с начальным количеством 1.
    }       
    /*
    // or - с методом reduce:
    const totalCount = Object.values(updatedItems).reduce((sum, value) => sum + value, 0);
      setTotalAddedItems(totalCount); // Обновляем общее количество добавленных товаров
      console.log('Общее количество добавленных товаров:', totalCount);
    */    
    // or - с помощью обычного цикла:
    let totalCount = 0;
      for (const itemId in updatedItems) {
        totalCount += updatedItems[itemId];
      }
      setTotalAddedItems(totalCount); // Обновляем общее количество добавленных товаров
      console.log('Общее количество добавленных товаров:', totalCount);
    //
    
    
    return updatedItems; // Возвращение обновленного объекта корзины.
      
    });
  }
  //
  
  const clearedTotalItems = 0;
  const totalItems = clearedTotalItems > 0 ? clearedTotalItems : totalAddedItems;  
  
  return (
    <div>              
      <section className="card-product">     
        <h2>Card product</h2>
        <div className="cart">         
          <FontAwesomeIcon icon={faCartShopping} className="cart-icon" onClick={cartClick} />
          <>
            <span> Qty: </span>
            <span className="total-items">{`${totalItems}`}</span>
          </>
        </div>
                        
        <div className='card-flex-box'>
          {thumbnails.map((thumbnail) => (
            <div className="card-preview-box" key={thumbnail.id}>
              <img className='card-preview'
                key={thumbnail.id}
                src={process.env.PUBLIC_URL + '/' + thumbnail.src}
                alt={thumbnail.name}
                text={thumbnail.text}
                onClick={() => { handleThumbnailClick(thumbnail.id); }}             
              />
              <span className="card-preview-span" onClick={() => { popClick(thumbnail); }}>
                More
              </span>
              <p>Name: {thumbnail.name}</p>
              <p>Price: {thumbnail.price ? <strong>{thumbnail.price}</strong> : <span>&mdash;</span>}</p>
              {<button className="add-cart" onClick={(event) => addBasket(thumbnail.id, event)}>Add to cart</button>}
              {/*'event' используем в случае ссылки вместо кнопки, добавить атрибут href="#"*/}
            </div>
          ))}
        </div> 
        <button className="viewed" onClick={() => setModalActive(true)}>just viewed</button>
      </section> 
                       
      <div>
        {isPopUpDisplayed && PopUpComponent ? (
          <PopUp 
            active={popActive}
            popClose={popClose}
            key={selectedThumbnail && selectedThumbnail.id}
            content={
              <>
                <span className="product-name">{selectedThumbnail && selectedThumbnail.name}</span>
                <p><span>{selectedThumbnail && selectedThumbnail.name}</span>
                  {selectedThumbnail && selectedThumbnail.text}</p>              
              </>
            }          
          >
          <p>Card product</p>
        </PopUp>
        ) : null}
      </div>
                      
      
      {selectedImageId !== null && (
        <Modal 
          active={modalActive}  
          image={process.env.PUBLIC_URL + '/' + images[selectedImageId - 1].src} 
          alt={images[selectedImageId - 1].alt} 
          key={images[selectedImageId - 1].id}                              
          onClose={imageClose}       
        />        
      )}
                  
      <div>
        {isPopCartDisplayed && PopCartComponent ? (
          <PopCart 
            active={cartActive}
            popClose={cartClose}
            content={
              <>
                <Basket 
                  basketItems={basketItems} 
                  thumbnails={thumbnails} 
                  setBasketItems={setBasketItems} 
                  setTotalAddedItems={setTotalAddedItems}                  
                />              
              </>
            }          
          >
          <p>Корзина</p>
        </PopCart>
        ) : null}
      </div>
                                    
    </div>
  );
};


//

export default CardProduct;

