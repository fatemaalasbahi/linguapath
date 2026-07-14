import { SectionContainer } from "@/components/ui/SectionContainer";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <SectionContainer className="bg-neutral-50">
      <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-600 to-accent-500 px-6 py-12 text-center sm:px-12 sm:py-16">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Start preparing for your exam
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-50">
          Take the guesswork out of language exam preparation. Get your
          personalized AI coaching path today.
        </p>
        <div className="mt-8">
          <Button
            href="/sign-up"
            variant="secondary"
            size="lg"
            className="border-white/20 bg-white text-primary-700 hover:bg-primary-50"
          >
            Create Free Account
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
