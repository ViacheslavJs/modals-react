//import React from 'react'; // если используются классовые компоненты
import { useState } from 'react';
import './styles/ImageGallery.css';
import PopUp from './PopUp';
import Modal from './Modal';
//import ReactDOM from 'react-dom/client';

//
function ImageGallery() {   

  const thumbnails = [
    { id: 1, src: 'images/thumbnails/1.webp', alt: 'Preview 1', text: 'Image 1 - about the picture...'},
    { id: 2, src: 'images/thumbnails/2.webp', alt: 'Preview 2', text: 'Image 2 - about the picture...'},
    { id: 3, src: 'images/thumbnails/3.webp', alt: 'Preview 3', text: 'Image 3 - about the picture...'},
    { id: 4, src: 'images/thumbnails/4.webp', alt: 'Preview 4', text: 'Image 4 - about the picture...'},
    { id: 5, src: 'images/thumbnails/5.webp', alt: 'Preview 5', text: 'Image 5 - about the picture...'},
    // Добавьте другие миниатюры по аналогии
  ];
  
  const images = [
    { id: 1, src: 'images/1.jpg', alt: 'Image 1'},
    { id: 2, src: 'images/2.jpg', alt: 'Image 2'},
    { id: 3, src: 'images/3.jpg', alt: 'Image 3'},
    { id: 4, src: 'images/4.jpg', alt: 'Image 4'},
    { id: 5, src: 'images/5.jpg', alt: 'Image 5'},
    // Добавьте другие большие изображения по аналогии
  ];
   
  const [modalActive, setModalActive] = useState(false);
  const [popActive, setPopActive] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);  
  const [selectedImageId, setSelectedImageId] = useState(null);
  //const pageScroll = document.getElementsByTagName('body')[0]; 
  
  //
  const [isPopUpDisplayed, setPopUpDisplayed] = useState(false);
  const [PopUpComponent, setPopUpComponent] = useState(null);
  const loadPopUpComponent = async () => {
    const loadResult = await import('./PopUp.js')
    setPopUpComponent(() => loadResult.default)
 }
 //
  
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
    
    // Динамический импорт с помощью async:
    setPopUpDisplayed(true);
    loadPopUpComponent();
    
    //console.log(thumbnail);
    //console.log(thumbnail.id);
  }
 
  function popClose() {
    setPopActive(false);
    document.body.classList.remove('scroll');
  };
    
  return (
    <div>
      <section className="modal-images">  
        <h2>Modal images</h2>  
        <div className='flex-box'>
          {thumbnails.map((thumbnail) => (
            <div className="img-preview-box" key={thumbnail.id}>
              <img className='img-preview'
                key={thumbnail.id}
                src={process.env.PUBLIC_URL + '/' + thumbnail.src}
                alt={thumbnail.alt}
                text={thumbnail.text}
                onClick={() => { handleThumbnailClick(thumbnail.id); }}             
              />
              <span className="img-preview-span" onClick={() => { popClick(thumbnail); }}>
                {thumbnail.alt}
              </span>
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
              <div className="img-info">
                <p>{selectedThumbnail && selectedThumbnail.text}</p>
                <span>{selectedThumbnail && selectedThumbnail.src}</span>
              </div>
            }
          >
          <p>Modal images</p>
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
    </div>
  );
};
//

export default ImageGallery;

