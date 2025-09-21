import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from '@/components/ui/file-upload';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import resumeApi from '@/api/resume';

const ResumeFormPage = () => {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    resume?: string;
    jobDescription?: string;
  }>({});

  // Clear errors when user starts typing/selecting
  const handleJobDescriptionChange = (value: string) => {
    setJobDescription(value);
    if (errors.jobDescription && value.trim()) {
      setErrors(prev => ({ ...prev, jobDescription: undefined }));
    }
  };

  const handleFileSelect = (file: File | null) => {
    setResumeFile(file);
    if (errors.resume && file) {
      setErrors(prev => ({ ...prev, resume: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    // Resume validation
    if (!resumeFile) {
      newErrors.resume = 'Please upload your resume (PDF format only)';
    }
    // else {
    //   if (resumeFile.type !== 'multipart/form-data') {
    //     newErrors.resume = 'Only PDF files are supported';
    //   } else if (resumeFile.size > 10 * 1024 * 1024) {
    //     newErrors.resume = 'File size must be less than 10MB';
    //   }
    // }
    
    // Job description validation
    if (!jobDescription.trim()) {
      newErrors.jobDescription = 'Job description is required';
    } else if (jobDescription.trim().length < 50) {
      newErrors.jobDescription = 'Please provide a more detailed job description (at least 50 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await resumeApi.generateResume({
        resumeFile: resumeFile!,
        jobDescription,
        extraInfo: extraInfo.trim() || undefined,
      });

      // Navigate to results with the response data
      navigate('/results', { 
        state: { 
          resumeData: response,
          originalFileName: resumeFile!.name
        } 
      });

      toast({
        title: "Success!",
        description: "Your resume has been optimized successfully.",
      });
    } catch (error: any) {
      console.error('Resume generation error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to generate resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResumeFile(null);
    setJobDescription('');
    setExtraInfo('');
    setErrors({});
  };

  const handleGoBack = () => {
    navigate('/');
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
            Back
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
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Upload Your Resume
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload your current resume and provide the job description to get an ATS-optimized version
            </p>
          </div>

          <Card className="p-8 card-gradient border-border shadow-custom">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Resume Upload */}
              <div className="space-y-2">
                <Label htmlFor="resume" className="text-base font-semibold">
                  Resume File *
                </Label>
                <FileUpload
                  onFileSelect={handleFileSelect}
                  selectedFile={resumeFile}
                  error={errors.resume}
                />
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <Label htmlFor="jobDescription" className="text-base font-semibold">
                  Job Description *
                </Label>
                <Textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => handleJobDescriptionChange(e.target.value)}
                  placeholder="Paste the complete job description here..."
                  className={`min-h-[200px] resize-none ${errors.jobDescription ? 'border-danger focus:border-danger' : ''}`}
                />
                {errors.jobDescription && (
                  <p className="text-sm text-danger">{errors.jobDescription}</p>
                )}
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Include the full job posting including requirements, responsibilities, and qualifications
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {jobDescription.length}/50 min
                  </span>
                </div>
              </div>

              {/* Extra Information */}
              <div className="space-y-2">
                <Label htmlFor="extraInfo" className="text-base font-semibold">
                  Additional Information (Optional)
                </Label>
                <Textarea
                  id="extraInfo"
                  value={extraInfo}
                  onChange={(e) => setExtraInfo(e.target.value)}
                  placeholder="Any additional information you'd like to highlight (skills, achievements, preferences)..."
                  className="min-h-[120px] resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  Provide any extra context or specific requirements for your resume
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  disabled={isLoading}
                  className="flex-1 group"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                      Optimizing Resume...
                    </>
                  ) : (
                    <>
                      Generate ATS Resume
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset Form
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default ResumeFormPage;