//import React from 'react'; // если используются классовые компоненты
import { useState } from 'react';
import './styles/CardProduct.css';
import PopUp from './PopUp';
import Modal from './Modal';
//import ReactDOM from 'react-dom/client';

//
function CardProduct() {   

  const thumbnails = [
    { id: 1, src: 'images/thumbnails/fm-5.webp', name: 'Green World', text: ' - Description...', price: 1200},
    { id: 2, src: 'images/thumbnails/fm-3.webp', name: 'Cosiness', text: ' - Description...', price: 5300},
    { id: 3, src: 'images/thumbnails/fm-13.webp', name: 'Yellow', text: ' - Description...', price: 200},
    { id: 4, src: 'images/thumbnails/fm-10.webp', name: 'Pink', text: ' - Description...', price: null},
    { id: 5, src: 'images/thumbnails/fm-11.webp', name: 'Natural Wood', text: ' - Description...', price: 400},
    // Добавьте другие миниатюры по аналогии
  ];
  
  const images = [
    { id: 1, src: 'images/fm-5.jpg', alt: 'Image 1'},
    { id: 2, src: 'images/fm-3.jpg', alt: 'Image 2'},
    { id: 3, src: 'images/fm-13.jpg', alt: 'Image 3'},
    { id: 4, src: 'images/fm-10.jpg', alt: 'Image 4'},
    { id: 5, src: 'images/fm-11.jpg', alt: 'Image 5'},
    // Добавьте другие большие изображения по аналогии
  ];
   
  const [modalActive, setModalActive] = useState(false); // открыть/закрыть мод. окно изображений
  
  const [popActive, setPopActive] = useState(false); // открыть/закрыть поп-ап описаний
  //console.log(popActive); // начальное значение переменной popActive - 
  // оно будет изменяться при клике - либо false, либо переданный id
  
  const [selectedThumbnail, setSelectedThumbnail] = useState(null); 
  // значение этой переменной будет равно переданному id объекта из массива thumbnails
  
  const [selectedImageId, setSelectedImageId] = useState(null);
  //const pageScroll = document.getElementsByTagName('body')[0]; 
  
  function imageClose() {
    setModalActive(false);
    document.body.classList.remove('scroll');
  };
  
  function handleThumbnailClick(thumbnailId) {
    setModalActive(true);
    setSelectedImageId(thumbnailId);   
    document.body.classList.add('scroll');
  };
  
  function popClick(thumbnail) {
    setPopActive(thumbnail.id); // TODO or
    //setPopActive(true); // TODO or
    setSelectedThumbnail(thumbnail);
    document.body.classList.add('scroll');

    //console.log(typeof thumbnail); // object
    //console.log(thumbnail); // объект из массива thumbnails
    //console.log(thumbnail.text); // извлекаем поля - id, text и т.д.
    //console.log(thumbnail.id);
  }
  
  function popClose() {
    setPopActive(false);
    document.body.classList.remove('scroll');        
  };
    
  return (
    <div>
      <section className="card-product">     
        <h2>Card product</h2> 
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
            </div>
          ))}
        </div> 
        <button className="viewed" onClick={() => setModalActive(true)}>just viewed</button>
      </section> 
                       
      <div>
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
    </div>
  );
};


//

export default CardProduct;

