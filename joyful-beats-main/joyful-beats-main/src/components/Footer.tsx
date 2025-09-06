import { Mail, Phone, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card/40 backdrop-blur-sm border-t border-border/50 mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold gradient-text">Joyable</h3>
            <p className="text-sm text-muted-foreground">Your AI Music Companion</p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a 
                href="mailto:rajsimon849@gmail.com" 
                className="hover:text-foreground transition-colors"
              >
                rajsimon849@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a 
                href="tel:+919392867166" 
                className="hover:text-foreground transition-colors"
              >
                +91 93928 67166
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Created by Raj Simon</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-border/30 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Joyable. All rights reserved. Built with ❤️ by Raj Simon</p>
        </div>
      </div>
    </footer>
  );
};