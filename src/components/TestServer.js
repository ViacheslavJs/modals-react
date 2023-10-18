import { useState, useEffect } from 'react';

function TestServer() {
  
  //
  const [data, setData] = useState(null);
  
  // к варианту 1-3:
  const [image, setImage] = useState(null);
  
  const [imageLoading, setImageLoading] = useState(true);

  
  /*
  // Вариант 1-1:
  useEffect(() => {
    try {
      fetch('/api')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(response => setData(response.message))
        .catch(error => {
          // Обработка ошибки при запросе
          console.error('Error fetching data:', error.message);
          // Установите состояние, чтобы отобразить сообщение об ошибке на вашем компоненте
          setData('Error fetching data. Please try again later.');
        });
    } catch (error) {
      // Обработка ошибки при выполнении fetch
      console.error('Error with fetch:', error.message);
      // Установите состояние, чтобы отобразить сообщение об ошибке на вашем компоненте
      setData('Error with fetch. Please try again later.');
    }
  }, []);
  */
  
  /*
  // Вариант 1-2:
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setData(responseData.message);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setData('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, []);
  
  
  // к варианту 1-1 и 1-2:
  return (
    <div className="App">    
      <p>
        {
          !data ? "Loading..." : data
        }
      </p>          
      <img src="/images/img-1.jpg" alt="Image" />
    </div>
  );
  //
  */
  
  // вариант 1-3:
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setData(responseData.message);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setData('Error fetching data. Please try again later.');
      }
    };

    fetchData();

    const fetchImage = async () => {
      try {
        const response = await fetch('/images/img-1.jpg');
        if (response.ok) {
          const blob = await response.blob();
          setImage(URL.createObjectURL(blob));
          setImageLoading(false); // Устанавливаем imageLoading в false в случае успешной загрузки изображения.
        } else {
          setImageLoading(false); // Устанавливаем imageLoading в false в случае ошибки загрузки изображения.
        }
      } catch (error) {
        console.error('Error fetching image:', error.message);
        setImageLoading(false); // Устанавливаем imageLoading в false в случае ошибки загрузки изображения.
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="App">
      <p>{!data ? 'Loading...' : data}</p>
      {imageLoading ? (
        'Загрузка изображения...'
      ) : (
        image ? (
          <img src={image} alt="Butterfly" />
        ) : (
          'Image not found - server unavailable' // Отображаем "Image not found - server unavailable" в случае ошибки загрузки изображения.
        )
      )}
    </div>
  );
  
  
  /*
  // Вариант 2:
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
        } else {
          setError('Сервер недоступен');
        }
      } catch (error) {
        setError('Сервер недоступен');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
  //
  */

}

export default TestServer;
