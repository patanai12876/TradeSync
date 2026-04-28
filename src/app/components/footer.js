export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="text-xl font-bold text-slate-900 mb-4">
              TradeSync
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              A professional copy trading platform designed to help investors grow and traders scale their strategies.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="/" className="hover:text-slate-900 transition">Home</a></li>
              <li><a href="/dashboard" className="hover:text-slate-900 transition">Dashboard</a></li>
              <li><a href="/deposit" className="hover:text-slate-900 transition">Deposit</a></li>
              <li><a href="/withdraw" className="hover:text-slate-900 transition">Withdraw</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900 transition">About Us</a></li>
              <li><a href="#" className="hover:text-slate-900 transition">Careers</a></li>
              <li><a href="#" className="hover:text-slate-900 transition">Support</a></li>
              <li><a href="#" className="hover:text-slate-900 transition">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-slate-900 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-900 transition">Risk Disclosure</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600">
          <p>© {new Date().getFullYear()} TradeSync. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Built for modern trading platforms
          </p>
        </div>

      </div>
    </footer>
  );
}