import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, HelpCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-2xl mx-4 shadow-xl">
        <CardContent className="pt-12 pb-10 px-8">
          <div className="text-center mb-8">
            <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto" data-testid="button-home-404">
                <Home className="w-5 h-5 mr-2" />
                Go to Homepage
              </Button>
            </Link>
            <Link href="/search-hostels">
              <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-search-404">
                <Search className="w-5 h-5 mr-2" />
                Search Hostels
              </Button>
            </Link>
          </div>

          <div className="border-t pt-8 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Quick Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/#features-section">
                <Button variant="ghost" className="w-full justify-start" data-testid="link-features-404">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Features
                </Button>
              </Link>
              <Link href="/#pricing-section">
                <Button variant="ghost" className="w-full justify-start" data-testid="link-pricing-404">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Pricing
                </Button>
              </Link>
              <Link href="/#contact-section">
                <Button variant="ghost" className="w-full justify-start" data-testid="link-contact-404">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
