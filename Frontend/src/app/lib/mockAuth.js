/**
 * Mock Auth Helper for Testing Careers Dashboard
 * Use this to quickly test the careers features without a backend
 * 
 * Open browser console and run:
 * localStorage.setItem('aw_mock_user', JSON.stringify({ id: 'test-user-1', name: 'John Doe', email: 'john@test.com' }))
 */

export function setMockUser(userData = {}) {
  const mockUser = {
    id: userData.id || 'test-user-' + Date.now(),
    name: userData.name || 'Test User',
    email: userData.email || 'test@example.com',
    ...userData
  };
  
  localStorage.setItem('aw_mock_user', JSON.stringify(mockUser));
  console.log('✅ Mock user set:', mockUser);
  console.log('🔄 Refresh page to see changes');
  return mockUser;
}

export function getMockUser() {
  try {
    const user = localStorage.getItem('aw_mock_user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error reading mock user:', error);
    return null;
  }
}

export function clearMockUser() {
  localStorage.removeItem('aw_mock_user');
  console.log('✅ Mock user cleared');
}

// Quick test data generators
export function createTestApplications(userId) {
  const testApps = [
    {
      id: 1,
      jobId: 1,
      userId,
      fullName: 'Test User',
      email: 'test@example.com',
      phone: '+91 98765 43210',
      jobTitle: 'Piezoelectric Engineer',
      department: 'Engineering',
      status: 'Shortlisted',
      appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'Job Application',
      skills: 'Circuit Design, Materials Science, MATLAB',
      experience: '5 years in piezoelectric systems',
      whyJoin: 'Excited about sustainable energy solutions',
      whyHire: 'Strong track record with energy harvesting',
      resume: 'test-resume.pdf'
    },
    {
      id: 2,
      jobId: 3,
      userId,
      fullName: 'Test User',
      email: 'test@example.com',
      phone: '+91 98765 43210',
      jobTitle: 'Mobile App Developer',
      department: 'Technology',
      status: 'Under Review',
      appliedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'Job Application',
      skills: 'React Native, JavaScript, Mobile UI',
      experience: '3 years in mobile development',
      whyJoin: 'Love building innovative mobile apps',
      whyHire: 'Proven expertise in React Native',
      resume: 'test-resume.pdf'
    },
    {
      id: 3,
      userId,
      fullName: 'Test User',
      email: 'test@example.com',
      phone: '+91 98765 43210',
      status: 'Resume Submitted',
      submittedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'General Application',
      skills: 'Full-stack development, DevOps, Cloud',
      experience: '7 years in software development',
      preferredRole: 'Senior Engineer',
      whyJoinAmpereWalk: 'Passionate about sustainable energy',
      resume: 'test-resume.pdf'
    }
  ];
  
  localStorage.setItem('aw_career_applications', JSON.stringify(testApps.slice(0, 2)));
  localStorage.setItem('aw_career_general_applications', JSON.stringify([testApps[2]]));
  console.log('✅ Test applications created:', testApps.length);
  return testApps;
}

export function clearTestData() {
  localStorage.removeItem('aw_career_applications');
  localStorage.removeItem('aw_career_general_applications');
  clearMockUser();
  console.log('✅ All test data cleared');
}
