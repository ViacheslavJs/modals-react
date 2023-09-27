import styles from './Yachts.module.css';

function YachtsItem({ yacht }) {
  return (
    <div className={ styles.item }>       
      <div 
        className={styles.image} 
        style={ {backgroundImage: `${yacht.image}`} }
      >           
      </div>
         
      <div className={ styles.info }>
        <h2>{yacht.model}</h2>
        <p>
          {new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'narrowSymbol',
          }).format(yacht.price)}
        </p>
        <button>Read more</button>
      </div> 
    </div>
  );
}

export default YachtsItem;
