
import React from 'react';
import { FileSearch } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileSearch className="h-8 w-8 text-brand-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">ResumeAI</h1>
        </div>
        <nav>
          <ul className="flex items-center gap-6">
            <li><a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it works</a></li>
            <li><a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
            <li><a href="#" className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">Sign Up</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
