import style from './HomePage.module.scss';
import { Slider } from '../../components/Slider/Slider.jsx';
import { Popular } from '../../components/Popular/Popular.js';
import { Novelty } from '../../components/Novelty/Novelty.js';

function HomePage() {
  return (
    <>
      <Slider />
      <Popular />
      <Novelty />

    </>
  );
}

export default HomePage;
