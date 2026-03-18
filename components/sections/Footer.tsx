export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Haegen Quinston. Built with Next.js
          and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
