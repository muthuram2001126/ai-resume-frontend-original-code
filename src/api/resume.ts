import api from './client';

export interface ResumeRequest {
  resume: File;
  jobDescription: string;
  extraInfo?: string;
}

export interface ResumeSection {
  type: string;
  content: any;
}

export interface ResumeResponse {
  atsScore: number;
  header: any;
  summary: string;
  education: any[];
  skills: any[];
  experience: any[];
  projects: any[];
  achievements: any[];
  certifications: any[];
  pdfPath: string;
}

export const resumeApi = {
  // Generate optimized resume
  generateResume: async (data: ResumeRequest): Promise<ResumeResponse> => {
    const formData = new FormData();
    formData.append('resume', data.resume);
    formData.append('jobDescription', data.jobDescription);
    if (data.extraInfo) {
      formData.append('extraInfo', data.extraInfo);
    }

    const response = await api.post('/api/resume/generate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  // Download generated PDF
  downloadPdf: async (pdfPath: string): Promise<Blob> => {
    const response = await api.get(`/api/resume/download/${pdfPath}`, {
      responseType: 'blob',
    });

    return response.data;
  },
};

export default resumeApi;