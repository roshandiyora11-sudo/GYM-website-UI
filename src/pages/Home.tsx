import { Hero } from '../components/home/Hero';
import { About } from '../components/home/About';
import { Programs } from '../components/home/Programs';
import { Trainers } from '../components/home/Trainers';
import { Pricing } from '../components/home/Pricing';
import { Testimonials } from '../components/home/Testimonials';
import { Contact } from '../components/home/Contact';

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
