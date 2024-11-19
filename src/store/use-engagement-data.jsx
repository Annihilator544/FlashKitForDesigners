import {create} from 'zustand';

export const useEngagementData = create((set) => ({
    Engagement: {},
    setEngagement: (data) => set({Engagement: data})
}));