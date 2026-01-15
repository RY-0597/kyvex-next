'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Process() {
    const { t } = useLanguage();

    return (
        <section className="process" id="process">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">{t('process.tag')}</span>
                    <h2 className="section-title">{t('process.title')}</h2>
                </div>
                <div className="process-timeline process-timeline-4">
                    <div className="process-step">
                        <div className="process-icon">01</div>
                        <h3>{t('process.step1.title')}</h3>
                        <p>{t('process.step1.desc')}</p>
                    </div>
                    <div className="process-step">
                        <div className="process-icon">02</div>
                        <h3>{t('process.step2.title')}</h3>
                        <p>{t('process.step2.desc')}</p>
                    </div>
                    <div className="process-step">
                        <div className="process-icon">03</div>
                        <h3>{t('process.step3.title')}</h3>
                        <p>{t('process.step3.desc')}</p>
                    </div>
                    <div className="process-step">
                        <div className="process-icon">04</div>
                        <h3>{t('process.step4.title')}</h3>
                        <p>{t('process.step4.desc')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
