import { HeroGraphic } from "@/components/landing/HeroGraphic";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-600 to-accent-500">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div className="text-white">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-100">
            AI Exam Prep
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Your AI path to exam success
          </h1>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-primary-50">
            AI-powered language exam preparation coach. Understand your level,
            get a personalized plan, and track progress toward your
            certification goals.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href="/sign-up"
              variant="secondary"
              size="lg"
              className="border-white/20 bg-white text-primary-700 hover:bg-primary-50"
            >
              Get Started
            </Button>
            <Button
              href="#how-it-works"
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10 focus-visible:ring-white"
            >
              See How It Works
            </Button>
          </div>
        </div>

        <div className="lg:justify-self-end">
          <HeroGraphic />
        </div>
      </div>
    </section>
  );
}
