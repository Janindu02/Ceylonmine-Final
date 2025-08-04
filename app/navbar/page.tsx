"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef, useMemo } from 'react'
import { usePathname } from 'next/navigation'

interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  role?: string; // Add role property
}

function getInitialDarkMode() {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false; // Default to light mode for SSR
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);
  const [language, setLanguage] = useState<'en' | 'si' | 'ta'>('en') // Default language
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Authentication state
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [authLanguage, setAuthLanguage] = useState(language);
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Check if we're on the home page
  const isHomePage = pathname === '/'

  // Scroll effect for background color
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Enhanced auth state check
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      let userId = null;
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          userId = userData.id;
        } catch (e) {
          handleLogout();
        }
      }
      if (userId) {
        // Fetch latest profile from backend
        try {
          const res = await fetch('/api/auth/me', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
          });
          const result = await res.json();
          if (result.profile) {
            setIsLoggedIn(true);
            setUserData(result.profile);
            localStorage.setItem('user', JSON.stringify(result.profile));
            setAuthLanguage(language);
            return;
          }
        } catch (e) {
          // fallback to logout
          handleLogout();
        }
      }
      setIsLoggedIn(false);
      setUserData(null);
    };

    checkAuth();

    const handleAuthChange = () => {
      checkAuth();
      setAuthLanguage(language); // Force auth text update
    };

    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('languageChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('languageChange', handleAuthChange);
    };
  }, [language]); // Add language as dependency

  // Handle logout
  const handleLogout = () => {
    // Clear auth token cookie
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict';
    
    // Clear user data from localStorage
    localStorage.removeItem('user');
    
    setIsLoggedIn(false);
    setUserData(null);
    setProfileDropdownOpen(false);
    
    // Dispatch auth change event
    window.dispatchEvent(new CustomEvent('authChange'));
    
    // Redirect to home page
    window.location.href = '/';
  };

  // Theme toggle logic
  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)

    if (newTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { isDarkMode: newTheme } }))
  }

  // Language toggle logic
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'si' : language === 'si' ? 'ta' : 'en'
    setLanguage(newLang)
    localStorage.setItem('language', newLang)
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: newLang } }))
  }

  // Initialize theme & language from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark)
    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { isDarkMode: isDark } }))

    const savedLang = localStorage.getItem('language') || 'en'
    setLanguage(savedLang as 'en' | 'si' | 'ta')
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: savedLang } }))
  }, [])

  // Listen for theme changes from other components
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setIsDarkMode(event.detail.isDarkMode)
    }

    window.addEventListener('themeChange', handleThemeChange as EventListener)
    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener)
    }
  }, [])

  // Navigation items - reorganized for better spacing
  const navItemsEn = [
    { name: 'Home', path: '/' },
    { name: 'Map', path: '/map' },
    { name: 'Minebot', path: '/minebot' },
    { name: 'Royalty', path: '/royalty' },
    { name: 'Complains', path: '/complains' },
    { name: 'Licenses', path: '/license-portal' },
    { name: 'Minemore', path: '/minemore' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  const navItemsSi = [
    { name: 'මුල් පිටුව', path: '/' },
    { name: 'සිතියම', path: '/map' },
    { name: 'ඛණිජා', path: '/minebot' },
    { name: 'රාජකීය ගාස්තු', path: '/royalty' },
    { name: 'පැමිණිලි', path: '/complains' },
    { name: 'බලපත්‍ර', path: '/license-portal' },
    { name: 'දැනුම', path: '/minemore' },
    { name: 'අපි ගැන', path: '/about' },
    { name: 'අප හා සම්බන්ධ වන්න', path: '/contact' }
  ]

  const navItemsTa = [
    { name: 'முகப்பு', path: '/' },
    { name: 'வரைபடம்', path: '/map' },
    { name: 'கனிபொட்', path: '/minebot' },
    { name: 'ராஜதந்திரக் கட்டணம்', path: '/royalty' },
    { name: 'புகார்கள்', path: '/complains' },
    { name: 'உரிமங்கள்', path: '/license-portal' },
    { name: 'அறிவு', path: '/minemore' },
    { name: 'எங்களைப் பற்றி', path: '/about' },
    { name: 'எங்களை தொடர்பு கொள்ள', path: '/contact' }
  ]

  const navItems = language === 'en' ? navItemsEn : language === 'si' ? navItemsSi : navItemsTa

  // Auth related text based on language and auth state
  const authText = useMemo(() => ({
    signup: authLanguage === 'en' ? 'Sign Up' : authLanguage === 'si' ? 'ලියාපදිංචි වන්න' : 'பதிவு செய்யுங்கள்',
    dashboard: authLanguage === 'en' ? 'Dashboard' : authLanguage === 'si' ? 'උපකරණ පුවරුව' : 'டாஷ்போர்டு',
    logout: authLanguage === 'en' ? 'Logout' : authLanguage === 'si' ? 'පිටවීම' : 'வெளியேறு',
    profile: authLanguage === 'en' ? 'Profile' : authLanguage === 'si' ? 'පැතිකඩ' : 'சுயவிவரம்'
  }), [authLanguage]);

  // Get display name
  const getDisplayName = () => {
    if (userData && userData.firstName) {
      return `${userData.firstName}`
    }
    return authText.profile
  }

  // Framer Motion variants
  const navAnimation = {
    hidden: { y: -20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemAnimation = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  // Determine text color based on scroll state and home page
  const getNavTextColor = () => {
    if (isHomePage && !scrolled) {
      return 'text-white hover:text-blue-200'
    }
    if (isDarkMode) {
      return 'text-gray-300 hover:text-blue-400'
    }
    return 'text-gray-700 hover:text-blue-600'
  }

  const getLogoTextColor = () => {
    if (isHomePage && !scrolled) {
      return 'text-white'
    }
    return 'text-blue-600 dark:text-blue-400'
  }

  const getLogoSubtextColor = () => {
    if (isHomePage && !scrolled) {
      return 'text-gray-200'
    }
    return 'text-gray-600 dark:text-gray-400'
  }

  return (
    <motion.nav
      initial="hidden"
      animate="show"
      variants={navAnimation}
      className={`
        fixed w-full z-50 transition-all duration-300
        ${scrolled
          ? (isDarkMode 
              ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700' 
              : 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg')
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <motion.div
            variants={itemAnimation}
            className="flex-shrink-0 flex items-center"
          >
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image 
                  src="/favicon.ico" 
                  alt="CeylonMine Logo" 
                  width={48} 
                  height={48} 
                  className="group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="ml-3">
                <h1 className={`text-xl font-bold ${getLogoTextColor()} group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors`}>
                  CeylonMine
                </h1>
                <p className={`text-xs ${getLogoSubtextColor()} font-medium`}>
                  Government Mining Platform
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Improved spacing and layout */}
          <motion.div 
            variants={itemAnimation}
            className="hidden lg:flex items-center space-x-2"
          >
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={item.path}>
                  <span
                    className={`
                      px-3 py-2 rounded-lg font-medium text-sm
                      ${getNavTextColor()}
                      ${scrolled && isDarkMode ? 'hover:bg-gray-800' : scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'}
                      transition-all duration-200
                    `}
                  >
                    {item.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-2 rounded-lg font-medium text-sm transition-all duration-200 focus-ring
                ${isHomePage && !scrolled
                  ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                  : isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }
              `}
              title="Switch Language"
            >
              {language === 'en' ? 'EN' : language === 'si' ? 'සි' : 'த'}
            </motion.button>

            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-2 rounded-lg transition-all duration-200 focus-ring
                ${isHomePage && !scrolled
                  ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                  : isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }
              `}
              title="Toggle Dark/Light Mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </motion.button>

            {/* Authentication Section */}
            <div className="hidden md:flex items-center">
              {!isLoggedIn ? (
                <motion.div variants={itemAnimation}>
                  <Link href="/sign">
                    <motion.span
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        inline-flex items-center space-x-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200
                        ${isHomePage && !scrolled
                          ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30'
                          : 'btn-primary'
                        }
                      `}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span>{authText.signup}</span>
                    </motion.span>
                  </Link>
                </motion.div>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-2 rounded-lg flex items-center space-x-2 transition-all duration-200 focus-ring
                      ${isHomePage && !scrolled
                        ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30'
                        : isDarkMode 
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }
                      border-2 ${isLoggedIn ? 'border-green-500' : 'border-blue-500'}
                    `}
                  >
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      <svg
                        className={`w-5 h-5 ${isLoggedIn ? 'text-green-500' : 'text-blue-500'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {isLoggedIn && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>
                  </motion.button>

                  {/* Profile Dropdown Menu */}
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`
                        absolute right-0 mt-3 w-64 rounded-xl shadow-2xl py-2
                        ${isDarkMode 
                          ? 'bg-gray-800 border border-gray-700' 
                          : 'bg-white border border-gray-200'
                        }
                      `}
                    >
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {getDisplayName()}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {userData?.email}
                        </p>
                      </div>
                      
                      {userData?.role === 'miner' && (
                        <Link href="/constructor">
                          <span 
                            className={`
                              block px-4 py-3 text-sm font-medium transition-colors duration-200
                              ${isDarkMode 
                                ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                              }
                            `}
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <div className="flex items-center space-x-3">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                              <span>{authText.dashboard}</span>
                            </div>
                          </span>
                        </Link>
                      )}
                      
                      <button 
                        onClick={handleLogout}
                        className={`
                          block w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-200
                          ${isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>{authText.logout}</span>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                  p-2 rounded-lg transition-all duration-200 focus-ring
                  ${isHomePage && !scrolled
                    ? 'text-white hover:bg-white/20 backdrop-blur-sm'
                    : isDarkMode 
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
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
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className={`
            lg:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isDarkMode 
              ? 'bg-gray-800 border-t border-gray-700' 
              : 'bg-gray-50 border-t border-gray-200'
            }
            rounded-b-xl shadow-lg
          `}
        >
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                variants={itemAnimation}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={item.path}>
                  <span
                    className={`
                      block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200
                      ${isDarkMode 
                        ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                      }
                    `}
                  >
                    {item.name}
                  </span>
                </Link>
              </motion.div>
            ))}

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              {isLoggedIn ? (
                <div className="space-y-3">
                  {userData?.role === 'miner' && (
                    <Link href="/constructor">
                      <span
                        className={`
                          block w-full text-center px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200
                          ${isDarkMode 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                          }
                        `}
                      >
                        {authText.dashboard}
                      </span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center btn-primary text-sm font-semibold"
                  >
                    {authText.logout}
                  </button>
                </div>
              ) : (
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Link href="/sign">
                    <span className="block w-full text-center btn-primary text-sm font-semibold">
                      {authText.signup}
                    </span>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}