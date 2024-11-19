import React, { useState, useCallback } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useYoutubeData } from 'store/use-youtube-data';
import { Button } from '../components/ui/button';
import { LucideLogIn } from 'lucide-react';
import localforage from 'localforage';

const ConnectButton = ({ onSuccess, afterSuccess }) => {
  const [isConnected, setIsConnected] = useState(false);
  const { setData } = useYoutubeData();


  const fetchYouTubeAnalytics = useCallback(async (accessToken) => {
    try {
      const response = await axios.get(
        'https://youtubeanalytics.googleapis.com/v2/reports', {
          params: {
            "ids": "channel==MINE",
            startDate: '2019-01-01',
            endDate: '2024-12-31',
            metrics: 'comments,likes,dislikes,shares,views',
            dimensions: 'day',
            sort: 'day'
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      // Process and display the data
      setData(response.data);
    } catch (error) {
      console.error('Error fetching YouTube Analytics:', error);
    }
  }, [setData]);

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
      setIsConnected(true);
      onSuccess(tokenResponse.access_token);
      fetchYouTubeAnalytics(tokenResponse.access_token);
      afterSuccess();
    },
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
  });

  return (
    <Button onClick={() => login()} className='my-5 max-w-96'>
      Connect <LucideLogIn className='h-5 w-5 ml-2' />
    </Button>
  );
};

function YoutubeOauth() {
  const handleLoginSuccess = (accessToken) => {
    localStorage.setItem('youtubeAccessToken', accessToken);
    console.log('accessToken', localStorage.getItem('youtubeAccessToken'));
  };
  
  const { data, setData } = useYoutubeData();

  function processData(data) {
    return data.rows.map(row => ({
      date: new Date(row[0]),
      comments: row[1],
      views: row[5],
      subscribersGained: row[9],
      subscribersLost: row[10]  // Assuming this is the correct index for subscribersLost
    }));
  }
  
  function calculateMonthlyChanges(processedData) {
    const monthlyChanges = {};
    
    processedData.forEach(day => {
      const yearMonth = `${day.date.getFullYear()}-${(day.date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!monthlyChanges[yearMonth]) {
        monthlyChanges[yearMonth] = { views: 0, subscribers: 0, comments: 0 };
      }
      
      monthlyChanges[yearMonth].views += day.views;
      monthlyChanges[yearMonth].subscribers += (day.subscribersGained - day.subscribersLost);
      monthlyChanges[yearMonth].comments += day.comments;
    });
    
    return monthlyChanges;
  }
  
  function calculateYearlyChanges(processedData) {
    const yearlyChanges = {};
    
    processedData.forEach(day => {
      const year = day.date.getFullYear();
      
      if (!yearlyChanges[year]) {
        yearlyChanges[year] = { views: 0, subscribers: 0, comments: 0 };
      }
      
      yearlyChanges[year].views += day.views;
      yearlyChanges[year].subscribers += (day.subscribersGained - day.subscribersLost);
      yearlyChanges[year].comments += day.comments;
    });
    
    return yearlyChanges;
  }
  
  function analyzeChannelData(rawData, currentSubscribers, currentViews) {
    const processedData = processData(rawData);
    const monthlyChanges = calculateMonthlyChanges(processedData);
    const yearlyChanges = calculateYearlyChanges(processedData);
    
    // Calculate total changes
    const totalSubscriberChange = Object.values(yearlyChanges).reduce((sum, year) => sum + year.subscribers, 0);
    const totalViewChange = Object.values(yearlyChanges).reduce((sum, year) => sum + year.views, 0);
    const totalComments = Object.values(yearlyChanges).reduce((sum, year) => sum + year.comments, 0);
    
    // Calculate initial counts
    const initialSubscribers = currentSubscribers - totalSubscriberChange;
    const initialViews = currentViews - totalViewChange;
    
    return {
      monthly: monthlyChanges,
      yearly: yearlyChanges,
      total: {
        initialSubscribers,
        currentSubscribers,
        subscriberChange: totalSubscriberChange,
        initialViews,
        currentViews,
        viewChange: totalViewChange,
        totalComments
      }
    };
  } 
  

  const fetchDataManually = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://youtubeanalytics.googleapis.com/v2/reports', {
          params: {
            "ids": "channel==MINE",
            startDate: '2019-01-01',
            endDate: '2024-12-31',
            metrics: 'comments,likes,dislikes,shares,views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained,subscribersLost',
            dimensions: 'day',
            sort: 'day'
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('youtubeAccessToken')}`,
          },
        }
      );
      console.log(response.data);
      const channelResponse = await axios.get(
        'https://www.googleapis.com/youtube/v3/channels', {
          params: {
            part: 'statistics',
            mine: true,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('youtubeAccessToken')}`,
          },
        }
      );
      const subscriberCount = channelResponse.data.items[0].statistics.subscriberCount;
      const viewCount = channelResponse.data.items[0].statistics.viewCount;
      const result = analyzeChannelData(response.data, subscriberCount, viewCount);
      setData(result);
      console.log(result);
    } catch (error) {
      console.error('Error fetching YouTube Analytics:', error);
    }
  }, [setData]);

  

  return (
    <GoogleOAuthProvider clientId="981134062816-8dkf4i2lm59dhfotllmf43vlgc44408c.apps.googleusercontent.com">
      <div className="App flex flex-col">
        <ConnectButton onSuccess={handleLoginSuccess} afterSuccess={fetchDataManually} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default YoutubeOauth;