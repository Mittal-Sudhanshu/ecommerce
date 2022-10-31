import Enter from './components/js/Enter';
import Navbar from './components/js/Navbar';
import Card from './components/js/Card';
import Carousel from './components/js/Carousel';
import Newletter from './components/js/Newsletter';
import Footer from './components/js/Footer';

function App() {
  return (
    <>
      <Navbar title="TheBestFit" />
      <Enter />
      <Carousel />
      <Card />
      <Newletter />
      <Footer />
    </>
  );
}

export default App;
