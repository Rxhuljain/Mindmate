import { ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import NavigationBar from "@/components/NavigationBar";

export default function ResourcesPage() {
  const indiaResources = [
    { title: "iCall – Tata Institute of Social Sciences", link: "https://icallhelpline.org/" },
    { title: "AASRA – 24/7 Helpline", link: "http://www.aasra.info/" },
    { title: "Vandrevala Foundation Mental Health Helpline", link: "https://www.vandrevalafoundation.com/" },
    { title: "Mind Clan – Indian Therapist Directory", link: "https://www.themindclan.com/" },
    { title: "Fortis Mental Health Helpline", link: "https://www.fortishealthcare.com/mental-health" },
  ];

  const usResources = [
    { title: "Mental Health Gov", link: "https://www.mentalhealth.gov/" },
    { title: "Crisis Text Line", link: "https://www.crisistextline.org/" },
    { title: "National Suicide Prevention Lifeline", link: "https://suicidepreventionlifeline.org/" },
    { title: "Mindfulness Exercises", link: "https://www.mindful.org/mindfulness-how-to-do-it/" },
  ];

  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-secondary/5">
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Page Content */}
      <div className="py-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Mental Health Resources
          </h1>
          <p className="text-muted-foreground mb-10 text-base md:text-lg">
            Trusted platforms, helplines & mindfulness tools. Organized by region for your convenience.
          </p>
        </div>

        {/* India Section */}
        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-left bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            🇮🇳 India-Based Resources
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {indiaResources.map((resource, index) => (
              <Card
                key={index}
                className="group border-none shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm"
              >
                <CardHeader className="pb-1">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold group-hover:text-primary transition-all">
                    <ExternalLink className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-sm text-blue-600 hover:underline hover:text-blue-700 transition"
                  >
                    Visit Resource →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* US Section */}
        <section className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-left bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            🇺🇸 US-Based Resources
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {usResources.map((resource, index) => (
              <Card
                key={index}
                className="group border-none shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-secondary/5 to-primary/5 backdrop-blur-sm"
              >
                <CardHeader className="pb-1">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold group-hover:text-secondary transition-all">
                    <ExternalLink className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-sm text-blue-600 hover:underline hover:text-blue-700 transition"
                  >
                    Visit Resource →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
