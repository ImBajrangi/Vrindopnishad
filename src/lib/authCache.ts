export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  signedInAt: string;
  provider: 'email' | 'google' | 'apple' | 'guest';
}

const AUTH_CACHE_KEY = 'vrindopnishad_auth_session_v1';

export const getCachedUser = (): UserProfile | null => {
  try {
    const cached = localStorage.getItem(AUTH_CACHE_KEY);
    if (!cached) return null;
    return JSON.parse(cached) as UserProfile;
  } catch (error) {
    console.error('Error reading auth cache:', error);
    return null;
  }
};

export const setCachedUser = (user: UserProfile): void => {
  try {
    localStorage.setItem(AUTH_CACHE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error setting auth cache:', error);
  }
};

export const clearCachedUser = (): void => {
  try {
    localStorage.removeItem(AUTH_CACHE_KEY);
  } catch (error) {
    console.error('Error clearing auth cache:', error);
  }
};
