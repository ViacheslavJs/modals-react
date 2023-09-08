import { useState } from 'react';
import styles from './Yachts.module.css';
import {yachts} from './yachts.data.js';

function Yachts() {
  return (
    <div className={ styles.body }>      
       <h1>Yacht catalog</h1>
       <div>
         {yachts.map(yacht => (
           <div key={yacht.id} className={ styles.item }>       
             <div 
               className={styles.image} 
               style={ {backgroundImage: `${yacht.image}`} }
             >           
             </div>
         
             <div className={ styles.info }>
               <h2>{yacht.model}</h2>
               <p>{yacht.price}</p>
               <button>Read more</button>
             </div> 
           </div>  
         ))}       
       </div>     
    </div>
  );
}

export default Yachts;

