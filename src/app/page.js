export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-24 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div className="space-y-7">

          <div>
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
              Trusted by 150,000+ Traders
            </p>

            <h1 className="text-5xl font-bold mt-3">
              Automate Your Trading
            </h1>

            <p className="text-2xl font-semibold text-teal-600 mt-2">
              Copy Top Traders Instantly
            </p>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Build passive income by copying professional traders. No experience required. Start copying in minutes.
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-2">

            <a
              href="/register"
              className="px-7 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Get Started
            </a>

            <a
              href="/dashboard"
              className="px-7 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              View Demo
            </a>

          </div>

          <div className="text-sm text-gray-500 space-y-1">
            <p>✓ No credit card required</p>
            <p>✓ 24/7 support</p>
          </div>

        </div>

        {/* RIGHT CARD */}
        <div>
          <div className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm hover:shadow-md transition">

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-semibold text-gray-900">
                Portfolio Overview
              </h3>
              <span className="text-sm font-semibold text-green-600">
                +12.4%
              </span>
            </div>

            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-xs text-teal-600 font-semibold uppercase">
                Total Balance
              </p>
              <p className="text-3xl font-bold">$24,567</p>
            </div>

            <div className="space-y-4">

              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">BTC Strategy</p>
                  <p className="text-xs text-gray-500">Bitcoin Trading</p>
                </div>
                <span className="text-green-600 font-semibold text-sm">+5.2%</span>
              </div>

              <div className="flex justify-between border-t pt-4 border-gray-200">
                <div>
                  <p className="text-sm font-medium">Gold Copy</p>
                  <p className="text-xs text-gray-500">Commodity Trading</p>
                </div>
                <span className="text-red-500 font-semibold text-sm">-1.1%</span>
              </div>

              <div className="flex justify-between border-t pt-4 border-gray-200">
                <div>
                  <p className="text-sm font-medium">Scalping Bot</p>
                  <p className="text-xs text-gray-500">High Frequency</p>
                </div>
                <span className="text-green-600 font-semibold text-sm">+3.8%</span>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-gray-200">

        <div className="grid md:grid-cols-3 gap-12 text-center">

          <div>
            <p className="text-4xl font-bold text-teal-600">150K+</p>
            <p className="text-gray-600 mt-2">Active Traders</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-teal-600">2.3M+</p>
            <p className="text-gray-600 mt-2">Trades Executed</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-teal-600">+18.7%</p>
            <p className="text-gray-600 mt-2">Average ROI</p>
          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="mb-14">
          <h2 className="text-3xl font-bold text-gray-900">
            Why TradeSync?
          </h2>
          <p className="text-gray-600 mt-2">
            Everything you need to copy professional traders
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            ["Real-Time Copying", "Instant trade replication"],
            ["Risk Control", "Manage exposure easily"],
            ["Secure Funds", "Bank-level security"],
            ["Live Analytics", "Track performance"],
            ["Learning Hub", "Grow skills"],
            ["24/7 Support", "Always available"],
          ].map(([title, desc], i) => (
            <div
              key={i}
              className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                {title}
              </h3>
              <p className="text-sm text-gray-500">
                {desc}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="bg-teal-600 rounded-2xl p-12 text-center text-white">

          <h2 className="text-3xl font-bold">
            Start Trading Smarter Today
          </h2>

          <p className="text-teal-100 mt-3 mb-6">
            Join thousands earning passive income
          </p>

          <a
            href="/register"
            className="inline-block px-7 py-3 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Get Started
          </a>

        </div>

      </section>

    </div>
  );
}