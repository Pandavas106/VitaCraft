import { useAuth } from "./auth_context";

export function useResumeData() {
  const { userData } = useAuth();

  return {
    personalInfo: userData?.personalInfo || {},
    education: userData?.education || [],
    experience: userData?.experiences || [],
    profile: userData?.profile || "",
    skills: userData?.skills || { technical: [], soft: [] },
    certificates: userData?.certificates || [],
    projects: userData?.projects || [],
    achievements: userData?.achievements || [],
    organizations: userData?.organizations || [],
  };
}
