import React from 'react';
import { PageWrapper } from '../components/Layout';
import { ContactForm } from '../components/ContactForm';
import { Mail, Facebook, Instagram, Linkedin, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  return (
    <PageWrapper>
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
          Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--white)] to-[var(--gold)]">Talk</span>
        </h1>
        <p className="text-[var(--white-60)] max-w-2xl mx-auto text-lg">
          Down to chat anytime—tech stuff, business ideas, the latest phone drops, GPU specs, whatever. My DMs are open fr fr.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
        
        {/* Left Column: Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
            {/* Info Card */}
            <div className="bg-[var(--black-800)]/50 border border-[var(--black-600)] rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-[var(--gold)]/20 transition-colors duration-500" />
                
                <h3 className="text-2xl font-bold text-[var(--white)] mb-6 relative z-10">Hit Me Up</h3>
                
                <div className="space-y-6 relative z-10">
                    <a href="mailto:shababahmedtazin2021@gmail.com" className="flex items-center gap-4 text-[var(--white-90)] hover:text-[var(--gold)] transition-colors group/item">
                        <div className="p-3 bg-[var(--black-700)] rounded-xl border border-[var(--black-600)] group-hover/item:border-[var(--gold)]/50 group-hover/item:bg-[var(--gold)]/10 transition-all duration-300">
                            <Mail size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-[var(--white-60)] uppercase tracking-wider">Email</p>
                            <p className="font-medium break-all">shababahmedtazin2021@gmail.com</p>
                        </div>
                    </a>

                    <div className="flex items-center gap-4 text-[var(--white-90)] group/item">
                        <div className="p-3 bg-[var(--black-700)] rounded-xl border border-[var(--black-600)] group-hover/item:border-[var(--silver)]/50 group-hover/item:bg-[var(--silver)]/10 transition-all duration-300">
                            <MessageSquare size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-[var(--white-60)] uppercase tracking-wider">Note</p>
                            <p className="font-medium">I usually reply pretty fast.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/shababahmedtzn", color: "hover:text-[#E1306C] hover:border-[#E1306C]" },
                    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/shababahmedtzn/", color: "hover:text-[#1877F2] hover:border-[#1877F2]" },
                    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/shabab-ahmed-935a96383?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", color: "hover:text-[#0A66C2] hover:border-[#0A66C2]" }
                ].map((social, idx) => (
                    <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center justify-center p-6 bg-[var(--black-700)] border border-[var(--black-600)] rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${social.color} group`}
                    >
                        <social.icon size={28} className="text-[var(--white-90)] mb-2 transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-xs font-medium text-[var(--white-60)] group-hover:opacity-100">{social.label}</span>
                    </a>
                ))}
            </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-full"
        >
            <ContactForm />
        </motion.div>

      </div>
    </PageWrapper>
  );
};