//import logo from './logo.svg';
import './App.css';
import CardProduct from './components/CardProduct';
import ImageGallery from './components/ImageGallery';
import Yachts from './components/Yachts/Yachts';
import TestServer from './components/TestServer';
import TestData from './components/TestData';
import Fullstack from './components/Fullstack';

const app = {    
  padding: '0px',
  color: 'gray',
};

function App() {  
  return (
    <div className="App" style={app}>          
      <div>
        <Fullstack />
        {/*<TestServer />
        <TestData />*/}
        {/*<CardProduct />*/}
        <ImageGallery />
        <Yachts />
      </div>
    </div>
  );
}

export default App;
