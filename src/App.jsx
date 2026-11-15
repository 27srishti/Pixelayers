import Backdrop from './components/Backdrop.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Samples from './components/Samples.jsx';
import Bento from './components/Bento.jsx';
import Compare from './components/Compare.jsx';
import Pricing from './components/Pricing.jsx';
import Faq from './components/Faq.jsx';
import Closing from './components/Closing.jsx';
import { useScrollReveal } from './hooks.js';

export default function App() {
  useScrollReveal();
  return (
    <>
      <Backdrop />
      <Nav />
      <main>
        <Hero />
        <Bento />
        <HowItWorks />
        <Samples />
        <Compare />
        <Pricing />
        <Faq />
      </main>
      <Closing />
    </>
  );
}
