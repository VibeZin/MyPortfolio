import React, { useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, AlertCircle, User, Mail, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactForm: React.FC = () => {
  // Replace "YOUR_FORM_ID" with your actual Formspree form ID
  const [state, handleSubmit] = useForm("YOUR_FORM_ID");

  useEffect(() => {
    if (state.succeeded) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c0c0c0', '#e8e8e8', '#FFFFFF'],
        disableForReducedMotion: true
      });
    }
  }, [state.succeeded]);

  const inputClasses = "w-full pl-12 pr-4 py-4 bg-[var(--black-700)] border border-[var(--black-600)] rounded-xl focus:border-[var(--silver)] focus:ring-1 focus:ring-[var(--silver)] outline-none transition-all duration-300 placeholder:text-[var(--white-30)] text-[var(--white-90)] group-hover:border-[var(--white-30)]";
  const iconClasses = "absolute left-4 top-4 text-[var(--white-60)] group-focus-within:text-[var(--silver)] transition-colors duration-300";

  if (state.succeeded) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full flex flex-col items-center justify-center text-center p-8 bg-[var(--black-800)] border border-[var(--black-600)] rounded-2xl backdrop-blur-md"
      >
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-green-500/10">
          <CheckCircle className="text-green-500" size={40} />
        </div>
        <h3 className="text-2xl font-display font-bold text-[var(--white)] mb-2">Message Sent!</h3>
        <p className="text-[var(--white-60)]">
          Thank you for reaching out. I'll get back to you within 24 hours.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-8 px-6 py-2 text-sm text-[var(--white-60)] hover:text-[var(--white)] transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-[var(--black-800)] border border-[var(--black-600)] rounded-2xl p-8 backdrop-blur-md h-full">
        <h3 className="text-2xl font-display font-bold text-[var(--white)] mb-6">Send a Message</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="group relative">
                <User size={20} className={iconClasses} />
                <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className={inputClasses}
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="mt-1 text-red-400 text-xs flex items-center gap-1" />
            </div>

            {/* Email Field */}
            <div className="group relative">
                <Mail size={20} className={iconClasses} />
                <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className={inputClasses}
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-red-400 text-xs flex items-center gap-1" />
            </div>

            {/* Message Field */}
            <div className="group relative">
                <MessageSquare size={20} className={iconClasses} />
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className={inputClasses}
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="mt-1 text-red-400 text-xs flex items-center gap-1" />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={state.submitting}
                className="w-full py-4 bg-gradient-to-r from-[var(--silver)] to-[var(--silver-dark)] text-black font-bold rounded-xl shadow-lg shadow-[var(--silver-glow)] hover:shadow-[var(--silver-dark)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
                {state.submitting ? (
                    <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Sending...</span>
                    </>
                ) : (
                    <>
                        <span>Send Message</span>
                        <Send size={20} />
                    </>
                )}
            </button>
            
            {state.errors && state.errors.length > 0 && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    <span>Something went wrong. Please try again.</span>
                </div>
            )}
        </form>
    </div>
  );
};
