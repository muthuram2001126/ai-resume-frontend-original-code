import api from './client';

export interface ResumeRequest {
  resumeFile: File;
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
    formData.append('resumeFile', data.resumeFile);
    formData.append('jobDescription', data.jobDescription);
    if (data.extraInfo) {
      formData.append('extraInfo', data.extraInfo);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0]+ ':', pair[1]);
    }

    const response = await api.post('/api/resumes/generate', formData);

    return response.data;
  },

  // Download generated PDF
  downloadPdf: async (): Promise<Blob> => {
    const latestFileName= await  api.get(`/api/resumes/latest-filename`);
    const response = await api.get(`/api/resumes/download/${latestFileName.data}`, {
      responseType: 'blob',
    });

    return response.data;
  },
};

export default resumeApi;