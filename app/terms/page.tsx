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
  FileText,
  Scale,
  AlertTriangle,
  CheckCircle,
  Clock,
  CreditCard,
  UserX,
  Gavel,
  Globe,
} from "lucide-react"

export default function TermsOfService() {
  const router = useRouter()

  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <CheckCircle className="w-6 h-6" />,
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing or using moulai's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site and our services.",
        },
        {
          subtitle: "Eligibility",
          text: "You must be at least 18 years old and a resident of Australia to use our services. By using moulai, you represent and warrant that you meet these eligibility requirements and have the legal capacity to enter into these terms.",
        },
        {
          subtitle: "Changes to Terms",
          text: "We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through our platform. Your continued use of the service after changes constitutes acceptance of the new terms.",
        },
      ],
    },
    {
      title: "Service Description",
      icon: <FileText className="w-6 h-6" />,
      content: [
        {
          subtitle: "AI Tax Deduction Analysis",
          text: "moulai provides AI-powered analysis of your financial transactions to identify potential tax deductions. Our service connects to your bank accounts with read-only access to analyze spending patterns and categorize expenses according to Australian Tax Office guidelines.",
        },
        {
          subtitle: "Report Generation",
          text: "We generate detailed reports of potential tax deductions that comply with ATO requirements. These reports are designed to assist you or your tax professional in preparing your tax return, but do not constitute tax advice.",
        },
        {
          subtitle: "Service Limitations",
          text: "While our AI has high accuracy rates, we cannot guarantee that all deductions identified will be accepted by the ATO. Users are responsible for verifying the legitimacy of claimed deductions and should consult with qualified tax professionals for complex situations.",
        },
      ],
    },
    {
      title: "User Responsibilities",
      icon: <UserX className="w-6 h-6" />,
      content: [
        {
          subtitle: "Account Security",
          text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account or any other breach of security.",
        },
        {
          subtitle: "Accurate Information",
          text: "You agree to provide accurate, current, and complete information when creating your account and using our services. You are responsible for updating your information to maintain its accuracy.",
        },
        {
          subtitle: "Compliance with Laws",
          text: "You agree to use our services in compliance with all applicable Australian laws and regulations, including tax laws. You are solely responsible for the accuracy of your tax returns and compliance with ATO requirements.",
        },
        {
          subtitle: "Prohibited Uses",
          text: "You may not use our services for any illegal purposes, to violate any laws, to transmit harmful code, to attempt unauthorized access to our systems, or to interfere with the proper functioning of our services.",
        },
      ],
    },
    {
      title: "Payment Terms",
      icon: <CreditCard className="w-6 h-6" />,
      content: [
        {
          subtitle: "Subscription Plans",
          text: "We offer various subscription plans with different features and pricing. All fees are in Australian dollars and are charged in advance on a monthly or annual basis, depending on your chosen plan.",
        },
        {
          subtitle: "Payment Processing",
          text: "Payments are processed through secure third-party payment processors. By providing payment information, you authorize us to charge the applicable fees to your chosen payment method.",
        },
        {
          subtitle: "Refund Policy",
          text: "We offer a 30-day money-back guarantee for new subscribers. Refunds are processed within 5-10 business days. Refunds are not available for accounts terminated due to violations of these terms.",
        },
        {
          subtitle: "Price Changes",
          text: "We may change our pricing at any time. For existing subscribers, price changes will take effect at the next billing cycle, with at least 30 days advance notice.",
        },
      ],
    },
    {
      title: "Intellectual Property",
      icon: <Shield className="w-6 h-6" />,
      content: [
        {
          subtitle: "Our Intellectual Property",
          text: "The moulai platform, including all software, algorithms, designs, text, graphics, and other content, is owned by us and protected by Australian and international intellectual property laws.",
        },
        {
          subtitle: "User Data Rights",
          text: "You retain ownership of your financial data and personal information. By using our services, you grant us a limited license to process this data solely for the purpose of providing our tax deduction analysis services.",
        },
        {
          subtitle: "Feedback and Suggestions",
          text: "Any feedback, suggestions, or ideas you provide to us become our property and may be used to improve our services without compensation to you.",
        },
      ],
    },
    {
      title: "Disclaimers and Limitations",
      icon: <AlertTriangle className="w-6 h-6" />,
      content: [
        {
          subtitle: "Service Availability",
          text: "We strive to maintain high service availability but cannot guarantee uninterrupted access. We may temporarily suspend service for maintenance, updates, or due to circumstances beyond our control.",
        },
        {
          subtitle: "Tax Advice Disclaimer",
          text: "moulai does not provide tax advice. Our service identifies potential deductions based on transaction analysis, but you should consult with qualified tax professionals for advice specific to your situation.",
        },
        {
          subtitle: "Limitation of Liability",
          text: "To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services, including but not limited to lost profits or data.",
        },
        {
          subtitle: "Maximum Liability",
          text: "Our total liability to you for any claims arising from these terms or your use of our services shall not exceed the amount you paid us in the 12 months preceding the claim.",
        },
      ],
    },
    {
      title: "Termination",
      icon: <UserX className="w-6 h-6" />,
      content: [
        {
          subtitle: "Termination by You",
          text: "You may terminate your account at any time through your account settings or by contacting our support team. Upon termination, your access to paid features will continue until the end of your current billing period.",
        },
        {
          subtitle: "Termination by Us",
          text: "We may terminate or suspend your account immediately if you violate these terms, engage in fraudulent activity, or for any other reason at our sole discretion, with or without notice.",
        },
        {
          subtitle: "Effect of Termination",
          text: "Upon termination, your right to use our services ceases immediately. We may delete your account data after a reasonable period, subject to our data retention policies and legal requirements.",
        },
      ],
    },
    {
      title: "Governing Law",
      icon: <Gavel className="w-6 h-6" />,
      content: [
        {
          subtitle: "Australian Law",
          text: "These terms are governed by and construed in accordance with the laws of Australia. Any disputes arising from these terms or your use of our services will be subject to the exclusive jurisdiction of Australian courts.",
        },
        {
          subtitle: "Consumer Rights",
          text: "Nothing in these terms excludes, restricts, or modifies any consumer rights under Australian Consumer Law that cannot be excluded, restricted, or modified by agreement.",
        },
        {
          subtitle: "Dispute Resolution",
          text: "We encourage users to contact us directly to resolve any disputes. If a dispute cannot be resolved through direct communication, it may be subject to mediation or arbitration as provided by Australian law.",
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
              <a href="/privacy" className="text-zinc-300 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-[#BEF397] font-medium">
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
                <Scale className="w-5 h-5 text-[#BEF397]" />
                <span className="text-zinc-300 text-sm font-medium">Clear terms, fair service</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Terms of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BEF397] to-[#7DD3FC]">
                  Service
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-3xl mx-auto">
                These terms govern your use of moulai's AI-powered tax deduction services. We believe in transparency
                and fair treatment for all our users.
              </p>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-[#BEF397]" />
                <span className="text-zinc-300 font-medium">Australian Law</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-[#7DD3FC]" />
                <span className="text-zinc-300 font-medium">Consumer Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-[#E5B1FD]" />
                <span className="text-zinc-300 font-medium">Fair Terms</span>
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
              We may update these terms from time to time. Significant changes will be communicated to users with at
              least 30 days notice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
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
              Questions About These <span className="text-[#BEF397]">Terms?</span>
            </h2>
            <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
              If you have any questions about these terms of service or need clarification on any points, we're here to
              help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-[#BEF397] to-[#7DD3FC] text-black hover:shadow-lg hover:shadow-[#BEF397]/20 transition-all duration-300">
                Contact Legal Team
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
                <a href="/privacy" className="text-zinc-400 hover:text-white transition-colors block">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-[#BEF397] hover:text-[#BEF397]/80 transition-colors block">
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
