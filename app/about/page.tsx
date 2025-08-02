'use client';
import React, { useEffect, useRef, useState } from 'react';
import Navbar from "../navbar/page";
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';

// Define the type for the CustomEvent detail
type ThemeChangeEvent = CustomEvent<{ isDarkMode: boolean }>;

export default function AboutUs() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const scrollRef = useRef(null);

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Add event listener for theme changes from navbar
    const handleThemeChange = (event: ThemeChangeEvent) => {
      setIsDarkMode(event.detail.isDarkMode);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
    };
  }, []);

  // Scroll-based animations
  useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Senuji De Silva",
      position: "Co-Founder & Lead Developer",
      image: "/images/senuji.png",
      bio: "With a passion for innovation and sustainability, Senuji co-founded Ceylon Mine to modernize mining operations through technology. She leads the development of intelligent systems that optimize efficiency, transparency, and compliance in the industry.",
      socialLinks: {
         linkedin: "#",
        instagram: "#"
      }
    },
    {
      id: 2,
      name: "Minsandi De Silva",
      position: "Co-Founder & Software Solutions Lead",
      image: "/images/minsandi.jpg",
      bio: "Driven by a vision for digital transformation, Minsandi ensures that Ceylon Mine bridges the gap between technology and the mining sector. She oversees project execution, ensuring seamless integration of automation and user-centric solutions.",
      socialLinks: {
         linkedin: "#",
        instagram: "#"
      }
    },
    {
      id: 3,
      name: "Nisil Liyanage",
      position: "Software Architect & Backend Specialist",
      image: "/images/nisil2.jpg",
      bio: "Nisil specializes in developing scalable and secure infrastructures for enterprise applications. At Ceylon Mine, he focuses on building a reliable, data-driven platform that enhances efficiency in mining operations.",
      socialLinks: {
          linkedin: "#",
         instagram: "#"
       }
     },
     {
       id: 4,
       name: "Thisal De Silva",
       position: "Frontend Developer & UI/UX Specialist",
       image: "/images/thisal2.jpg",
       bio: "Thisal brings creativity and technical expertise to Ceylon Mine's user interface design. He ensures that our platform is not only functional but also intuitive and accessible to all users, from mining professionals to government officials.",
       socialLinks: {
          linkedin: "#",
         instagram: "#"
       }
     },
     {
       id: 5,
       name: "Janidu De Silva",
       position: "Full Stack Developer & System Integrator",
       image: "/images/janidu.jpg",
       bio: "Janidu excels in creating seamless connections between different systems and technologies. At Ceylon Mine, he works on integrating various mining management tools into a cohesive, efficient platform.",
       socialLinks: {
         linkedin: "#",
         instagram: "#"
       }
     },
     {
       id: 6,
       name: "Banu De Silva",
       position: "Data Analyst & Business Intelligence Lead",
       image: "/images/Banu.png",
       bio: "Banu transforms complex mining data into actionable insights. She develops analytics tools that help stakeholders make informed decisions about mining operations, compliance, and resource management.",
       socialLinks: {
          linkedin: "#",
         instagram: "#"
       }
     },
     {
       id: 7,
       name: "Suresh De Silva",
       position: "DevOps Engineer & Infrastructure Specialist",
       image: "/images/Suresh.png",
       bio: "Suresh ensures that Ceylon Mine's platform runs smoothly and securely. He manages our cloud infrastructure, deployment processes, and system monitoring to maintain high availability and performance.",
       socialLinks: {
         linkedin: "#",
         instagram: "#"
       }
     }
   ];

   // Social media icon component
   const SocialIcon = ({ platform }: { platform: string }) => {
     const icons = {
       linkedin: (
         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
           <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
         </svg>
       ),
       instagram: (
         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
           <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244z"/>
         </svg>
       ),
       twitter: (
         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
           <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
         </svg>
       ),
       github: (
         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
           <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
         </svg>
       )
     };

     return icons[platform as keyof typeof icons] || null;
   };

   return (
     <div
       className={`min-h-screen ${
         isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
       } scrollbar-thin`}
       ref={scrollRef}
     >
       <Navbar />

       <main className="relative z-10 pt-20">
         {/* Hero Section */}
         <section className="section-padding bg-gradient-to-br from-blue-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
           <div className="max-w-7xl mx-auto container-padding">
             <div className="text-center space-section">
               <motion.h1
                 className="responsive-heading font-bold mb-8 bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8 }}
               >
                 About CeylonMine
               </motion.h1>
               <motion.p
                 className={`responsive-text max-w-4xl mx-auto leading-relaxed ${
                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
                 }`}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
               >
                 We are a dedicated team of innovators committed to revolutionizing Sri Lanka's mining industry through cutting-edge digital solutions. Our platform combines advanced technology with deep industry knowledge to create a more transparent, efficient, and sustainable mining ecosystem.
               </motion.p>
             </div>
           </div>
         </section>

         {/* Mission & Vision Section */}
         <section className="section-padding">
           <div className="max-w-7xl mx-auto container-padding">
             <div className="grid-responsive">
               <motion.div
                 className="card card-hover p-8"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6 }}
                 viewport={{ once: true }}
               >
                 <div className="text-4xl mb-6">🎯</div>
                 <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h3>
                 <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                   To digitize and modernize Sri Lanka's mining sector by providing comprehensive digital solutions that enhance transparency, efficiency, and compliance while promoting sustainable mining practices.
                 </p>
               </motion.div>

               <motion.div
                 className="card card-hover p-8"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.1 }}
                 viewport={{ once: true }}
               >
                 <div className="text-4xl mb-6">🔮</div>
                 <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Vision</h3>
                 <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                   To become the leading digital platform for mining management in South Asia, setting new standards for transparency, efficiency, and environmental responsibility in the mining industry.
                 </p>
               </motion.div>

               <motion.div
                 className="card card-hover p-8"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 viewport={{ once: true }}
               >
                 <div className="text-4xl mb-6">💎</div>
                 <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Values</h3>
                 <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                   Innovation, transparency, sustainability, and excellence drive everything we do. We believe in creating solutions that benefit all stakeholders while protecting our environment for future generations.
                 </p>
               </motion.div>
             </div>
           </div>
         </section>

         {/* Team Section */}
         <section className={`section-padding ${
           isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
         }`}>
           <div className="max-w-7xl mx-auto container-padding">
             <div className="text-center space-section">
               <motion.h2
                 className="responsive-heading font-bold mb-8"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6 }}
                 viewport={{ once: true }}
               >
                 Meet Our Team
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
                 Our diverse team of experts brings together technical excellence, industry knowledge, and a shared passion for innovation to deliver exceptional solutions for the mining sector.
               </motion.p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {teamMembers.map((member, index) => (
                 <motion.div
                   key={member.id}
                   className="card card-hover p-6 text-center"
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: index * 0.1 }}
                   viewport={{ once: true }}
                   whileHover={{ y: -8, transition: { duration: 0.3 } }}
                 >
                   <div className="relative mb-6">
                     <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg">
                       <Image
                         src={member.image}
                         alt={member.name}
                         width={128}
                         height={128}
                         className="w-full h-full object-cover"
                       />
                     </div>
                   </div>
                   
                   <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                     {member.name}
                   </h3>
                   <p className="text-orange-600 dark:text-orange-400 font-medium mb-4">
                     {member.position}
                   </p>
                   <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                     {member.bio}
                   </p>
                   
                   <div className="flex justify-center space-x-4">
                     {Object.entries(member.socialLinks).map(([platform, url]) => (
                       <a
                         key={platform}
                         href={url}
                         className={`p-2 rounded-lg transition-all duration-200 ${
                           isDarkMode 
                             ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
                             : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                         }`}
                         target="_blank"
                         rel="noopener noreferrer"
                       >
                         <SocialIcon platform={platform} />
                       </a>
                     ))}
                   </div>
                 </motion.div>
               ))}
             </div>
           </div>
         </section>

         {/* Contact CTA Section */}
         <section className="section-padding">
           <div className="max-w-7xl mx-auto container-padding">
             <motion.div
               className="card card-hover p-12 text-center"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
             >
               <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                 Ready to Transform Your Mining Operations?
               </h3>
               <p className={`text-lg mb-8 max-w-2xl mx-auto ${
                 isDarkMode ? 'text-gray-300' : 'text-gray-600'
               }`}>
                 Join us in revolutionizing the mining industry with cutting-edge digital solutions. Get in touch to learn how CeylonMine can benefit your operations.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <a
                   href="/contact"
                   className="btn-primary inline-flex items-center justify-center"
                 >
                   Contact Us
                   <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                   </svg>
                 </a>
                 <a
                   href="/sign"
                   className="btn-secondary inline-flex items-center justify-center"
                 >
                   Get Started
                   <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                   </svg>
                 </a>
               </div>
             </motion.div>
           </div>
         </section>
       </main>
     </div>
   );
}