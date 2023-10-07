import { useState } from 'react';
import { useEffect } from 'react';
import styles from './YachtsForm.module.css';
//import FilterDisplay from './FilterDisplay';

function YachtsForm({ filtered, setFiltered }) {
  const [tempFilter, setTempFilter] = useState(Infinity); // временное значение фильтра
  
  // Обработчик изменения значения ввода
  const handleFilterChange = (event) => {
    const inputValue = parseFloat(event.target.value); // Парсим значение в число
    setTempFilter(inputValue);
  };

  // Обработчик применения фильтра
  const applyFilter = (event) => {
    event.preventDefault();
    setFiltered(tempFilter);
    //setTempFilter('');
  };
  
  const resetFilter = (event) => {
    event.preventDefault();
    setFiltered(Infinity);   
    setTempFilter('');
    console.log('without useEffect: ', filtered); // значение изменено - но, лог выполнится до! изменения состояния 
  };
  
  // работа useEffect - лог выполнится после! изменения состояния
  useEffect(() => {
    if(filtered === Infinity) {     
      console.log('using useEffect: ', filtered);
    }
  }, [filtered]);
  
  const prefix = 'up to ';
  
  return (  
    <form className={styles.form}>
      <label htmlFor="inputFilter" className={styles.filterLabel}>Price filter:</label>
      <input 
        className={styles.formInput}
        type="number"
        placeholder="Your price"
        id="inputFilter"
        name="inputFilter"
        value={tempFilter}
        onChange={handleFilterChange}
      />
      <div className={styles.btnAlignment}>      
        <button className={styles.btnReset} onClick={ (event) => resetFilter(event) }>Reset</button>
        <button className={styles.btnApply} onClick={ (event) => applyFilter(event) }>Filter</button>
        
      </div>
      <div style={{color: '#ffffff'}}>      
        {filtered !== Infinity ? (
          <p>        
            {prefix}
            {new Intl.NumberFormat('ru-RU', {
              style: 'currency',
              currency: 'USD',
              currencyDisplay: 'narrowSymbol',
            }).format(filtered)}          
          </p>
        ) : (
          <p>All prices</p>
        )}
      </div>
    </form>  
  );
   
}

export default YachtsForm
