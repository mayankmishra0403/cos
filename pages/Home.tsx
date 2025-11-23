import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Sparkles, ArrowRight, CheckCircle, TrendingUp, Users, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Home: React.FC = () => {

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-muted py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-primary font-semibold text-sm">🎓 India's Leading Ed-Tech Platform</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight leading-tight">
            Master <span className="text-primary underline decoration-4 decoration-primary/50">AKTU Exams</span> & <br/>
            Crack <span className="text-primary underline decoration-4 decoration-primary/50">Top Placements</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Code of Shiksha provides comprehensive unit-wise notes for university exams, curated DSA problem sets for placements, and 24/7 AI-powered guidance. Your complete learning companion.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button asChild size="lg">
              <Link to="/academics">
                <BookOpen className="mr-2" size={20} />
                Explore Academics
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/ai-tutor">
                <Sparkles className="mr-2" size={20} />
                Try AI Tutor (Free)
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-foreground mb-4">Why Choose Code of Shiksha?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to excel in academics and placements, all in one platform.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <BookOpen className="text-primary" size={32} />
              </div>
              <CardTitle>Academic Excellence</CardTitle>
              <CardDescription>
                Comprehensive unit-wise notes tailored to AKTU syllabus. Downloadable PDFs, previous year questions, and structured study materials.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Unit-wise organized content
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Downloadable study materials
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Exam-focused approach
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Briefcase className="text-primary" size={32} />
              </div>
              <CardTitle>Placement Ready</CardTitle>
              <CardDescription>
                Curated DSA problem sets organized by companies (Google, Amazon, Microsoft) and difficulty levels. Track your progress efficiently.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  500+ curated DSA problems
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Company-specific questions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Progress tracking
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="text-primary" size={32} />
              </div>
              <CardTitle>AI-Powered Learning</CardTitle>
              <CardDescription>
                24/7 virtual tutor powered by Gemini 2.5 Flash. Get instant doubt clarification, code examples, and personalized explanations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Instant doubt resolution
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Code examples & explanations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Available 24/7 for free
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Impact in Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <Card>
              <CardContent className="p-6">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-5xl font-extrabold text-primary mb-2">500+</div>
                <div className="text-muted-foreground font-medium">DSA Problems</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-5xl font-extrabold text-primary mb-2">20+</div>
                <div className="text-muted-foreground font-medium">AKTU Subjects</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-5xl font-extrabold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground font-medium">AI Support</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-5xl font-extrabold text-primary mb-2">100%</div>
                <div className="text-muted-foreground font-medium">Free Access</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-primary text-primary-foreground rounded-3xl shadow-lg p-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Join thousands of students excelling in academics and placements.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/academics">
              Get Started Now
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;