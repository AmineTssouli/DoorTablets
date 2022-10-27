import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header,LanguageContext } from '../components/Header';

import { Config } from './Config';
 
const queryClient = new QueryClient()

export const Main = () => {
  const [language,setLanguage] = useState('en');
  const [room,setRoom]= useState(null);
  return (
  <QueryClientProvider client={queryClient}>
    <LanguageContext.Provider value={[language,setLanguage]}>
    <Header />
    <Config language={language} />
  
    </LanguageContext.Provider>
  </QueryClientProvider>
  )

}

