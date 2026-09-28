import { Child, Activity, Badge, DailyMission, Project, DashboardStats, AICoachRequest, AICoachResponse } from '../../shared/types.ts';

const TOKEN_KEY = 'smartkidslab_token';

export const api = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {})
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(endpoint, {
      ...options,
      headers
    });

    if (response.status === 401) {
      this.clearToken();
      window.dispatchEvent(new Event('auth:unauthorized'));
      throw new Error('Session expirée');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur serveur (${response.status})`);
    }

    return response.json();
  },

  // Auth
  async login(username: string, password: string) {
    const data = await this.request<{ token: string; user: any; children: Child[] }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    this.setToken(data.token);
    return data;
  },

  async logout() {
    try {
      await this.request('/api/auth/logout', { method: 'POST' });
    } finally {
      this.clearToken();
    }
  },

  async getMe() {
    return this.request<{ user: any; children: Child[] }>('/api/me');
  },

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request<{ success: boolean; message: string }>('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword })
    });
  },

  // Children
  async getChildren(): Promise<Child[]> {
    return this.request<Child[]>('/api/children');
  },

  async createChild(data: { name: string; age: number; avatar: string }): Promise<Child> {
    return this.request<Child>('/api/children', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async getChild(id: string): Promise<Child & { levelProgress: any }> {
    return this.request<Child & { levelProgress: any }>(`/api/children/${id}`);
  },

  async updateChild(id: string, updates: Partial<Child>): Promise<Child> {
    return this.request<Child>(`/api/children/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },

  async deleteChild(id: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/api/children/${id}`, {
      method: 'DELETE'
    });
  },

  // Activities
  async getActivities(childId: string, category?: string): Promise<Activity[]> {
    const query = category ? `?category=${category}` : '';
    return this.request<Activity[]>(`/api/children/${childId}/activities${query}`);
  },

  async getActivity(id: string): Promise<Activity> {
    return this.request<Activity>(`/api/activities/${id}`);
  },

  async completeActivity(activityId: string, payload: {
    childId: string;
    isSuccess: boolean;
    score?: number;
    timeSpentSeconds?: number;
    hintsUsed?: number;
  }) {
    return this.request<{
      success: boolean;
      xpEarned: number;
      badgeBonusXp: number;
      totalXp: number;
      oldLevel: number;
      newLevel: number;
      levelUp: boolean;
      levelProgress: any;
      newlyUnlockedBadges: Badge[];
      streak: number;
    }>(`/api/activities/${activityId}/complete`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  // Badges & Missions
  async getBadges(childId: string): Promise<Badge[]> {
    return this.request<Badge[]>(`/api/children/${childId}/badges`);
  },

  async getMissions(childId: string): Promise<DailyMission[]> {
    return this.request<DailyMission[]>(`/api/children/${childId}/missions`);
  },

  // Projects
  async getProjects(childId: string): Promise<Project[]> {
    return this.request<Project[]>(`/api/children/${childId}/projects`);
  },

  async saveProject(childId: string, project: {
    title: string;
    description: string;
    category: string;
    skills: string[];
    data: any;
  }) {
    return this.request<{
      project: Project;
      xpEarned: number;
      newTotalXp: number;
      levelProgress: any;
      newlyUnlockedBadge?: Badge;
    }>(`/api/children/${childId}/projects`, {
      method: 'POST',
      body: JSON.stringify(project)
    });
  },

  // Dashboard stats
  async getDashboard(childId?: string): Promise<DashboardStats> {
    const query = childId ? `?childId=${childId}` : '';
    return this.request<DashboardStats>(`/api/dashboard${query}`);
  },

  // AI Coach
  async askCoach(req: AICoachRequest): Promise<AICoachResponse> {
    return this.request<AICoachResponse>('/api/ai/coach', {
      method: 'POST',
      body: JSON.stringify(req)
    });
  }
};
