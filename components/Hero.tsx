'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="hero" id="home">
            <div className="hero-bg">
                {/* LCP Optimization: Use Next.js Image with priority */}
                <Image
                    src="/hero-bg.png" // User needs to provide this image
                    alt="Hero Background"
                    fill
                    priority
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        zIndex: -1
                    }}
                />
                {/* Overlay for better text readability if needed */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(34, 211, 238, 0.06) 30%, transparent 70%)',
                    zIndex: 0
                }}></div>
            </div>
            <div className="hero-content">
                <h1 className="hero-title">
                    <span className="gradient-text">{t('hero.title')}</span>
                </h1>
                <p className="hero-subtitle">{t('hero.subtitle')}</p>
                <div className="hero-buttons">
                    <a href="#contact" className="btn btn-primary">{t('hero.consult')}</a>
                    <a href="#services" className="btn btn-secondary">{t('hero.services')}</a>
                </div>
            </div>
            <div className="hero-scroll">
                <span>{t('hero.scroll')}</span>
                <div className="scroll-indicator"></div>
            </div>
        </section>
    );
}
