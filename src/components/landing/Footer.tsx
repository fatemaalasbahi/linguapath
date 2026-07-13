import { Logo } from "@/components/landing/Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-sm text-neutral-700">
              Your AI path to language exam success.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href="https://github.com/fatemaalasbahi/linguapath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm"
              aria-label="View LinguaPath repository on GitHub (opens in new tab)"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-neutral-700 transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm"
              aria-label="Contact — placeholder link"
            >
              Contact
            </a>
          </div>
        </div>

        <p className="mt-8 border-t border-neutral-200 pt-8 text-sm text-neutral-500">
          © {currentYear} LinguaPath. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
