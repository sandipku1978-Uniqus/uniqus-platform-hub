export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            About{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary-light bg-clip-text text-transparent">
              Uniqus Consultech
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            Uniqus Consultech is an AI-native professional services firm
            reimagining how consulting, compliance, and advisory work gets done.
            Founded by Sandip Khetan with 25+ years of Big 4 and Fortune 500
            experience, Uniqus builds purpose-built AI platforms that automate
            complex workflows across IPO readiness, M&A due diligence, treasury
            management, policy governance, and regulatory intelligence.
          </p>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            Every platform in this hub is powered by Claude AI, built with
            modern frameworks, and designed for enterprise-grade reliability.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.asksandipkhetan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-brand-primary text-white font-medium text-sm hover:bg-brand-primary/90 transition-colors"
            >
              Visit AskSandipKhetan
            </a>
            <a
              href="https://www.linkedin.com/in/sandipkhetan/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border border-border text-foreground font-medium text-sm hover:border-border-hover hover:bg-card transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
