"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import Navbar from "./navbar/page";
import { motion } from 'framer-motion';
import Link from 'next/link';

// ImageSlider component moved outside
interface ImageSliderProps {
  currentSlide: number;
  setCurrentSlide: (slide: number | ((prev: number) => number)) => void;
}

const ImageSlider = ({ currentSlide, setCurrentSlide }: ImageSliderProps) => {
  const images = [
    {
      src: "/images/1.jpg",
      title: "Empowering Sustainable Mining",
      description: "Revolutionizing the minerals sector with digital solutions for responsible resource extraction."
    },
    {
      src: "/images/2.jpg",
      title: "Transparent Licensing",
      description: "Streamline mining permits and certifications with our blockchain-backed verification system."
    },
    {
      src: "/images/3.jpg",
      title: "Automated Royalty Calculations",
      description: "Precision mineral valuation and tax assessment using real-time market rates and production data."
    },
    {
      src: "/images/4.jpg",
      title: "Environmental Stewardship",
      description: "Monitor ecological impact with integrated satellite imagery, IoT sensors, and AI analytics."
    },
    {
      src: "/images/5.jpg",
      title: "Digital Transformation",
      description: "Harness machine learning to optimize extraction workflows and resource management."
    }
  ];

  const nextImage = useCallback(() => {
    setCurrentSlide((prev: number) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length, setCurrentSlide]);

  const prevImage = () => {
    setCurrentSlide((prev: number) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: index === currentSlide ? 1 : 0,
            zIndex: index === currentSlide ? 10 : 0
          }}
          transition={{ duration: 1 }}
        >
          <img 
            src={image.src} 
            alt={`Slide ${index + 1}`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {image.title}
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed opacity-90">
              {image.description}
            </p>
          </motion.div>
        </motion.div>
      ))}

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-6 z-20">
        <button 
          onClick={prevImage}
          className="bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm focus-ring"
          aria-label="Previous image"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <button 
          onClick={nextImage}
          className="bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm focus-ring"
          aria-label="Next image"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
      
      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-blue-500' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<'en' | 'si' | 'ta'>('en');
  const scrollRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      id: 1,
      title: "DIGITAL LICENSING",
      subtitle: "Streamlined Concessions & Permits",
      description: "Centralize mining rights applications with blockchain-verified documentation to reduce processing time from months to days while ensuring regulatory compliance and preventing fraud.",
      image: "/images/13.jpg",
    },
    {
      id: 2,
      title: "AUTOMATED ROYALTY CALCULATION",
      subtitle: "Precision Resource Valuation",
      description: "Advanced algorithms process real-time mineral extraction data, market prices, and grade classifications to ensure accurate royalty computations with transparent audit trails for both operators and authorities.",
      image: "/images/8.jpg",
    },
    {
      id: 3,
      title: "SUSTAINABLE MINING OVERSIGHT",
      subtitle: "Environmental Intelligence",
      description: "Integrate satellite imagery, drone surveys, and IoT sensor networks to monitor water quality, air emissions, and land disturbance metrics with automated compliance reporting and remediation workflows.",
      image: "/images/9.jpg",
    },
  ];

  const keyServices = [
    {
      title: {
        en: "Interactive Map",
        si: "සිතියම",
        ta: "இடைக்கால வரைபடம்"
      },
      description: {
        en: "Explore mining locations and environmental data across Sri Lanka",
        si: "ශ්‍රී ලංකාවේ ඛණිජ ස්ථාන සහ පාරිසරික දත්ත පරීක්ෂා කරන්න",
        ta: "இலங்கையின் சுரங்க இடங்கள் மற்றும் சுற்றுச்சூழல் தரவுகளை ஆராயுங்கள்"
      },
      icon: "🗺️",
      href: "/map",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: {
        en: "License Portal",
        si: "බලපත්‍ර නිකුත් කිරීමේ ද්වාරය",
        ta: "உரிமப் போர்டல்"
      },
      description: {
        en: "Apply for and manage mining licenses and permits",
        si: "ඛණිජ බලපත්‍ර හා අනුමතීන් සඳහා අයදුම් කරන්ன සහ කළමනාකරණය කරන්න",
        ta: "சுரங்க உரிமங்கள் மற்றும் அனுமதிகளை விண்ணப்பிக்கவும், நிர்வகிக்கவும்"
      },
      icon: "📋",
      href: "/license-portal",
      color: "from-green-500 to-green-600"
    },
    {
      title: {
        en: "Royalty Calculator",
        si: "රාජකීය ගාස්තු ගණකය",
        ta: "ராஜதந்திரக் கணிப்பான்"
      },
      description: {
        en: "Calculate mining royalties and taxes accurately",
        si: "රාජකීය ගාස්තු සහ බදු නිවැරදිව ගණනය කරන්න",
        ta: "சுரங்க வரிகளையும், அரசக் கட்டணங்களையும் சரியாக கணக்கிடுங்கள்"
      },
      icon: "🧮",
      href: "/royalty",
      color: "from-orange-500 to-orange-600"
    },
    {
      title: {
        en: "MineBot Assistant",
        si: "ඛණිජා",
        ta: "கனிபொட் உதவியாளர்"
      },
      description: {
        en: "Get instant help and guidance for mining operations",
        si: "ඛණිජ ක්‍රියාදාම සම්බන්ධයෙන් ක්ෂණික උපදෙස් සහ ආධාර ලබා ගන්න",
        ta: "சுரங்க செயல்பாடுகளுக்கான உடனடி உதவியையும் வழிகாட்டலையும் பெறுங்கள்"
      },
      icon: "🤖",
      href: "/minebot",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      title: {
        en: "Complaints Portal",
        si: "පැමිණිලි ද්වාරය",
        ta: "புகாருகள் போர்டல்"
      },
      description: {
        en: "Report issues and submit complaints for resolution",
        si: "ගැටලු වාர්තා කරන්න සහ විසඳුම් සඳහා පැමිණිලි ඉදිරිපත් කරන්න",
        ta: "சிக்கல்களை புகாரளிக்கவும், தீர்வுகளுக்கு சமர்ப்பிக்கவும்"
      },
      icon: "📝",
      href: "/complains",
      color: "from-red-500 to-red-600"
    }
  ];

  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setIsDarkMode(event.detail.isDarkMode);
    };

    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    window.addEventListener('languageChange', handleLanguageChange as EventListener);

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }

    const savedLang = localStorage.getItem('language');
    if (savedLang === 'si') {
      setLanguage('si');
    } else if (savedLang === 'ta') {
      setLanguage('ta');
    } else {
      setLanguage('en');
    }

    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev: number) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev: number) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const translations = {
    en: {
      heroSubtitle: "Digitizing mineral extraction permitting and taxation to drive transparency, compliance, and sustainability throughout Sri Lanka's mining value chain.",
      ourCommitment: "OUR COMMITMENT",
      commitmentText: "CeylonMine is dedicated to revolutionizing mining operations through cutting-edge digital technology, ensuring transparent governance, operational efficiency, and ecological protection.",
      transparency: "TRANSPARENCY",
      efficiency: "EFFICIENCY",
      sustainability: "SUSTAINABILITY",
      keyServices: "KEY SERVICES",
      keyServicesText: "Access our comprehensive suite of digital mining management tools designed for government efficiency and industry compliance.",
      accessService: "Access Service",
      userFooter: "All rights reserved."
    },
    si: {
      heroSubtitle: "ශ්‍රී ලංකාවේ ඛනිජ නිස්සාරණ බලපත්‍රකරණය සහ බදුකරණය ඩිජිටල්කරණය කරමින් පාරදෘශ්‍යතාව, අනුකූලතාව සහ තිරසාරත්වය ප්‍රවර්ධනය කිරීම.",
      ourCommitment: "අපගේ කැපවීම",
      commitmentText: "CeylonMine නවීන තාක්‍ෂණය හරහා ඛනිජ කැණීම් කටයුතු විප්ලවීය කිරීමට කැපවී සිටින අතර, විනිවිදභාවයෙන් යුතු පාලනය, ක්‍රියාකාරී කාර්යක්‍ෂමතාව සහ පාරිසරික ආරක්‍ෂාව සහතික කරයි.",
      transparency: "විනිවිද පෙනෙනභාවය",
      efficiency: "කාර්යක්ෂමතාව",
      sustainability: "තිරසාරතාවය",
      keyServices: "ප්‍රධාන සේவා",
      keyServicesText: "රජයේ කාර්යක්ෂමතාව සහ කර්මාන්ත අනුකූලතාව සඳහා නිර්මාණය කර ඇති අපගේ සම්පූර්ණ ඩිජිටල් ඛනිජ කළමනාකරණ මෙවලම් සංචිතයට ප්‍රවේශ වන්න.",
      accessService: "සේවාවට ප්‍රවේශ වන්න",
      userFooter: "සියලු හිමිකම් ඇවිරිණි."
    },
    ta: {
      heroSubtitle: "இலங்கையின் சுரங்க மதிப்பு சங்கிலி முழுவதும் வெளிப்படைத்தன்மை, இணக்கத்தன்மை மற்றும் நிலைத்தன்மையை ஊக்குவிக்கும் வகையில் கனிம பிரித்தெடுத்தல் அனுமதி மற்றும் வரி விதிப்பை டிஜிட்டல் மயமாக்குதல்.",
      ourCommitment: "எங்கள் உறுதிப்பாடு",
      commitmentText: "CeylonMine முன்னோடி டிஜிட்டல் தொழில்நுட்பத்தின் மூலம் சுரங்க செயல்பாடுகளை புரட்சிகரமாக மாற்றுவதற்கு அர்ப்பணிக்கப்பட்டுள்ளது, வெளிப்படை ஆளுமை, செயல்பாட்டு திறன் மற்றும் சுற்றுச்சூழல் பாதுகாப்பை உறுதி செய்கிறது.",
      transparency: "வெளிப்படைத்தன்மை",
      efficiency: "திறன்",
      sustainability: "நிலைத்தன்மை",
      keyServices: "முக்கிய சேவைகள்",
      keyServicesText: "அரசாங்க திறன் மற்றும் தொழில் இணக்கத்திற்காக வடிவமைக்கப்பட்ட எங்கள் விரிவான டிஜிட்டல் சுரங்க மேலாண்மை கருவிகளின் தொகுப்பை அணுகுங்கள்.",
      accessService: "சேவையை அணுகு",
      userFooter: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
    }
  };

  const t = translations[language];

  return (
    <div
      className={`relative min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      } overflow-hidden scrollbar-thin`}
      ref={scrollRef}
    >
      <Head>
        <title>CeylonMine | Digital Transformation for Mining Industry</title>
        <meta
          name="description"
          content="CeylonMine is a complete mining management platform digitalizing licensing processes, automating royalty calculations, and ensuring sustainable mining practices in Sri Lanka."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="relative z-10">
        <ImageSlider 
          currentSlide={currentSlide} 
          setCurrentSlide={setCurrentSlide} 
        />

        {/* Hero Section */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center space-section">
              <motion.h1
                className="responsive-heading font-bold mb-8 bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                CeylonMine
              </motion.h1>
              <motion.p
                className={`responsive-text max-w-5xl mx-auto leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t.heroSubtitle}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Key Services Section */}
        <section className={`section-padding ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center space-section">
              <motion.h2
                className={`responsive-heading font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {t.keyServices}
              </motion.h2>
              <motion.p
                className={`responsive-text max-w-4xl mx-auto ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t.keyServicesText}
              </motion.p>
            </div>

            <div className="grid-responsive">
              {keyServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <Link href={service.href}>
                    <div className={`relative h-full p-8 group cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' 
                        : 'bg-white border border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
                      
                      <div className="relative h-full flex flex-col">
                        <div className="text-6xl mb-6">{service.icon}</div>
                        <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {service.title[language]}
                        </h3>
                        <p className={`text-base leading-relaxed flex-grow ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {service.description[language]}
                        </p>
                        
                        <div className={`mt-6 flex items-center font-semibold group-hover:scale-105 transition-all duration-200 ${
                          isDarkMode 
                            ? 'text-blue-400 group-hover:text-blue-300' 
                            : 'text-blue-600 group-hover:text-blue-700'
                        }`}>
                          <span>{t.accessService}</span>
                          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Slider */}
        <section className={`section-padding ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto container-padding">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div
                className={`feature-slider relative h-96 md:h-[600px] ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                } rounded-2xl overflow-hidden`}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    className={`absolute inset-0 flex items-center ${
                      index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: index === currentSlide ? 1 : 0,
                      scale: index === currentSlide ? 1 : 0.9,
                      x: index === currentSlide
                        ? 0
                        : index < currentSlide
                        ? -100
                        : 100
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-12">
                      <div className="flex flex-col justify-center">
                        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {feature.title}
                        </h2>
                        <p className="text-xl md:text-2xl lg:text-3xl text-orange-600 mb-8 font-semibold">
                          {feature.subtitle}
                        </p>
                        <p
                          className={`text-lg md:text-xl leading-relaxed ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          {feature.description}
                        </p>
                      </div>
                      <div className="relative h-full flex items-center justify-center">
                        <motion.div
                          className="w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <button
                  onClick={prevSlide}
                  className={`absolute left-6 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode
                      ? 'bg-gray-800/80 hover:bg-gray-700/90 text-white'
                      : 'bg-white/80 hover:bg-white/90 text-gray-900'
                  } rounded-full p-3 z-20 transition-all shadow-lg focus-ring`}
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className={`absolute right-6 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode
                      ? 'bg-gray-800/80 hover:bg-gray-700/90 text-white'
                      : 'bg-white/80 hover:bg-white/90 text-gray-900'
                  } rounded-full p-3 z-20 transition-all shadow-lg focus-ring`}
                  aria-label="Next slide"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>

                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-4 h-4 rounded-full transition-all ${
                        index === currentSlide
                          ? 'bg-orange-500'
                          : isDarkMode
                          ? 'bg-white/50'
                          : 'bg-gray-900/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className={`section-padding ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto container-padding">
            <div className="text-center space-section">
              <motion.h2 
                className={`responsive-heading font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {t.ourCommitment}
              </motion.h2>
              <motion.p
                className={`responsive-text max-w-5xl mx-auto leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t.commitmentText}
              </motion.p>
            </div>

            <div className="grid-responsive">
              {[
                {
                  title: t.transparency,
                  icon: "🔍",
                  description:
                    "Immutable ledger technology provides unalterable records of permits, production volumes, and financial transactions for all stakeholders."
                },
                {
                  title: t.efficiency,
                  icon: "⚙️",
                  description:
                    "Machine learning algorithms optimize application processing, resource assessment, and compliance verification, reducing administrative overhead by up to 70%."
                },
                {
                  title: t.sustainability,
                  icon: "🌱",
                  description:
                    "Advanced monitoring systems integrate with restoration planning tools to minimize ecological impact and enhance post-mining land rehabilitation."
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className={`relative p-8 text-center rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' 
                      : 'bg-white border border-gray-200 hover:border-gray-300'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    boxShadow: isDarkMode 
                      ? "0 20px 40px rgba(0, 0, 0, 0.3)" 
                      : "0 20px 40px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <div className="text-6xl mb-6">{feature.icon}</div>
                  <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                  <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-12 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-800'
      }`}>
        <div className="max-w-7xl mx-auto container-padding text-center">
          <p className={`text-base ${
            isDarkMode ? 'text-gray-400' : 'text-gray-300'
          }`}>
            &copy; {new Date().getFullYear()} CeylonMine. {t.userFooter}
          </p>
        </div>
      </footer>
    </div>
  );
}