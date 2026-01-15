'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const { currentLang, setLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('#lang-select-wrapper')) {
                setLangOpen(false);
            }
        };
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLangOpen(false);
        };
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleNavClick = () => {
        setMenuOpen(false);
    };

    const handleLangSelect = (lang: 'zh-TW' | 'en') => {
        setLanguage(lang);
        setLangOpen(false);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="nav-container">
                <a href="#" className="logo">
                    <Image src="/logo.png" alt="KYVEX Logo" width={55} height={55} className="logo-img" />
                    <span className="logo-text">{t('logo')}</span>
                </a>
                <button
                    className={`nav-toggle ${menuOpen ? 'active' : ''}`}
                    id="nav-toggle"
                    aria-label="切換選單"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul className={`nav-menu ${menuOpen ? 'active' : ''}`} id="nav-menu">
                    <li><a href="#home" className="nav-link" onClick={handleNavClick}>{t('nav.home')}</a></li>
                    <li><a href="#about" className="nav-link" onClick={handleNavClick}>{t('nav.about')}</a></li>
                    <li><a href="#services" className="nav-link" onClick={handleNavClick}>{t('nav.services')}</a></li>
                    <li><a href="#process" className="nav-link" onClick={handleNavClick}>{t('nav.process')}</a></li>
                    <li><a href="#contact" className="nav-link" onClick={handleNavClick}>{t('nav.contact')}</a></li>
                    <li className="lang-switcher">
                        <div className={`custom-select ${langOpen ? 'open' : ''}`} id="lang-select-wrapper">
                            <button
                                className="custom-select-trigger"
                                id="lang-select-trigger"
                                aria-haspopup="listbox"
                                aria-expanded={langOpen}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLangOpen(!langOpen);
                                }}
                            >
                                <span className="custom-select-value" id="lang-select-value">
                                    {currentLang === 'zh-TW' ? '繁體中文' : 'English'}
                                </span>
                                <svg className="custom-select-arrow" viewBox="0 0 12 12" fill="none">
                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <ul className="custom-select-options" id="lang-select-options" role="listbox">
                                <li
                                    className={`custom-select-option ${currentLang === 'zh-TW' ? 'active' : ''}`}
                                    data-value="zh-TW"
                                    role="option"
                                    onClick={() => handleLangSelect('zh-TW')}
                                >
                                    <span>繁體中文</span>
                                    <svg className="option-check" viewBox="0 0 16 16" fill="currentColor">
                                        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                                    </svg>
                                </li>
                                <li
                                    className={`custom-select-option ${currentLang === 'en' ? 'active' : ''}`}
                                    data-value="en"
                                    role="option"
                                    onClick={() => handleLangSelect('en')}
                                >
                                    <span>English</span>
                                    <svg className="option-check" viewBox="0 0 16 16" fill="currentColor">
                                        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 1 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                                    </svg>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
