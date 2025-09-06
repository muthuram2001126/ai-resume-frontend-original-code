import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Edit, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressCircle } from '@/components/ui/progress-circle';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import resumeApi, { ResumeResponse } from '@/api/resume';

interface LocationState {
  resumeData: ResumeResponse;
  originalFileName: string;
}

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  
  const state = location.state as LocationState;
  
  useEffect(() => {
    if (!state?.resumeData) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state?.resumeData) {
    return null;
  }

  const { resumeData, originalFileName } = state;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const pdfBlob = await resumeApi.downloadPdf(resumeData.pdfPath);
      
      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `optimized-resume-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Download Complete!",
        description: "Your optimized resume has been downloaded.",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download the resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/resume-form');
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) {
      return {
        icon: CheckCircle,
        message: "Excellent! Your resume is highly ATS-optimized.",
        color: "text-success"
      };
    }
    if (score >= 60) {
      return {
        icon: AlertCircle,
        message: "Good score! Your resume should pass most ATS systems.",
        color: "text-warning"
      };
    }
    return {
      icon: AlertCircle,
      message: "Consider further optimization to improve ATS compatibility.",
      color: "text-danger"
    };
  };

  const scoreInfo = getScoreMessage(resumeData.atsScore);
  const ScoreIcon = scoreInfo.icon;

  const renderSection = (title: string, content: any, key: string) => {
    if (!content || (Array.isArray(content) && content.length === 0)) {
      return null;
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        key={key}
        className="border-b border-border/50 pb-6 last:border-b-0"
      >
        <h3 className="text-lg font-semibold mb-3 text-primary">{title}</h3>
        {Array.isArray(content) ? (
          <div className="space-y-3">
            {content.map((item, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-3">
                {typeof item === 'string' ? (
                  <p>{item}</p>
                ) : (
                  <div>
                    {item.title && <h4 className="font-medium">{item.title}</h4>}
                    {item.company && <p className="text-sm text-muted-foreground">{item.company}</p>}
                    {item.duration && <p className="text-sm text-muted-foreground">{item.duration}</p>}
                    {item.description && <p className="mt-2">{item.description}</p>}
                    {item.details && <p>{item.details}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : typeof content === 'string' ? (
          <p className="bg-muted/30 rounded-lg p-3">{content}</p>
        ) : (
          <div className="bg-muted/30 rounded-lg p-3">
            {Object.entries(content).map(([k, v]) => (
              <p key={k} className="mb-1">
                <span className="font-medium">{k}:</span> {String(v)}
              </p>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleGoBack}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Form
          </Button>
          <div className="text-2xl font-bold text-primary">
            AI Resume Builder
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Your Optimized Resume
            </h1>
            <p className="text-lg text-muted-foreground">
              Here's your ATS-optimized resume based on "{originalFileName}"
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* ATS Score Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card className="p-8 text-center card-gradient border-border shadow-custom sticky top-8">
                <h2 className="text-2xl font-bold mb-6">ATS Compatibility</h2>
                
                <ProgressCircle 
                  value={resumeData.atsScore} 
                  size={150}
                  className="mx-auto mb-6"
                />
                
                <div className={`flex items-center justify-center gap-2 mb-6 ${scoreInfo.color}`}>
                  <ScoreIcon className="h-5 w-5" />
                  <p className="text-sm font-medium">
                    {scoreInfo.message}
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full group"
                  >
                    {isDownloading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        Download PDF
                        <Download className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleGoBack}
                    className="w-full gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit & Regenerate
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Resume Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className="p-8 card-gradient border-border shadow-custom">
                <h2 className="text-2xl font-bold mb-6">Resume Preview</h2>
                
                <div className="space-y-8">
                  {renderSection("Header", resumeData.header, "header")}
                  {renderSection("Professional Summary", resumeData.summary, "summary")}
                  {renderSection("Experience", resumeData.experience, "experience")}
                  {renderSection("Education", resumeData.education, "education")}
                  {renderSection("Skills", resumeData.skills, "skills")}
                  {renderSection("Projects", resumeData.projects, "projects")}
                  {renderSection("Achievements", resumeData.achievements, "achievements")}
                  {renderSection("Certifications", resumeData.certifications, "certifications")}
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ResultsPage;