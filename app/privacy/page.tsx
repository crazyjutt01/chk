"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  Shield,
  Star,
  Award,
  Users,
  Lock,
  Eye,
  Database,
  UserCheck,
  Globe,
  Clock,
  CheckCircle,
} from "lucide-react"

export default function PrivacyPolicy() {
  const router = useRouter()

  const sections = [
    {
      title: "Information We Collect",
      icon: <Database className="w-6 h-6" />,
      content: [
        {
          subtitle: "Financial Information",
          text: "We collect transaction data from your connected bank accounts and credit cards through secure, read-only connections. This includes transaction amounts, dates, merchant names, and categories. We do not store your banking credentials or have the ability to move money from your accounts.",
        },
        {
          subtitle: "Personal Information",
          text: "We collect basic personal information including your name, email address, phone number, and tax file number (TFN) when provided. This information is used to create your account and generate tax-compliant reports.",
        },
        {
          subtitle: "Usage Information",
          text: "We automatically collect information about how you use our service, including pages visited, features used, and time spent on the platform. This helps us improve our service and provide better support.",
        },
        {
          subtitle: "Device Information",
          text: "We collect information about the devices you use to access moulai, including IP address, browser type, operating system, and device identifiers. This information is used for security and fraud prevention.",
        },
      ],
    },
    {
      title: "How We Use Your Information",
      icon: <UserCheck className="w-6 h-6" />,
      content: [
        {
          subtitle: "Tax Deduction Analysis",
          text: "Our AI analyzes your transaction data to identify potential tax deductions based on Australian Tax Office guidelines and your industry classification. This is the core function of our service.",
        },
        {
          subtitle: "Report Generation",
          text: "We use your information to generate detailed, ATO-compliant tax deduction reports that you can use for your tax return or provide to your accountant.",
        },
        {
          subtitle: "Service Improvement",
          text: "We use aggregated, anonymized data to improve our AI algorithms, add new features, and enhance the accuracy of our deduction detection.",
        },
        {
          subtitle: "Customer Support",
          text: "We use your information to provide customer support, respond to inquiries, and troubleshoot technical issues with your account.",
        },
        {
          subtitle: "Legal Compliance",
          text: "We may use your information to comply with legal obligations, respond to lawful requests from authorities, and protect our rights and the rights of our users.",
        },
      ],
    },
    {
      title: "Information Sharing",
      icon: <Globe className="w-6 h-6" />,
      content: [
        {
          subtitle: "We Don't Sell Your Data",
          text: "We never sell, rent, or trade your personal or financial information to third parties for marketing purposes. Your data is not a product we monetize.",
        },
        {
          subtitle: "Service Providers",
          text: "We may share your information with trusted service providers who help us operate our platform, such as cloud hosting providers, payment processors, and customer support tools. These providers are bound by strict confidentiality agreements.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law, court order, or government request, or to protect the safety and security of our users and platform.",
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction, subject to the same privacy protections.",
        },
      ],
    },
    {
      title: "Data Security",
      icon: <Lock className="w-6 h-6" />,
      content: [
        {
          subtitle: "Encryption",
          text: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Your financial data is stored in encrypted Australian data centers with multiple layers of security.",
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls, ensuring only authorized personnel can access your data on a need-to-know basis. All access is logged and monitored.",
        },
        {
          subtitle: "Regular Security Audits",
          text: "We conduct regular security audits and penetration testing to identify and address potential vulnerabilities. We are SOC 2 Type II compliant.",
        },
        {
          subtitle: "Incident Response",
          text: "We have comprehensive incident response procedures in place. In the unlikely event of a data breach, we will notify affected users and relevant authorities as required by law.",
        },
      ],
    },
    {
      title: "Your Rights",
      icon: <Eye className="w-6 h-6" />,
      content: [
        {
          subtitle: "Access and Portability",
          text: "You have the right to access your personal information and request a copy of your data in a portable format. You can download your data through your account settings.",
        },
        {
          subtitle: "Correction and Updates",
          text: "You can update your personal information at any time through your account settings. If you notice any inaccuracies, please contact us to have them corrected.",
        },
        {
          subtitle: "Deletion",
          text: "You can request deletion of your account and associated data at any time. We will delete your information within 30 days, except where we are required to retain it by law.",
        },
        {
          subtitle: "Opt-out",
          text: "You can opt out of non-essential communications and data processing activities. However, some data processing is necessary for the core functionality of our service.",
        },
      ],
    },
    {
      title: "Data Retention",
      icon: <Clock className="w-6 h-6" />,
      content: [
        {
          subtitle: "Active Accounts",
          text: "We retain your data for as long as your account is active and you continue to use our service. This allows us to provide ongoing tax deduction analysis and maintain your historical records.",
        },
        {
          subtitle: "Inactive Accounts",
          text: "If your account becomes inactive for more than 2 years, we may delete your data after providing 30 days notice. You can reactivate your account at any time before deletion.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may retain certain information for longer periods if required by law, such as for tax compliance or regulatory requirements. This typically applies to financial records and transaction data.",
        },
        {
          subtitle: "Aggregated Data",
          text: "We may retain aggregated, anonymized data indefinitely for research and service improvement purposes. This data cannot be used to identify individual users.",
        },
      ],
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
              <a href="/help" className="text-zinc-300 hover:text-white transition-colors">
                Help Center
              </a>
              <a href="/privacy" className="text-[#BEF397] font-medium">
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
        {[...Array(6)].map((_, i) => (
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
        <div className="max-w-4xl mx-auto px-4 text-center">
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
                <Shield className="w-5 h-5 text-[#BEF397]" />
                <span className="text-zinc-300 text-sm font-medium">Your privacy is our priority</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Privacy{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BEF397] to-[#7DD3FC]">
                  Policy
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-3xl mx-auto">
                We're committed to protecting your financial data with bank-level security and complete transparency
                about how we handle your information.
              </p>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-[#BEF397]" />
                <span className="text-zinc-300 font-medium">SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-6 h-6 text-[#7DD3FC]" />
                <span className="text-zinc-300 font-medium">256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-[#E5B1FD]" />
                <span className="text-zinc-300 font-medium">Australian Data Centers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-8 bg-zinc-900/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-zinc-800/40 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-[#BEF397]" />
              <span className="text-white font-semibold">Last Updated</span>
            </div>
            <p className="text-zinc-300">December 15, 2024</p>
            <p className="text-zinc-400 text-sm mt-2">
              We may update this privacy policy from time to time. We'll notify you of any significant changes via email
              or through our platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-16">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-800/30 backdrop-blur-sm rounded-3xl p-8 border border-zinc-700/50"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#BEF397] to-[#7DD3FC] rounded-xl flex items-center justify-center">
                    <div className="text-black">{section.icon}</div>
                  </div>
                  <h2 className="text-3xl font-bold text-white">{section.title}</h2>
                </div>

                <div className="space-y-8">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="space-y-4">
                      <h3 className="text-xl font-semibold text-[#BEF397] flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        {item.subtitle}
                      </h3>
                      <p className="text-zinc-300 leading-relaxed pl-7">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-zinc-900/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">
              Questions About Your <span className="text-[#BEF397]">Privacy?</span>
            </h2>
            <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
              If you have any questions about this privacy policy or how we handle your data, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-[#BEF397] to-[#7DD3FC] text-black hover:shadow-lg hover:shadow-[#BEF397]/20 transition-all duration-300">
                Contact Privacy Team
              </Button>
              <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800 bg-transparent">
                Visit Help Center
              </Button>
            </div>
          </motion.div>
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
                <a href="/help" className="text-zinc-400 hover:text-white transition-colors block">
                  Help Center
                </a>
                <a href="/privacy" className="text-[#BEF397] hover:text-[#BEF397]/80 transition-colors block">
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
