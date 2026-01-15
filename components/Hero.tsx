'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="hero" id="home">
            <div className="hero-bg"></div>
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
