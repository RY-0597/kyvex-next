'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'zh-TW' | 'en';

interface LanguageContextType {
  currentLang: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  'zh-TW': {
    'logo': 'KYVEX',
    'nav.home': '首頁',
    'nav.about': '關於我們',
    'nav.services': '服務項目',
    'nav.process': '開發流程',
    'nav.contact': '聯絡我們',
    'hero.title': '構建高擴充性的數位基礎設施',
    'hero.subtitle': '我們專注於打造頂級效能、客製化架構的專業網站解決方案',
    'hero.consult': '預約技術諮詢',
    'hero.services': '查看服務方案',
    'hero.scroll': '向下滾動',
    'about.tag': 'About Us',
    'about.title': '技術驅動，商業為本',
    'about.text1': 'KYVEX 是一個專注於現代化網頁技術的開發團隊。',
    'about.text2': '我們拒絕使用臃腫的套版模組，堅持以乾淨、標準化的程式碼 (Clean Code) 構建每一個專案。',
    'about.text3': '我們深信，一個優秀的網站不只要好看，更要在載入速度、資訊安全與搜尋引擎排名 (SEO) 上展現強大的競爭力。',
    'about.text4': '從客製化前端到後端 API、從效能優化到 SEO 策略，我們提供完整的技術解決方案，助力您的業務在數位時代脫穎而出。',
    'about.value1.title': '技術卓越',
    'about.value1.desc': '採用最新技術棧，確保程式碼品質與效能',
    'about.value2.title': '可靠交付',
    'about.value2.desc': '嚴格的 QA 流程，準時交付穩定產品',
    'about.value3.title': '長期支援',
    'about.value3.desc': '持續的維運服務與技術諮詢',
    'services.tag': 'Services',
    'services.title': '服務項目',
    'services.web.title': '客製化網站開發',
    'services.web.desc': 'RWD 響應式設計 / 前後端分離架構 / 效能優化',
    'services.system.title': '系統架構與整合',
    'services.system.desc': '第三方 API 串接 / 資料庫規劃 / 自動化部署 (CI/CD)',
    'services.performance.title': '前端架構與效能',
    'services.performance.desc': 'SEO 結構優化 / Core Web Vitals / 原始碼交付',
    'process.tag': 'Process',
    'process.title': '開發流程',
    'process.step1.title': '需求分析',
    'process.step1.desc': '轉化商業邏輯，制定技術規格書。',
    'process.step2.title': '介面設計',
    'process.step2.desc': 'UI/UX 規劃，確保用戶體驗流暢。',
    'process.step3.title': '核心開發',
    'process.step3.desc': '採用現代化框架，編寫高可維護性代碼。',
    'process.step4.title': '品管交付',
    'process.step4.desc': '跨裝置相容性測試，確保零錯誤上線。',
    'contact.tag': 'Contact',
    'contact.title': '聯絡我們',
    'contact.subtitle': '開始您的專案',
    'contact.desc': '我們是專注於程式開發的遠端工作室。透過 Email 開始對話，讓我們了解您的需求。',
    'contact.region.label': '服務範圍',
    'contact.region.value': '全球遠端服務',
    'contact.communication.label': '溝通模式',
    'contact.communication.value': '訊息 / Email 優先 (Async First)',
    'contact.email.label': '專案信箱',
    'contact.response.label': '回覆時間',
    'contact.response.value': '通常於 24 小時內回覆',
    'contact.follow': '追蹤我們',
    'contact.form.name': '姓名 / 稱呼 (必填)',
    'contact.form.email': '電子郵件 (必填)',
    'contact.form.phone': '聯絡電話',
    'contact.form.subject': '主旨 (必填)',
    'contact.form.message': '訊息內容 (必填)',
    'contact.form.submit': '發送訊息',
    'contact.form.sending': '發送中...',
    'contact.form.success': '✓ 訊息已成功發送！我們將盡快與您聯繫。',
    'contact.copyright': '© 2024 KYVEX. All Rights Reserved.',
    'contact.form.name.placeholder': '請輸入您的姓名 / 稱呼',
    'contact.form.email.placeholder': '請輸入您的電子郵件',
    'contact.form.phone.placeholder': '請輸入您的聯絡電話',
    'contact.form.subject.placeholder': '請輸入訊息主旨',
    'contact.form.message.placeholder': '請輸入您的訊息內容',
    'contact.form.error.name': '請輸入您的姓名/稱呼',
    'contact.form.error.name.min': '姓名至少需要2個字元',
    'contact.form.error.email': '請輸入您的電子郵件',
    'contact.form.error.email.invalid': '請輸入有效的電子郵件格式',
    'contact.form.error.subject': '請輸入訊息主旨',
    'contact.form.error.message': '請輸入訊息內容',
    'contact.form.error.message.min': '訊息內容至少需要10個字元',
    'contact.form.failed': '✗ 訊息發送失敗。請重試或直接發送郵件給我們。'
  },
  'en': {
    'logo': 'KYVEX',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.process': 'Process',
    'nav.contact': 'Contact',
    'hero.title': 'Building Scalable Digital Infrastructure',
    'hero.subtitle': 'We specialize in building top-tier performance websites with custom architecture',
    'hero.consult': 'Book Consultation',
    'hero.services': 'View Services',
    'hero.scroll': 'Scroll Down',
    'about.tag': 'About Us',
    'about.title': 'Technology-Driven, Business-Focused',
    'about.text1': 'KYVEX is a development team focused on modern web technologies.',
    'about.text2': 'We refuse bloated templates, insisting on Clean Code for every project.',
    'about.text3': 'We believe a great website must not only look good, but also excel in loading speed, security, and SEO.',
    'about.text4': 'From custom front-ends to backend APIs, from performance optimization to SEO strategies, we provide complete technical solutions to help your business stand out in the digital age.',
    'about.value1.title': 'Technical Excellence',
    'about.value1.desc': 'Latest tech stack ensuring code quality and performance',
    'about.value2.title': 'Reliable Delivery',
    'about.value2.desc': 'Rigorous QA process for on-time stable delivery',
    'about.value3.title': 'Long-term Support',
    'about.value3.desc': 'Ongoing maintenance and technical consulting',
    'services.tag': 'Services',
    'services.title': 'Our Services',
    'services.web.title': 'Custom Web Development',
    'services.web.desc': 'RWD Responsive Design / Frontend-Backend Separation / Performance Optimization',
    'services.system.title': 'System Architecture',
    'services.system.desc': 'Third-party API Integration / Database Planning / CI/CD Automation',
    'services.performance.title': 'Frontend Architecture & Performance',
    'services.performance.desc': 'SEO Structure Optimization / Core Web Vitals / Source Code Delivery',
    'process.tag': 'Process',
    'process.title': 'Development Process',
    'process.step1.title': 'Requirements',
    'process.step1.desc': 'Transform business logic into technical specifications.',
    'process.step2.title': 'Interface Design',
    'process.step2.desc': 'UI/UX planning for smooth user experience.',
    'process.step3.title': 'Core Development',
    'process.step3.desc': 'Modern frameworks with highly maintainable code.',
    'process.step4.title': 'QA & Delivery',
    'process.step4.desc': 'Cross-device testing for zero-error launch.',
    'contact.tag': 'Contact',
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Start Your Project',
    'contact.desc': 'We are a remote studio focused on code development. Start a conversation via Email and let us understand your needs.',
    'contact.region.label': 'Service Region',
    'contact.region.value': 'Global Remote Service',
    'contact.communication.label': 'Communication',
    'contact.communication.value': 'Message / Email First (Async)',
    'contact.email.label': 'Project Email',
    'contact.response.label': 'Response Time',
    'contact.response.value': 'Usually within 24 hours',
    'contact.follow': 'Follow Us',
    'contact.form.name': 'Name / Preferred Title (Required)',
    'contact.form.email': 'Email (Required)',
    'contact.form.phone': 'Phone',
    'contact.form.subject': 'Subject (Required)',
    'contact.form.message': 'Message (Required)',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': '✓ Message sent successfully! We will get back to you soon.',
    'contact.copyright': '© 2024 KYVEX. All Rights Reserved.',
    'contact.form.name.placeholder': 'Enter your name or how you\'d like to be addressed',
    'contact.form.email.placeholder': 'Enter your email',
    'contact.form.phone.placeholder': 'Enter your phone number',
    'contact.form.subject.placeholder': 'Enter subject',
    'contact.form.message.placeholder': 'Enter your message',
    'contact.form.error.name': 'Please enter your name',
    'contact.form.error.name.min': 'Name must be at least 2 characters',
    'contact.form.error.email': 'Please enter your email',
    'contact.form.error.email.invalid': 'Please enter a valid email format',
    'contact.form.error.subject': 'Please enter the subject',
    'contact.form.error.message': 'Please enter your message',
    'contact.form.error.message.min': 'Message must be at least 10 characters',
    'contact.form.failed': '✗ Failed to send message. Please try again or email us directly.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>('zh-TW');

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLang') as Language;
    if (savedLang && (savedLang === 'zh-TW' || savedLang === 'en')) {
      setCurrentLang(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('preferredLang', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[currentLang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
