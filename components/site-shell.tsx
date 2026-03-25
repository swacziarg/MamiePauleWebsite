import Link from "next/link";

type SiteShellProps = {
  children: React.ReactNode;
  currentPath: "/" | "/galerie" | "/artiste" | "/visiter";
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/galerie", label: "Galerie" },
  { href: "/artiste", label: "Artiste" },
  { href: "/visiter", label: "Visiter" },
] as const;

export function SiteShell({ children, currentPath }: SiteShellProps) {
  return (
    <div className="min-h-screen">
      <header className="mx-auto w-full max-w-6xl px-5 pt-4 md:px-8 md:pt-5">
        <div className="rounded-[1.75rem] border border-line bg-white/80 px-5 py-3 shadow-soft backdrop-blur md:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <Link href="/" className="text-xl text-ink md:text-2xl">
                Paule Delmas
              </Link>
              <p className="mt-1 text-xs uppercase tracking-[0.28em] text-black/45">
                Peintures
              </p>
            </div>
            <nav className="flex flex-wrap gap-2">
              {navItems.map((item) => {
                const isActive = currentPath === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-full px-4 py-2 text-xs md:text-sm ${
                      isActive
                        ? "bg-ink text-canvas"
                        : "border border-line bg-canvas/80 text-black/75 hover:border-ink hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {children}

      <footer className="mx-auto mt-8 w-full max-w-6xl px-5 pb-6 md:px-8">
        <div className="flex flex-col gap-3 rounded-[1.5rem] border border-line bg-white/75 px-5 py-4 text-sm text-black/65 shadow-soft md:flex-row md:items-center md:justify-between">
          <p>Les peintures de Paule Delmas, à voir simplement.</p>
          <Link href="/admin" className="underline decoration-line underline-offset-4 hover:text-ink">
            Admin
          </Link>
        </div>
      </footer>
    </div>
  );
}
