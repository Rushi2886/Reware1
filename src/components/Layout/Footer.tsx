import React from 'react';
import { Shirt, Heart, Recycle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shirt className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">ReWear</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Building a sustainable future through community-driven clothing exchange. 
              Reduce waste, save money, and discover unique pieces while connecting with like-minded individuals.
            </p>
            <div className="flex items-center space-x-2 text-primary-400">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Made with love for our planet</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/browse" className="hover:text-primary-400 transition-colors">Browse Items</a></li>
              <li><a href="/how-it-works" className="hover:text-primary-400 transition-colors">How It Works</a></li>
              <li><a href="/sustainability" className="hover:text-primary-400 transition-colors">Sustainability</a></li>
              <li><a href="/community" className="hover:text-primary-400 transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/help" className="hover:text-primary-400 transition-colors">Help Center</a></li>
              <li><a href="/contact" className="hover:text-primary-400 transition-colors">Contact Us</a></li>
              <li><a href="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 ReWear. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Recycle className="h-4 w-4 text-primary-400" />
            <span className="text-sm text-gray-400">Sustainable fashion for everyone</span>
          </div>
        </div>
      </div>
    </footer>
  );
}