import React, { useState } from 'react';
import { QueryClient, QueryClientProvider,useQuery } from 'react-query';
import { MyCalendar } from '../components/MyCalendar';
import { Header,LanguageContext } from '../components/Header';
import { getBookings } from '../data/bookings';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from '../img/404.svg';
// import { Config } from './Config';
 
const queryClient = new QueryClient()

export const Main = () => {
  const [language,setLanguage] = useState('en');
  return (
  <QueryClientProvider client={queryClient}>
    <LanguageContext.Provider value={[language,setLanguage]}>
    <Header />
    {/* <Config /> */}
    <MainView language={language} />
    </LanguageContext.Provider>
  </QueryClientProvider>
  )

}
function MainView({language}) {
  const {isError, isLoading, data} = useQuery(
    ["bookings"],
    getBookings,
    {staleTime:6000}
    );

  if(isLoading) {
    return <LoadingSpinner />
  }

  
  if(isError) {
    return <div style={{display:'grid',justifyContent:'center',alignItems:'center',height:'100vh',width:'100vw'}}>
    <div style={{ position: 'absolute', zIndex: '1' ,left:'18vw',fontSize:'2vw',fontFamily:'cursive',color:'#00E5D7',transform: 'rotate(-45deg)'}}>Something  Went  Wrong</div>
    <img width='100%' height='100%' src={NotFound} ></img>
    </div>
  }
      

  return (
    
    <div style={{ overflow: 'hidden'}}>
      
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
        <MyCalendar bookings={data} />
        <div style={{marginTop:70,height:400,width:200,display:'flex',flexDirection:'column',justifyContent:'space-around',textAlign:'center',alignItems:'center'}}>
          <div style={{borderRadius:10,borderStyle:'double',width:150,height:150,backgroundColor:'white',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div >
              <span style={{fontFamily:'cursive',fontSize:35,fontFamicolor:'black',fontWeight:900}}>2305</span>
                <hr style={{marginBottom:15,marginTop:15,backgroundColor:'#00C2E5'}}/>
              <span style={{fontFamily:'cursive',fontSize:35,color:'green',fontWeight:900}}>{language === 'en'?'Free':'Vapaa'}</span>
            </div>
          </div>
          <div style={{borderRadius:10,borderStyle:'solid',width:150,height:150,backgroundColor:'white',justifyItems:'center'}} >
          <img alt='QR Code' style={{margin:15}}  width={120} height={120} src={require("../img/QR_code.png")} ></img>
          </div>
        </div>

      </div>
       
    </div>
  )
}
