'use client';

import { useState, FormEvent } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

import emailjs from '@emailjs/browser';

export default function Contact() {
    const { t, currentLang } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = t('contact.form.error.name');
        } else if (formData.name.trim().length < 2) {
            newErrors.name = t('contact.form.error.name.min');
        }

        if (!formData.email.trim()) {
            newErrors.email = t('contact.form.error.email');
        } else if (!validateEmail(formData.email)) {
            newErrors.email = t('contact.form.error.email.invalid');
        }

        if (!formData.subject.trim()) {
            newErrors.subject = t('contact.form.error.subject');
        }

        if (!formData.message.trim()) {
            newErrors.message = t('contact.form.error.message');
        } else if (formData.message.trim().length < 10) {
            newErrors.message = t('contact.form.error.message.min');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const form = e.currentTarget;
            await emailjs.sendForm('service_ptplm7m', 'template_1zqcmyp', form, {
                publicKey: 'zdgZAGmOm1G6tMy8E',
            });

            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBlur = (field: string) => {
        const newErrors = { ...errors };

        if (field === 'name') {
            if (!formData.name.trim()) {
                newErrors.name = t('contact.form.error.name');
            } else if (formData.name.trim().length < 2) {
                newErrors.name = t('contact.form.error.name.min');
            } else {
                delete newErrors.name;
            }
        }

        if (field === 'email') {
            if (!formData.email.trim()) {
                newErrors.email = t('contact.form.error.email');
            } else if (!validateEmail(formData.email)) {
                newErrors.email = t('contact.form.error.email.invalid');
            } else {
                delete newErrors.email;
            }
        }

        if (field === 'subject') {
            if (!formData.subject.trim()) {
                newErrors.subject = t('contact.form.error.subject');
            } else {
                delete newErrors.subject;
            }
        }

        if (field === 'message') {
            if (!formData.message.trim()) {
                newErrors.message = t('contact.form.error.message');
            } else if (formData.message.trim().length < 10) {
                newErrors.message = t('contact.form.error.message.min');
            } else {
                delete newErrors.message;
            }
        }

        setErrors(newErrors);
    };

    return (
        <section className="contact" id="contact">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">{t('contact.tag')}</span>
                    <h2 className="section-title">{t('contact.title')}</h2>
                </div>
                <div className="contact-grid">
                    <div className="contact-info">
                        <h3>{t('contact.subtitle')}</h3>
                        <p>{t('contact.desc')}</p>
                        <div className="contact-details">
                            <div className="contact-item">
                                <span className="contact-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.919 17.919 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                    </svg>
                                </span>
                                <div>
                                    <strong>{t('contact.region.label')}</strong>
                                    <p>{t('contact.region.value')}</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                    </svg>
                                </span>
                                <div>
                                    <strong>{t('contact.communication.label')}</strong>
                                    <p>{t('contact.communication.value')}</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                </span>
                                <div>
                                    <strong>{t('contact.email.label')}</strong>
                                    <p>dev.kyvex@proton.me</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                    </svg>
                                </span>
                                <div>
                                    <strong>{t('contact.response.label')}</strong>
                                    <p>{t('contact.response.value')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="contact-social">
                            <span>{t('contact.follow')}</span>
                            <div className="social-links">
                                <a href="https://github.com/RY-0597/kyvex-next" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <form className="contact-form" id="contact-form" noValidate onSubmit={handleSubmit}>
                        <div className={`form-group ${errors.name ? 'error' : ''}`}>
                            <label htmlFor="name">{t('contact.form.name')}</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                aria-required="true"
                                placeholder={t('contact.form.name.placeholder')}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                onBlur={() => handleBlur('name')}
                            />
                            <span className="error-message" id="name-error" aria-live="polite">{errors.name}</span>
                        </div>
                        <div className={`form-group ${errors.email ? 'error' : ''}`}>
                            <label htmlFor="email">{t('contact.form.email')}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                aria-required="true"
                                placeholder={t('contact.form.email.placeholder')}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                onBlur={() => handleBlur('email')}
                            />
                            <span className="error-message" id="email-error" aria-live="polite">{errors.email}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">{t('contact.form.phone')}</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder={t('contact.form.phone.placeholder')}
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div className={`form-group ${errors.subject ? 'error' : ''}`}>
                            <label htmlFor="subject">{t('contact.form.subject')}</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                aria-required="true"
                                placeholder={t('contact.form.subject.placeholder')}
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                onBlur={() => handleBlur('subject')}
                            />
                            <span className="error-message" id="subject-error" aria-live="polite">{errors.subject}</span>
                        </div>
                        <div className={`form-group ${errors.message ? 'error' : ''}`}>
                            <label htmlFor="message">{t('contact.form.message')}</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                required
                                aria-required="true"
                                placeholder={t('contact.form.message.placeholder')}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                onBlur={() => handleBlur('message')}
                            ></textarea>
                            <span className="error-message" id="message-error" aria-live="polite">{errors.message}</span>
                        </div>
                        <button type="submit" className="btn btn-primary btn-submit" disabled={isSubmitting}>
                            <span style={{ display: isSubmitting ? 'none' : 'inline' }}>{t('contact.form.submit')}</span>
                            <span className="btn-loading" style={{ display: isSubmitting ? 'inline' : 'none' }}>{t('contact.form.sending')}</span>
                        </button>
                        {submitStatus !== 'idle' && (
                            <div
                                className="form-success"
                                style={{
                                    display: 'block',
                                    color: submitStatus === 'success' ? '#22c55e' : '#ef4444',
                                    borderColor: submitStatus === 'success' ? '#22c55e' : '#ef4444'
                                }}
                            >
                                {submitStatus === 'success' ? t('contact.form.success') : t('contact.form.failed')}
                            </div>
                        )}
                    </form>
                </div>
                <div className="contact-footer">
                    <p>{t('contact.copyright')}</p>
                </div>
            </div>
        </section>
    );
}
