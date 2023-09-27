//const imagesPath = process.env.PUBLIC_URL + '/'; // можно использовать переменную

export const yachts = [
  {
    id: 1,
    model: 'Dragon',
    price: 1000000,
    image: `url(${process.env.PUBLIC_URL}/images/1-y.jpg)`, 
    //image: '/images/1-y.jpg)' // вариант 2 
    // в компоненте Yachts - style={ {backgroundImage: `url(${process.env.PUBLIC_URL}${yacht.image}`} }
  },
  
  {
    id: 2,
    model: 'Finn',
    price: 50000,
    image: `url(${process.env.PUBLIC_URL}/images/2-y.jpg)`,
    //image: '/images/2-y.jpg)' // вариант 2
  },
  
  {
    id: 3,
    model: 'Dragon 1',
    price: 200000,
    image: `url(${process.env.PUBLIC_URL}/images/dragon-1.jpg)`,
    //image: '/images/2-y.jpg)' // вариант 2
  },
  
  {
    id: 4,
    model: 'Dragon 2',
    price: 300000,
    image: `url(${process.env.PUBLIC_URL}/images/dragon-2.jpg)`,
    //image: '/images/2-y.jpg)' // вариант 2
  }
];

