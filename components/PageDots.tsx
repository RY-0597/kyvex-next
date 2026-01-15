'use client';

import { useEffect, useState } from 'react';

const sections = ['home', 'about', 'services', 'process', 'contact'];

export default function PageDots() {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach((id) => {
            const section = document.getElementById(id);
            if (section) {
                observer.observe(section);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="page-dots" id="page-dots">
            {sections.map((section) => (
                <a
                    key={section}
                    href={`#${section}`}
                    className={`page-dot ${activeSection === section ? 'active' : ''}`}
                    data-section={section}
                    aria-label={section}
                />
            ))}
        </nav>
    );
}
