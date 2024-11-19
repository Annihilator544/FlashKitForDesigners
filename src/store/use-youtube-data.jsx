import {create} from 'zustand';

export const useYoutubeData = create((set) => ({
    data: {},
    setData: (data) => set({data: data})
}));