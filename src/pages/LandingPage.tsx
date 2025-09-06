import { motion } from 'framer-motion';
import { ArrowRight, Upload, Zap, Download, CheckCircle, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/resume-form');
  };

  const features = [
    {
      icon: Upload,
      title: "Upload Resume",
      description: "Upload your existing resume in PDF format"
    },
    {
      icon: Zap,
      title: "Add Job Description",
      description: "Paste the job description you're targeting"
    },
    {
      icon: Download,
      title: "Get ATS-Optimized Resume",
      description: "Download your tailored, ATS-friendly resume"
    }
  ];

  const benefits = [
    { icon: CheckCircle, text: "AI-powered resume optimization" },
    { icon: Star, text: "ATS-friendly formatting" },
    { icon: Users, text: "Increase interview chances" },
  ];

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-primary"
          >
            AI Resume Builder
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button variant="outline" onClick={handleGetStarted}>
              Get Started
            </Button>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Build ATS-Optimized
            <br />
            Resumes with AI
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your resume into an ATS-friendly masterpiece. Our AI analyzes job descriptions 
            and optimizes your resume to pass applicant tracking systems and land more interviews.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              variant="hero" 
              size="xl" 
              onClick={handleGetStarted}
              className="group"
            >
              Build My Resume
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Free • No registration required</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your ATS-optimized resume in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-8 text-center card-gradient border-border hover:shadow-lg transition-smooth h-full">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  <div className="mt-6 text-sm text-primary font-medium">
                    Step {index + 1}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose AI Resume Builder?</h2>
            <p className="text-lg text-muted-foreground">
              Leverage cutting-edge AI to create resumes that get results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border"
                >
                  <Icon className="h-6 w-6 text-success flex-shrink-0" />
                  <span className="font-medium">{benefit.text}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <Card className="p-12 card-gradient border-border">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of professionals who've improved their job prospects with AI-optimized resumes.
            </p>
            <Button 
              variant="hero" 
              size="xl" 
              onClick={handleGetStarted}
              className="group"
            >
              Build My Resume Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 AI Resume Builder. Powered by AI technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;