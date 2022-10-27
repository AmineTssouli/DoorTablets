import React, { useContext } from 'react'
import LOGO from '../img/lab-logo.svg'
import HELP from  '../img/Blue_question_mark_icon.svg'
import Flag_fi from '../img/Flag_of_Finland.svg'
import Flag_uk from '../img/Flag_of_the_United_Kingdom.svg'


export const LanguageContext = React.createContext();

export const Header = () => {

  const [language,setLanguage] = useContext(LanguageContext);
  

  return (
    <>
    <div style={{backgroundColor:'white',padding:10,height:70,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        
          <div style={{paddingLeft:20}}>
          <img alt='LAB University of Applied Sciences'  width={250} src={LOGO} ></img>
      </div>
        <div style={{display:'flex',flexDiredection:'row',justifyContent:'space-between'}} >
          <div style={{marginRight:30,marginTop:10,cursor:'pointer'}} >
           <img alt='Flag' onClick={()=>language === 'en'?setLanguage('fi'):setLanguage('en')} style={{borderWidth:1,borderStyle:'solid'}} height={25} width={48} src={language === 'en'?Flag_fi:Flag_uk } ></img>
        
          </div>
          <div style={{marginRight:40,cursor:'pointer'}}>
           <img  alt='Help' style={{borderRadius:30,borderStyle:'solid'}} height={40} width={40} src={HELP} ></img>
        </div>
    
        </div>
    </div>
    </>
  )
}
