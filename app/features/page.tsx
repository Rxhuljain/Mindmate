export default function FeaturesPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-4">Features</h1>
      <ul className="space-y-4">
        <li>
          <h2 className="text-xl font-semibold">AI Chat</h2>
          <p className="text-muted-foreground">Talk to our AI assistant for support and guidance.</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold">Resources</h2>
          <p className="text-muted-foreground">Access curated mental health resources and tools.</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold">Journal</h2>
          <p className="text-muted-foreground">Keep track of your thoughts and progress with a personal journal.</p>
        </li>
      </ul>
    </div>
  );
}