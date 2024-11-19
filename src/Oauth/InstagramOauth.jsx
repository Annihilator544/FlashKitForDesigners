import { Button } from '../components/ui/button';
import { LucideLogIn } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useInstagramData } from 'store/use-instagram-data';

// Replace with your Facebook App details
const FB_APP_ID = '849578353662455'; // Replace with your app's Facebook App ID
const REDIRECT_URI = 'http://localhost:3000/dashboard'; // Replace with your app's redirect URI

const SCOPES = [
  'email',
  'public_profile',
  'instagram_basic',
  'pages_show_list',
  'pages_read_engagement',
  'business_management',
  'instagram_manage_insights',
];

const FacebookLogin = () => {
  const { setInstagramData } = useInstagramData();
  const fetchInstagramBusinessAccount = async (userAccessToken) => {
    try {
      // Step 1: Get the user's Facebook Pages
      const pagesResponse = await fetch(
        `https://graph.facebook.com/me/accounts?fields=id,name,access_token&access_token=${userAccessToken}`
      );
      const pagesData = await pagesResponse.json();

      if (pagesData && pagesData.data && pagesData.data.length > 0) {
        // Step 2: Iterate over pages to find connected Instagram accounts
        for (const page of pagesData.data) {
          const pageId = page.id;
          const pageAccessToken = page.access_token;

          // Step 3: Check if the page has a connected Instagram Business Account
          const igAccountResponse = await fetch(
            `https://graph.facebook.com/${pageId}?fields=instagram_business_account&access_token=${pageAccessToken}`
          );
          const igAccountData = await igAccountResponse.json();

          if (igAccountData && igAccountData.instagram_business_account) {
            const instagramBusinessAccountId =
              igAccountData.instagram_business_account.id;

            console.log('Instagram Business Account ID:', instagramBusinessAccountId);

            // Step 4: Fetch Instagram media using the Page Access Token
            const mediaResponse = await fetch(
              `https://graph.facebook.com/${instagramBusinessAccountId}/media?fields=id,caption,media_type,media_url,permalink,timestamp,username,like_count,comments_count&access_token=${pageAccessToken}`
            );
            const mediaData = await mediaResponse.json();

            console.log('Media Data:', mediaData);
            setInstagramData(mediaData.data);

            // Exit loop after finding the first Instagram business account
            break;
          }
        }
      } else {
        console.log('No pages found.');
      }
    } catch (error) {
      console.error('Error fetching Instagram Business Account:', error);
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      const token = extractAccessToken(hash);
      console.log('Access Token:', token);
      localStorage.setItem('fb_access_token', token);
      fetchInstagramBusinessAccount(token);
    }
  }, []);

  // Redirect the user to Facebook OAuth login page
  const loginWithFacebook = () => {
    const oauthUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=token&scope=${SCOPES.join(',')}`;

    window.location.href = oauthUrl;
  };

  // Extract access token from the URL hash
  const extractAccessToken = (hash) => {
    const params = new URLSearchParams(hash.substring(1)); // Remove the leading '#'
    return params.get('access_token');
  };

  return (
      <Button onClick={loginWithFacebook} className='my-5 max-w-96'>
          Connect <LucideLogIn className='h-5 w-5 ml-2' />
      </Button>
  );
};

export default FacebookLogin;
