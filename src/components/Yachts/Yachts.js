import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import styles from './Yachts.module.css';
import { yachts } from '../data/yachts.data.js';
import YachtsItem from './YachtsItem';
import YachtsForm from './YachtsForm/YachtsForm';

function Yachts() {

  // тестовое состояние для демонстрации работы useMemo
  const [subtitleColor, setSubtitleColor] = useState('white');
  
  useEffect(() => {
    console.log("'yachts.data.js' loaded or updated");
  }, []);
  
  // Обработчик события для переключения цвета
  const toggleSubtitleColor = () => {
    if (subtitleColor === 'white') {
      setSubtitleColor('red');
    } else {
      setSubtitleColor('white');
    }
  };
  
  /*
  //TODO не желательно: в этом случае, фильтрация будет выполняться заново (пересчитываться), 
  // при каждом обновлении компонента (например, при изменении состояния), даже если значение фильтра не изменилось:
  const [filtered, setFiltered] = useState(Infinity);
  const filteredYachts = yachts.filter(yacht => yacht.price <= filtered);
  console.log('Calculating filteredYachts...');
  //
  */
  
  
  //TODO так лучше: пересчёт фильтра будет выполняться только при изменении значения фильтра:
  const [filtered, setFiltered] = useState(Infinity); // цена (число)
  const filteredYachts = useMemo(() => {
    console.log("Calculating filteredYachts...");
    return yachts.filter(yacht => yacht.price <= filtered);
  }, [filtered]);
  //
  
   
  return (
    <div className={ styles.body }>      
       <h1 style={{ color: subtitleColor }}>Yacht catalog</h1>
       
       <YachtsForm filtered={filtered} setFiltered={setFiltered} />
        
       <button className={styles.test} onClick={toggleSubtitleColor}>useMemo Test</button>
       <div className={styles.yachtContainer}>
         {filteredYachts.length ? (
         
           filteredYachts.map(yacht => (
             <YachtsItem key={yacht.id} yacht={yacht} />  
           ))
           
         ) : (
           <p>There are no yachts</p>
         )}               
       </div>     
    </div>
  );
}

export default Yachts;

// TODO Использовано:
// 1. методы - Intl.NumberFormat - 
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat

// 2. вариант использования пути для фонового изображения - строка определёная как значение 
// в поле объекта (файл yachts.data.js)

// 3. Используем условие - симмитируем отсутствие данных, например с бекэнда:
// добавим проверку на длину массива - {yachts.length ? ...<код>... : <p>There are no yachts</p>}  
// имитация - в файле yachts.data.js - массив yachts сделать пустым.

// 4. Здесь, логика вынесена из Yachts в отдельный подкомпонент YachtsItem. 
// Также в отдельный подкомпонент можно вынести например, price.
// Каждый дочерний элемент в списке (т.к. здесь использ. map) должен иметь уникальный реквизит - «ключ».

// 5. использование useMemo


