export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Uniqus Consultech Inc. All rights reserved.</p>
        <p className="text-muted-foreground">
          Built with Claude AI
        </p>
      </div>
    </footer>
  );
}
