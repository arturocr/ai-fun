import HomeButton from './home-button';
import { ThemeToggle } from './theme-toggle';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <div className="container max-w-5xl mx-auto py-3 flex justify-between items-center gap-2 px-4">
          <HomeButton />
          <ThemeToggle />
        </div>
      </header>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </>
  );
}
