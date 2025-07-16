"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sparkles,
  Shield,
  Star,
  Award,
  Users,
  Search,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  HelpCircle,
  Book,
  CreditCard,
  Settings,
  FileText,
  Lock,
  Smartphone,
} from "lucide-react"

export default function HelpCenter() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const categories = [
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Getting Started",
      description: "Learn how to set up your account and connect your banks",
      articles: 12,
      color: "from-[#BEF397] to-[#7DD3FC]",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Bank Connections",
      description: "Troubleshoot bank linking and security questions",
      articles: 8,
      color: "from-[#7DD3FC] to-[#E5B1FD]",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Tax Deductions",
      description: "Understanding your deductions and ATO compliance",
      articles: 15,
      color: "from-[#E5B1FD] to-[#BEF397]",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Security & Privacy",
      description: "How we protect your financial data",
      articles: 6,
      color: "from-[#BEF397] to-[#7DD3FC]",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile App",
      description: "Using moulai on your phone or tablet",
      articles: 9,
      color: "from-[#7DD3FC] to-[#E5B1FD]",
    },
    {
      icon: <Book className="w-8 h-8" />,
      title: "Account Management",
      description: "Billing, subscriptions, and account settings",
      articles: 10,
      color: "from-[#E5B1FD] to-[#BEF397]",
    },
  ]

  const faqs = [
    {
      question: "How does moulai find my tax deductions?",
      answer:
        "Our AI analyzes every transaction in your connected bank accounts and credit cards, categorizing expenses using ANZSIC codes and identifying potential tax deductions based on Australian Tax Office guidelines. The system learns from patterns in your spending and compares against a database of allowable deductions for your industry and situation.",
    },
    {
      question: "Is my financial data secure?",
      answer:
        "Absolutely. We use bank-level 256-bit SSL encryption and are SOC 2 compliant. We only have read-only access to your accounts, meaning we can see your transactions but cannot move money or make changes. Your data is stored in encrypted Australian data centers and we never share your information with third parties.",
    },
    {
      question: "Which banks are supported?",
      answer:
        "We support all major Australian banks including Commonwealth Bank, Westpac, ANZ, NAB, ING, Bendigo Bank, and over 200 other financial institutions. We use secure Open Banking protocols where available and established aggregation services for other banks.",
    },
    {
      question: "How accurate are the deduction suggestions?",
      answer:
        "Our AI has a 98% accuracy rate in identifying legitimate tax deductions. All suggestions are based on current ATO guidelines and are reviewed by our team of certified public accountants. However, we always recommend consulting with a tax professional for complex situations.",
    },
    {
      question: "Can I export my deductions to my tax software?",
      answer:
        "Yes! You can export your deduction reports in formats compatible with popular tax software including TurboTax, H&R Block, and professional accounting software. We also provide detailed PDF reports that you can give directly to your accountant.",
    },
    {
      question: "What if I find an error in my deductions?",
      answer:
        "You can easily review, edit, or remove any deduction suggestion through your dashboard. Our system learns from your corrections to improve future suggestions. If you need help, our support team is available to assist with any questions about specific deductions.",
    },
    {
      question: "How much does moulai cost?",
      answer:
        "We offer a free plan that includes basic deduction detection for up to $500 in deductions. Our Professional plan is $19/month with unlimited deductions and advanced features. Business plans start at $49/month. All plans include a free trial period.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes, we offer a 30-day money-back guarantee on all paid plans. If you're not satisfied with the deductions we find, we'll refund your subscription fee. Most customers find significantly more deductions than they expected, often paying for the service many times over.",
    },
  ]

  const contactOptions = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Available 9am-6pm AEST",
      action: "Start Chat",
      color: "from-[#BEF397] to-[#7DD3FC]",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 2 hours",
      action: "Send Email",
      color: "from-[#7DD3FC] to-[#E5B1FD]",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "1800 MOULAI (668524)",
      action: "Call Now",
      color: "from-[#E5B1FD] to-[#BEF397]",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#BEF397] to-[#7DD3FC] rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <span className="text-[#BEF397] text-2xl font-bold">moulai.</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-zinc-300 hover:text-white transition-colors">
                Home
              </a>
              <a href="/help" className="text-[#BEF397] font-medium">
                Help Center
              </a>
              <a href="/privacy" className="text-zinc-300 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-zinc-300 hover:text-white transition-colors">
                Terms
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/welcome?mode=login")}
                className="text-zinc-300 hover:text-white"
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/welcome?mode=signup")}
                className="bg-gradient-to-r from-[#BEF397] to-[#7DD3FC] text-black hover:shadow-lg hover:shadow-[#BEF397]/20 transition-all duration-300"
              >
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-10"
            style={{
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? "#BEF397" : i % 3 === 1 ? "#7DD3FC" : "#E5B1FD"
              } 0%, transparent 70%)`,
              width: `${150 + Math.random() * 200}px`,
              height: `${150 + Math.random() * 200}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -50, 50, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-zinc-700/50"
              >
                <HelpCircle className="w-5 h-5 text-[#BEF397]" />
                <span className="text-zinc-300 text-sm font-medium">We're here to help</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Help{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BEF397] to-[#7DD3FC]">
                  Center
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-3xl mx-auto">
                Find answers to your questions, learn how to maximize your tax deductions, and get the most out of
                moulai.
              </p>
            </div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-zinc-400 w-6 h-6" />
                <Input
                  placeholder="Search for help articles, guides, and FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-16 pr-6 h-16 bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-[#BEF397] focus:ring-[#BEF397]/20 rounded-2xl text-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20 bg-zinc-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Browse by <span className="text-[#BEF397]">Category</span>
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">Find the help you need organized by topic</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-800/40 backdrop-blur-sm rounded-2xl p-8 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300 group cursor-pointer"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-black">{category.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{category.title}</h3>
                <p className="text-zinc-400 leading-relaxed mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#BEF397] font-medium">{category.articles} articles</span>
                  <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-[#BEF397] group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black/50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Frequently Asked <span className="text-[#BEF397]">Questions</span>
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              Quick answers to the most common questions about moulai
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-800/30 backdrop-blur-sm rounded-2xl border border-zinc-700/50 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-zinc-700/20 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-6 h-6 text-[#BEF397] transition-transform duration-300 ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-zinc-300 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-zinc-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Still Need <span className="text-[#BEF397]">Help?</span>
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
              Our support team is here to help you get the most out of moulai
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-zinc-800/40 backdrop-blur-sm rounded-2xl p-8 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300 text-center group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${option.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-black">{option.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{option.title}</h3>
                <p className="text-zinc-400 leading-relaxed mb-4">{option.description}</p>
                <div className="flex items-center justify-center gap-2 text-[#BEF397] font-medium mb-6">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{option.availability}</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#BEF397] to-[#7DD3FC] text-black hover:shadow-lg hover:shadow-[#BEF397]/20 transition-all duration-300">
                  {option.action}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 md:gap-16">
            {/* Branding */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#BEF397] to-[#7DD3FC] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-black" />
                </div>
                <span className="text-[#BEF397] text-2xl font-bold">moulai.</span>
              </div>
              <p className="text-zinc-400 max-w-md">
                Australia's #1 AI-powered tax deduction finder. Helping Australians maximize their tax refunds since
                2023.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#BEF397] fill-current" />
                  <span className="text-zinc-300 text-sm">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#7DD3FC]" />
                  <span className="text-zinc-300 text-sm">50K+ Users</span>
                </div>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <div className="space-y-2">
                <a href="/#features" className="text-zinc-400 hover:text-white transition-colors block">
                  Features
                </a>
                <a href="/#pricing" className="text-zinc-400 hover:text-white transition-colors block">
                  Pricing
                </a>
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="/help" className="text-[#BEF397] hover:text-[#BEF397]/80 transition-colors block">
                  Help Center
                </a>
                <a href="/privacy" className="text-zinc-400 hover:text-white transition-colors block">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-zinc-400 hover:text-white transition-colors block">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-400 text-sm">© 2024 moulai. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#BEF397]" />
                <span className="text-zinc-400 text-sm">SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#7DD3FC]" />
                <span className="text-zinc-400 text-sm">ATO Approved</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
