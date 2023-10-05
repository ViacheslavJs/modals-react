import { useState } from 'react';
import styles from './YachtsForm.module.css';

function YachtsForm({ setFiltered }) {
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
  };
  
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
      <button className={styles.btn} onClick={ (event) => applyFilter(event) }>Filter</button>
    </form>  
  );
   
}

export default YachtsForm
