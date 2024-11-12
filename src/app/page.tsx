import Link from "next/link";
import { ArrowRight, Building2, LineChart, Globe, Calculator } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background">
        <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <div className="text-center space-y-8">
            <h1 className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 font-[family-name:var(--font-geist-sans)]">
              Smart Real Estate Investment Analytics
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-[family-name:var(--font-geist-sans)]">
              Make data-driven investment decisions with our comprehensive real estate analysis platform
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/dashboard"
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 flex items-center gap-2 transition-colors"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#features"
                className="rounded-full border border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500 px-8 py-3 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 font-[family-name:var(--font-geist-sans)]">
            Powerful Tools for Smart Investing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Calculator,
                title: "Property Analysis",
                description: "Comprehensive property evaluation with ROI calculations and risk assessment",
              },
              {
                icon: Globe,
                title: "Market Research",
                description: "Real-time market data and trends to identify investment opportunities",
              },
              {
                icon: LineChart,
                title: "Financial Planning",
                description: "Advanced financial modeling and investment projections",
              },
              {
                icon: Building2,
                title: "Portfolio Management",
                description: "Track and optimize your real estate investment portfolio",
              },
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 w-12 h-12 bg-blue-50 dark:bg-blue-950 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: "10K+", label: "Active Users" },
              { value: "$2B+", label: "Analyzed Properties" },
              { value: "98%", label: "Customer Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
            Ready to Start Your Investment Journey?
          </h2>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 transition-colors"
          >
            Launch Dashboard
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
