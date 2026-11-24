import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Pipeline from './components/Pipeline.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Samples from './components/Samples.jsx';
import Pricing from './components/Pricing.jsx';
import Faq from './components/Faq.jsx';
import Closing from './components/Closing.jsx';
import { useScrollReveal, useSmoothScroll } from './hooks.js';

export default function App() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Pipeline />
        <Samples />
        <Pricing />
        <Faq />
      </main>
      <Closing />
    </>
  );
}
