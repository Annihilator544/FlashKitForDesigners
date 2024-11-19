import {create} from 'zustand';

export const useInstagramData = create((set) => ({
    instagramData: [],
    setInstagramData: (data) => set({instagramData: data})
}));