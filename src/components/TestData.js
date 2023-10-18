import React, { useState, useEffect } from 'react';

function TestData() {
  const [butterflies, setButterflies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchButterflies = async () => {
      try {
        const response = await fetch('/api');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setButterflies(responseData.butterflies);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setButterflies([]);
        setLoading(false); // Устанавливаем loading в false в случае ошибки.
      } finally {
        if (loading) {
          setLoading(false); // Если данные успешно загружены, устанавливаем loading в false.
        }
      }
    };

    fetchButterflies();
  }, [loading]);

  return (
    <div className="Butterflies">
      <h2>Butterflies</h2>
      {loading ? (
        "Loading..."
      ) : (
        <ul>
          {butterflies.length > 0 ? (
            butterflies.map((butterfly, index) => (
              <li key={index}>
                <h3>Species: {butterfly.species}</h3>
                <p>Class: {butterfly.class}</p>
                <img src={butterfly.imagePath} alt={`${butterfly.species}`} />
              </li>
            ))
          ) : (
            "Server is not available" // Отображаем "Server is not available" при отсутствии данных.
          )}
        </ul>
      )}
    </div>
  );
}

export default TestData;

