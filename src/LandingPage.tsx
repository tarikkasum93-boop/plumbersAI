import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, CheckCircle, Loader2 } from 'lucide-react';

interface LandingPageProps {
  onRegister: () => void;
}

const RaionBrand = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col items-center flex-shrink-0 ${className}`}>
    <img 
      src="https://cdn.prod.website-files.com/69540a85684e18c663c98e2d/69540a87684e18c663c99137_a4e7569f8eecee9641205b4d8b83864a_Logo.png" 
      alt="Raion" 
      className="h-12 object-contain"
      referrerPolicy="no-referrer"
    />
  </div>
);

export function LandingPage({ onRegister }: LandingPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    raionUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Replace this with the deployed Google Apps Script Webhook URL
  const WEBHOOK_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL_HERE'; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // If you haven't deployed the script yet, you can bypass the check by un-commenting the following two lines:
    // onRegister();
    // return;

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors', // Critical for sending data to Google Apps Script successfully from frontend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      // With no-cors, we can't read the response properly, so we assume success if no error is thrown
      onRegister();
    } catch (err) {
      console.error(err);
      setError('An error occurred while submitting the form. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] flex flex-col items-center justify-center p-4 font-sans text-slate-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="mb-8 flex justify-center">
          <RaionBrand />
        </div>
        
        <div className="bg-[#0A0C10] border border-[#232836] p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#346EE0] to-[#8B5CF6]"></div>
          
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold font-display text-slate-100 mb-2">AI Plumber Masterclass</h1>
            <p className="text-sm text-slate-400">Advanced Data Center Cooling Solutions</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">First Name</label>
              <input
                required
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-[#141A29] border border-[#232836] rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#346EE0] focus:ring-1 focus:ring-[#346EE0] transition-colors"
                placeholder="Enter your first name"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Last Name</label>
              <input
                required
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-[#141A29] border border-[#232836] rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#346EE0] focus:ring-1 focus:ring-[#346EE0] transition-colors"
                placeholder="Enter your last name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Email Address</label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#141A29] border border-[#232836] rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#346EE0] focus:ring-1 focus:ring-[#346EE0] transition-colors"
                placeholder="you@domain.com"
              />
            </div>

            <div>
              <label htmlFor="raionUrl" className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Raion Profile URL</label>
              <input
                required
                type="url"
                id="raionUrl"
                name="raionUrl"
                value={formData.raionUrl}
                onChange={handleChange}
                className="w-full bg-[#141A29] border border-[#232836] rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#346EE0] focus:ring-1 focus:ring-[#346EE0] transition-colors"
                placeholder="https://raion.io/profile/..."
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm mt-2 text-center bg-red-900/20 p-2 rounded border border-red-900/50">
                {error}
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#346EE0] to-[#2653A8] hover:from-[#407BFF] hover:to-[#2B60C4] text-white font-bold py-3 px-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Access Masterclass
                    <BookOpen size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-8 pt-6 border-t border-[#232836] flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <CheckCircle size={16} className="text-[#346EE0] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400">Exclusive access to advanced liquid cooling topologies and predictive maintenance protocols.</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={16} className="text-[#346EE0] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400">Interactive simulations and real-world telemetry analysis exercises.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
