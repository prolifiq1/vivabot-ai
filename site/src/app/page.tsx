export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-lg font-bold text-foreground">
              Viva<span className="text-brand">Bot</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-text-secondary">
            <a href="#features" className="hover:text-foreground transition">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-foreground transition">
              How it Works
            </a>
            <a href="#pricing" className="hover:text-foreground transition">
              Pricing
            </a>
            <a href="#agents" className="hover:text-foreground transition">
              AI Agents
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm text-text-secondary hover:text-foreground transition">
              Log in
            </button>
            <button className="bg-brand text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand/90 transition">
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-light text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse-slow" />
            Now in Beta — Join 2,000+ students preparing smarter
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
            Practice your thesis defense
            <br />
            <span className="text-brand">with AI that read your work</span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Upload your thesis, dissertation, or capstone project. VivaBot generates
            an AI examiner panel that asks questions grounded in{" "}
            <em>your specific research</em> — then scores your answers against your
            rubric.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-brand text-white font-semibold px-8 py-3.5 rounded-xl text-base hover:bg-brand/90 transition shadow-lg shadow-brand/20">
              Start Practicing Free
            </button>
            <button className="text-text-secondary font-medium px-6 py-3.5 rounded-xl text-base border border-border hover:border-brand hover:text-brand transition">
              Watch Demo
            </button>
          </div>
          <p className="mt-4 text-xs text-text-secondary">
            Free plan: 2 sessions/month. No credit card required.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-surface py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "4.2M", label: "Students defend annually" },
            { value: "35%", label: "Require major corrections" },
            { value: "0", label: "Practice tools existed before" },
            { value: "72%", label: "Avg. readiness improvement" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-extrabold text-brand">
                {stat.value}
              </div>
              <div className="text-xs text-text-secondary mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              Everything you need to ace your defense
            </h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Not a generic chatbot. A thesis-aware examiner that knows your work
              better than you do.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📄",
                title: "Document-Grounded Questions",
                desc: "Every question traces to a specific page, paragraph, or claim in your thesis. No hallucinated questions.",
              },
              {
                icon: "🎤",
                title: "Voice-First Examination",
                desc: "Real vivas are spoken. Practice with natural voice conversation, under 2 second response time.",
              },
              {
                icon: "📊",
                title: "Rubric-Aligned Scoring",
                desc: "Upload your marking rubric. Get scored on the exact criteria your real examiner will use.",
              },
              {
                icon: "👥",
                title: "Multi-Agent Examiner Panel",
                desc: "Chief Examiner, Methodology Expert, Statistics Specialist, Literature Reviewer — all in one session.",
              },
              {
                icon: "📈",
                title: "Improvement Tracking",
                desc: "See score trends across sessions. Identify persistent weak areas. Get targeted study recommendations.",
              },
              {
                icon: "🏫",
                title: "Institutional Integration",
                desc: "SSO, LMS integration, department analytics, custom rubrics, and supervisor dashboards.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-surface border border-border rounded-xl p-6 hover:border-brand/30 transition"
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="text-sm font-bold text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              From upload to defense-ready in days
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Upload Your Thesis",
                desc: "PDF or DOCX. We extract text, detect structure, and embed every section.",
              },
              {
                step: "02",
                title: "Upload Your Rubric",
                desc: "Optional. We score against it. No rubric? We use our validated academic default.",
              },
              {
                step: "03",
                title: "Practice Your Defense",
                desc: "Choose mode (5/15/45 min), style (friendly/hostile), and interface (text/voice).",
              },
              {
                step: "04",
                title: "Get Better Every Session",
                desc: "Detailed feedback, weak area identification, and a readiness score that tracks progress.",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-brand text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents */}
      <section id="agents" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              Meet your AI examiner panel
            </h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Specialized agents that examine different aspects of your research, just
              like a real viva panel.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                emoji: "🎓",
                name: "Chief Examiner",
                focus: "Contribution, significance, originality",
              },
              {
                emoji: "🔬",
                name: "Methodology Expert",
                focus: "Research design, sampling, ethics",
              },
              {
                emoji: "📊",
                name: "Statistics Examiner",
                focus: "Analysis choices, significance, power",
              },
              {
                emoji: "📚",
                name: "Literature Reviewer",
                focus: "Field positioning, theoretical framework",
              },
              {
                emoji: "🔍",
                name: "Follow-up Agent",
                focus: "Probes vague or incomplete answers",
              },
              {
                emoji: "📝",
                name: "Assessment Agent",
                focus: "Real-time rubric scoring (background)",
              },
              {
                emoji: "💬",
                name: "Feedback Agent",
                focus: "End-of-session synthesis and recommendations",
              },
              {
                emoji: "📈",
                name: "Improvement Agent",
                focus: "Personalized study plan across sessions",
              },
            ].map((a) => (
              <div
                key={a.name}
                className="bg-surface border border-border rounded-lg p-4 hover:border-brand/30 transition"
              >
                <div className="text-xl mb-2">{a.emoji}</div>
                <h3 className="text-xs font-bold text-foreground">{a.name}</h3>
                <p className="text-[10px] text-text-secondary mt-1">{a.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulation Modes */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              Practice modes for every scenario
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                mode: "Quick Practice",
                time: "5 min",
                desc: "Daily warm-up. 3-4 questions. Single examiner.",
                color: "bg-success",
              },
              {
                mode: "Standard Practice",
                time: "15 min",
                desc: "Regular session. 8-12 questions. Multi-agent.",
                color: "bg-brand",
              },
              {
                mode: "Full Defense",
                time: "45 min",
                desc: "Realistic simulation. 20-30 questions. Full panel.",
                color: "bg-brand-secondary",
              },
              {
                mode: "Panel Defense",
                time: "45 min",
                desc: "3 AI examiners. They interrupt and build on each other.",
                color: "bg-accent",
              },
              {
                mode: "Hostile Mode",
                time: "Any",
                desc: "Aggressive questioning. Builds resilience under pressure.",
                color: "bg-red-500",
              },
              {
                mode: "Friendly Mode",
                time: "Any",
                desc: "Coaching style. Guides you to the answer. Builds confidence.",
                color: "bg-success",
              },
            ].map((m) => (
              <div
                key={m.mode}
                className="bg-background border border-border rounded-lg p-5 hover:border-brand/30 transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${m.color}`} />
                  <h3 className="text-sm font-bold text-foreground">{m.mode}</h3>
                  <span className="text-[10px] text-text-secondary ml-auto font-mono">
                    {m.time}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              Invest in your defense
            </h2>
            <p className="mt-3 text-text-secondary">
              Less than a textbook. More impactful than any study group.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                features: [
                  "1 project",
                  "2 sessions/month",
                  "Text only",
                  "Quick Practice mode",
                  "Basic score",
                ],
                cta: "Get Started",
                highlight: false,
              },
              {
                name: "Student",
                price: "$19",
                period: "/month",
                features: [
                  "3 projects",
                  "Unlimited sessions",
                  "Text + Voice",
                  "All modes",
                  "Full feedback & analytics",
                  "Rubric upload",
                ],
                cta: "Start Free Trial",
                highlight: true,
              },
              {
                name: "Researcher",
                price: "$39",
                period: "/month",
                features: [
                  "10 projects",
                  "Panel Defense mode",
                  "Text + Voice + Video",
                  "Hostile Examiner",
                  "Priority AI",
                  "Share with supervisor",
                  "PDF reports",
                ],
                cta: "Start Free Trial",
                highlight: false,
              },
              {
                name: "University",
                price: "$8",
                period: "/seat/month",
                features: [
                  "SSO integration",
                  "Department management",
                  "Supervisor dashboards",
                  "Custom rubric templates",
                  "LMS integration",
                  "Aggregate analytics",
                  "Dedicated support",
                ],
                cta: "Contact Sales",
                highlight: false,
              },
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-xl p-6 ${
                  p.highlight
                    ? "bg-brand text-white border-2 border-brand shadow-lg shadow-brand/20 scale-105"
                    : "bg-surface border border-border"
                }`}
              >
                <h3
                  className={`text-sm font-bold ${
                    p.highlight ? "text-white/80" : "text-text-secondary"
                  }`}
                >
                  {p.name}
                </h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-extrabold">{p.price}</span>
                  <span
                    className={`text-xs ${
                      p.highlight ? "text-white/60" : "text-text-secondary"
                    }`}
                  >
                    {p.period}
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className={`text-xs flex items-start gap-2 ${
                        p.highlight ? "text-white/90" : "text-text-secondary"
                      }`}
                    >
                      <span className="mt-0.5">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 rounded-lg text-xs font-semibold transition ${
                    p.highlight
                      ? "bg-white text-brand hover:bg-white/90"
                      : "bg-brand text-white hover:bg-brand/90"
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-text-secondary mt-6">
            40% discount for students in low-income countries. Annual billing saves
            20%.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-brand">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">
            No student should walk into their defense unprepared
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            You spent years writing. Spend a few weeks practicing. VivaBot is the
            examiner who has read every page, every table, every citation.
          </p>
          <button className="mt-8 bg-white text-brand font-semibold px-8 py-3.5 rounded-xl text-base hover:bg-white/90 transition">
            Start Practicing Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-brand flex items-center justify-center">
                <span className="text-white font-bold text-xs">V</span>
              </div>
              <span className="text-sm font-bold">
                Viva<span className="text-brand">Bot</span>
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              AI-powered academic defense preparation for students, supervisors, and
              universities worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground mb-3">Product</h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li>Features</li>
              <li>Pricing</li>
              <li>For Universities</li>
              <li>API</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground mb-3">Resources</h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li>Documentation</li>
              <li>Blog</li>
              <li>Help Center</li>
              <li>Status</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground mb-3">Legal</h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>GDPR</li>
              <li>FERPA</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border text-xs text-text-secondary text-center">
          2026 VivaBot. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
