import { Link } from 'react-router-dom';
import { Globe, ExternalLink, Link2, Share2, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Contact', path: '/contact' },
];

const products = [
  'Smart Lights', 'Smart AC', 'Smart Curtains', 'Smart Locks', 'Smart Sensors'
];

const socials = [
  { icon: Globe, href: '#' },
  { icon: ExternalLink, href: '#' },
  { icon: Link2, href: '#' },
  { icon: Share2, href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-syne text-xl font-bold text-text">Smart</span>
              <span className="font-syne text-xl font-bold text-accent">Home</span>
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(0,200,255,0.6)]" />
            </div>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Next-generation home automation that makes your living space intelligently alive.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="text-muted hover:text-accent transition-colors duration-300"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-syne font-bold text-text mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted text-sm hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-syne font-bold text-text mb-4 text-sm">Products</h4>
            <ul className="space-y-2">
              {products.map(p => (
                <li key={p}>
                  <Link
                    to="/products"
                    className="text-muted text-sm hover:text-accent transition-colors duration-300"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-syne font-bold text-text mb-4 text-sm">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted text-sm">V SQUARE, Shop No. - 121, Palanpur Char Rasta, Palanpur, Surat, Gujarat - 395009</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <span className="text-muted text-sm">+91 84548 21043 / +91 81693 07587</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <span className="text-muted text-sm">hello@smarthome.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-muted text-xs">
            © 2024 SmartHome. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="text-muted hover:text-accent hover:drop-shadow-[0_0_8px_rgba(0,200,255,0.5)] transition-all duration-300"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
