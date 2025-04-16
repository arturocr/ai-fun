import HomeButton from './home-button';
import { ThemeToggle } from './theme-toggle';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex justify-end items-center p-4 gap-2 h-16 fixed top-4 right-4 z-50">
        <HomeButton />
        <ThemeToggle />
      </header>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </>
  );
}
