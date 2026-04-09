import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Programs } from '../components/Programs';
import { Trainers } from '../components/Trainers';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact';

export default function Home() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="programs">
        <Programs />
      </section>
      <section id="trainers">
        <Trainers />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
