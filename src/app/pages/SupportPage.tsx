import { useState } from "react";
import { motion } from "motion/react";
import { HelpCircle, Mail, Phone, MessageSquare, Send, ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

export function SupportPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: 'How does the AI detection system work?',
      answer: 'Our AI system uses advanced computer vision and deep learning algorithms to analyze video feeds in real-time. It has been trained on thousands of Jallikattu event recordings to identify patterns associated with foul play, including excessive force, unauthorized tools, and rule violations.'
    },
    {
      question: 'What happens when foul play is detected?',
      answer: 'When the AI detects potential foul play with high confidence (above your configured threshold), it immediately triggers an alert. This alert is displayed on the dashboard, logged in the history, and can send notifications via email, SMS, or push notifications based on your settings.'
    },
    {
      question: 'Can I upload past footage for analysis?',
      answer: 'Yes! The Media Upload feature allows you to upload images or videos from past events. The AI will analyze the content and provide a detailed report indicating whether foul play was detected, along with confidence scores and specific details about any violations found.'
    },
    {
      question: 'How accurate is the AI detection?',
      answer: 'Our AI system maintains an accuracy rate of 90-95% based on extensive testing. The system provides confidence scores with each detection, allowing you to set custom thresholds. We continuously improve the model based on feedback and new training data.'
    },
    {
      question: 'Can I adjust the sensitivity of alerts?',
      answer: 'Absolutely! In the Settings page, you can configure alert sensitivity levels (Low, Medium, High), detection thresholds, and AI confidence thresholds. This allows you to balance between catching all potential violations and reducing false positives.'
    },
    {
      question: 'How long is footage stored?',
      answer: 'Storage duration can be configured in the Settings page, with options ranging from 7 days to 90 days. All detected violations are automatically saved, and you can manually save any footage for longer retention.'
    },
    {
      question: 'Is the system operational 24/7?',
      answer: 'Yes, the Jallikattu AI Surveillance System operates continuously, 24/7. All cameras are monitored simultaneously, and the AI processes feeds in real-time without any downtime.'
    },
    {
      question: 'Can I export history and logs?',
      answer: 'Yes, the History & Logs page includes an export feature that allows you to download all events, alerts, and analysis results in various formats (CSV, PDF, JSON) for record-keeping and reporting purposes.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Support request submitted successfully! Our team will contact you within 24 hours.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Customer Support</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Get help with the Jallikattu AI Surveillance System
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6"
        >
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Contact Us</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">Email Support</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">support@jallikattu-ai.com</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">Response within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">Phone Support</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">+91 1800 XXX XXXX</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">Mon-Fri, 9 AM - 6 PM IST</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">Live Chat</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Available on dashboard</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">Real-time assistance</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-br from-red-500/10 to-orange-500/10 dark:from-red-500/5 dark:to-orange-500/5 border border-red-200 dark:border-red-900/30 rounded-lg">
            <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-1">Emergency Support</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              For critical system issues during active events, call our 24/7 emergency hotline at +91 1800 999 0000
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6"
        >
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                placeholder="Describe your issue or question..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium hover:from-red-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                className="w-full p-4 flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left"
              >
                <span className="font-medium text-zinc-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                {expandedFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-zinc-500 dark:text-zinc-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-500 dark:text-zinc-400 flex-shrink-0" />
                )}
              </button>
              
              <AnimatePresence>
                {expandedFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Support Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-900/30 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">Getting the Most from Support</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <div>
            <p className="font-medium text-zinc-900 dark:text-white mb-1">Before Contacting Support:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Check the FAQ section above</li>
              <li>Review your system settings</li>
              <li>Note any error messages or codes</li>
              <li>Have your system details ready</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-zinc-900 dark:text-white mb-1">When Reporting Issues:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Describe the issue in detail</li>
              <li>Include timestamps of incidents</li>
              <li>Specify which camera or feature</li>
              <li>Attach screenshots if possible</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
