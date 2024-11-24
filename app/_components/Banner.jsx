import React from 'react'
import Link from 'next/link'
import { ArrowRight, FileCheck, LinkIcon, Bot, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"

const Banner = () => {
  return (
    <div className="flex flex-col min-h-screen">
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="#">
      </Link> 
    </header>
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Permanent. Secure. Decentralized.
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Sign and store documents with unmatched permanence and accessibility. Built on Arweave and AO.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="#cta">Get Started</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why DocumentSign?</h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            <FeatureCard
              icon={<FileCheck className="h-10 w-10 mb-4" />}
              title="Permanent Storage"
              description="Documents and agreements are stored permanently on Arweave, ensuring they can never be deleted or tampered with."
            />
            <FeatureCard
              icon={<LinkIcon className="h-10 w-10 mb-4" />}
              title="Universal Access"
              description="Access your documents through a simple URL, viewable on any browser without the need for specific platforms."
            />
            <FeatureCard
              icon={<Bot className="h-10 w-10 mb-4" />}
              title="AI Summary"
              description="Get instant AI-generated summaries of your agreements, making it easier for signatories to understand the content."
            />
            <FeatureCard
              icon={<Mail className="h-10 w-10 mb-4" />}
              title="Email Notifications"
              description="Receive email notifications for signing invitations and when other parties sign the agreement."
            />
            <FeatureCard
              icon={<ArrowRight className="h-10 w-10 mb-4" />}
              title="One-Click Sharing"
              description="Share your documents instantly with a simple button click to copy the permanent Arweave URL."
            />
            <FeatureCard
              icon={<FileCheck className="h-10 w-10 mb-4" />}
              title="Manage & Sign"
              description="Create, manage, and sign all your agreements in one secure, decentralized platform."
            />
          </div>
        </div>
      </section>
      <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Secure Your Documents?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Join DocumentSign today and experience the future of document signing and storage.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit">Sign Up</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 DocumentSign. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacy
        </Link>
      </nav>
    </footer>
  </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      {icon}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  )
}

export default Banner