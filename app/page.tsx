'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

// 延遲載入非首屏元件 (解決 #9 Unused JavaScript)
const About = dynamic(() => import('@/components/About'));
const Services = dynamic(() => import('@/components/Services'));
const Process = dynamic(() => import('@/components/Process'));
const Contact = dynamic(() => import('@/components/Contact'));
const PageDots = dynamic(() => import('@/components/PageDots'), { ssr: false }); // PageDots 僅在客戶端有互動意義

export default function Home() {
  useEffect(() => {
    // 平滑滾動
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // 滾動動畫 Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      '.stat-card, .value-card, .service-card, .team-card, .contact-info, .contact-form'
    );

    animatedElements.forEach((el) => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Process />
      <Contact />
      <PageDots />
    </>
  );
}
