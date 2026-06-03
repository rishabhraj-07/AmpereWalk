/**
 * Careers Application Storage Utility
 * Manages all career application data in localStorage
 */

const STORAGE_KEYS = {
  APPLICATIONS: 'aw_career_applications',
  GENERAL_APPLICATIONS: 'aw_career_general_applications',
};

// Mock job data
export const MOCK_JOBS = [
  {
    id: 1,
    title: "Piezoelectric Engineer",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    description: "Lead the development of next-generation energy harvesting systems.",
    fullDescription: "We are seeking an experienced Piezoelectric Engineer to join our innovative team and lead the development of next-generation energy harvesting systems. You will work on cutting-edge technology that powers sustainable wearables.",
    responsibilities: [
      "Design and optimize piezoelectric energy harvesting circuits",
      "Conduct material research and testing",
      "Collaborate with mechanical engineers on device integration",
      "Document technical specifications and best practices",
      "Mentor junior engineers in the team"
    ],
    skills: [
      "Piezoelectric Physics",
      "Circuit Design",
      "Materials Science",
      "CAD (SOLIDWORKS/Fusion 360)",
      "MATLAB/Python",
      "PCB Design"
    ],
    qualifications: [
      "B.Tech/M.Tech in Electronics, Materials Science, or related field",
      "5+ years of experience in energy harvesting or similar domains",
      "Strong understanding of piezoelectric materials and physics",
      "Experience with prototype development and testing"
    ],
    experience: "5-8 years",
    benefits: [
      "Competitive salary package",
      "Health & wellness benefits",
      "Learning and development budget",
      "Flexible work arrangements",
      "Equity options"
    ]
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Design beautiful, functional smart footwear that users love.",
    fullDescription: "Join our creative design team to craft the next generation of smart footwear. You'll work on user-centric designs that blend aesthetics with functionality.",
    responsibilities: [
      "Create UI/UX designs for mobile and web applications",
      "Design product interfaces and user experiences",
      "Conduct user research and usability testing",
      "Collaborate with engineering and product teams",
      "Create design systems and component libraries"
    ],
    skills: [
      "UI/UX Design",
      "Figma/Adobe XD",
      "Prototyping",
      "User Research",
      "Design Systems",
      "Motion Design"
    ],
    qualifications: [
      "Bachelor's degree in Design, HCI, or related field",
      "3+ years of product design experience",
      "Strong portfolio demonstrating design process",
      "Experience with cross-platform design"
    ],
    experience: "3-6 years",
    benefits: [
      "Competitive salary package",
      "Remote work flexibility",
      "Design tools budget",
      "Conference attendance",
      "Equity options"
    ]
  },
  {
    id: 3,
    title: "Mobile App Developer",
    department: "Technology",
    location: "Bangalore, India",
    type: "Full-time",
    description: "Build the app that connects users to their energy-generating shoes.",
    fullDescription: "We're looking for a talented Mobile App Developer to build our flagship mobile application that helps users track and optimize their energy generation.",
    responsibilities: [
      "Develop iOS/Android applications",
      "Implement real-time data synchronization",
      "Optimize app performance and battery usage",
      "Write clean, maintainable code",
      "Collaborate with backend and design teams"
    ],
    skills: [
      "React Native/Flutter",
      "JavaScript/TypeScript",
      "Mobile UI/UX",
      "REST APIs",
      "Firebase",
      "Git"
    ],
    qualifications: [
      "B.Tech in Computer Science or related field",
      "2+ years of mobile development experience",
      "Experience with React Native or Flutter",
      "Understanding of mobile app architecture"
    ],
    experience: "2-5 years",
    benefits: [
      "Competitive salary",
      "Performance bonuses",
      "Health insurance",
      "Learning opportunities",
      "Stock options"
    ]
  },
  {
    id: 4,
    title: "Sustainability Specialist",
    department: "Operations",
    location: "Hybrid",
    type: "Full-time",
    description: "Ensure our products meet the highest environmental standards.",
    fullDescription: "Be part of our mission to create sustainable products. As a Sustainability Specialist, you'll ensure all our operations and products meet the highest environmental standards.",
    responsibilities: [
      "Assess environmental impact of products",
      "Develop sustainability initiatives",
      "Ensure compliance with environmental regulations",
      "Partner with suppliers on sustainability",
      "Track and report on sustainability metrics"
    ],
    skills: [
      "Sustainability Assessment",
      "Environmental Management",
      "Data Analysis",
      "Regulatory Knowledge",
      "Project Management",
      "Communication"
    ],
    qualifications: [
      "Bachelor's in Environmental Science, Engineering, or related",
      "3+ years in sustainability or environmental management",
      "Knowledge of ISO 14001 or similar standards",
      "Experience with LCA (Life Cycle Assessment)"
    ],
    experience: "3-6 years",
    benefits: [
      "Meaningful work in sustainability",
      "Competitive compensation",
      "Health benefits",
      "Professional development",
      "Equity participation"
    ]
  },
  {
    id: 5,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Mumbai, India",
    type: "Full-time",
    description: "Tell the AmpereWalk story and grow our community.",
    fullDescription: "Lead our marketing efforts to build brand awareness and drive customer acquisition. You'll tell the AmpereWalk story and connect with our growing community.",
    responsibilities: [
      "Develop and execute marketing campaigns",
      "Manage social media presence and community",
      "Create compelling content and messaging",
      "Analyze marketing metrics and ROI",
      "Lead brand partnerships and collaborations"
    ],
    skills: [
      "Digital Marketing",
      "Content Strategy",
      "Social Media Management",
      "Analytics",
      "Copywriting",
      "Campaign Management"
    ],
    qualifications: [
      "Bachelor's in Marketing, Business, or related",
      "3+ years of marketing experience",
      "Experience with digital marketing tools",
      "Strong communication and creativity"
    ],
    experience: "3-6 years",
    benefits: [
      "Competitive salary",
      "Performance bonuses",
      "Marketing tools budget",
      "Team building activities",
      "Career growth opportunities"
    ]
  },
  {
    id: 6,
    title: "Supply Chain Analyst",
    department: "Operations",
    location: "Bangalore, India",
    type: "Contract",
    description: "Optimize our manufacturing and distribution processes.",
    fullDescription: "Join our operations team to optimize supply chain efficiency. You'll work on improving our manufacturing and distribution processes.",
    responsibilities: [
      "Analyze supply chain metrics and KPIs",
      "Identify bottlenecks and optimization opportunities",
      "Manage supplier relationships",
      "Create forecasting models",
      "Implement process improvements"
    ],
    skills: [
      "Supply Chain Management",
      "Data Analysis",
      "Excel/Python",
      "Logistics Knowledge",
      "Problem Solving",
      "Communication"
    ],
    qualifications: [
      "Bachelor's in Supply Chain, Logistics, or Business",
      "1-3 years of supply chain experience",
      "Knowledge of ERP systems",
      "Strong analytical skills"
    ],
    experience: "1-3 years",
    benefits: [
      "Competitive contract rate",
      "Flexible work hours",
      "Professional development",
      "Possibility of full-time conversion",
      "Collaborative environment"
    ]
  }
];

export const getApplicationStatus = () => {
  try {
    const applications = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return applications ? JSON.parse(applications) : [];
  } catch (error) {
    console.error('Error reading applications:', error);
    return [];
  }
};

export const saveApplication = (jobId, formData, userId) => {
  try {
    const applications = getApplicationStatus();
    const newApplication = {
      id: Date.now(),
      jobId,
      userId,
      ...formData,
      status: 'Applied',
      appliedDate: new Date().toISOString(),
      type: 'Job Application'
    };
    
    applications.push(newApplication);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    return newApplication;
  } catch (error) {
    console.error('Error saving application:', error);
    throw error;
  }
};

export const saveGeneralApplication = (formData, userId) => {
  try {
    const applications = localStorage.getItem(STORAGE_KEYS.GENERAL_APPLICATIONS);
    const generalApps = applications ? JSON.parse(applications) : [];
    
    const newApplication = {
      id: Date.now(),
      userId,
      ...formData,
      status: 'Resume Submitted',
      submittedDate: new Date().toISOString(),
      type: 'General Application'
    };
    
    generalApps.push(newApplication);
    localStorage.setItem(STORAGE_KEYS.GENERAL_APPLICATIONS, JSON.stringify(generalApps));
    return newApplication;
  } catch (error) {
    console.error('Error saving general application:', error);
    throw error;
  }
};

export const getGeneralApplications = () => {
  try {
    const applications = localStorage.getItem(STORAGE_KEYS.GENERAL_APPLICATIONS);
    return applications ? JSON.parse(applications) : [];
  } catch (error) {
    console.error('Error reading general applications:', error);
    return [];
  }
};

export const getAllApplications = (userId) => {
  try {
    const jobApplications = getApplicationStatus();
    const generalApplications = getGeneralApplications();
    
    const userJobApps = jobApplications.filter(app => app.userId === userId);
    const userGeneralApps = generalApplications.filter(app => app.userId === userId);
    
    return [...userJobApps, ...userGeneralApps];
  } catch (error) {
    console.error('Error getting all applications:', error);
    return [];
  }
};

export const updateApplicationStatus = (applicationId, newStatus) => {
  try {
    let applications = getApplicationStatus();
    const appIndex = applications.findIndex(app => app.id === applicationId);
    
    if (appIndex !== -1) {
      applications[appIndex].status = newStatus;
      applications[appIndex].updatedDate = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
      return applications[appIndex];
    }
    
    return null;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};

export const getJobById = (jobId) => {
  return MOCK_JOBS.find(job => job.id === parseInt(jobId));
};
