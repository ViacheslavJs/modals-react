//import logo from './logo.svg';
import './App.css';
import CardProduct from './components/CardProduct';
import ImageGallery from './components/ImageGallery';

const app = {    
  padding: '0px',
  color: 'gray',
};

function App() {
  return (
    <div className="App" style={app}>
      <div>
        <CardProduct />
        <ImageGallery />
      </div>
    </div>
  );
}


export default App;
