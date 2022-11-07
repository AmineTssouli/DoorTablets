import React, {useMemo, useState } from 'react'
import { useQuery } from 'react-query';
import axios from 'axios'
import { getBookings } from '../data/bookings';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from '../img/404.svg';
import { MyCalendar } from '../components/MyCalendar';


export const Config = ({language}) => {
  const [building,setBuilding] =useState(0)
  const [rooms,setRooms] =useState([])
  const [room,setRoom] = useState(0);
  const [choice,setChoice]=useState(false);

  const buildings = [
  {id:"46287",value:"Mukkulankatu 19 A 1. krs" },
  {id:"46288",value:"Mukkulankatu 19 A 2. krs" },
  {id:"46289",value: "Mukkulankatu 19 B 2. krs" },
  {id: "46290",value:"Mukkulankatu 19 C 2. krs" },
  {id:"47658",value:"Mukkulankatu 19 D 1. krs" },
  {id:"46291",value: "Mukkulankatu 19 D 2. krs"},
  {id:"38096",value:"Niemenkatu 73" },
  {id:"53468",value:"Skinnarila 1-vaihe" },
  {id:"53469",value:"Skinnarila 2-vaihe" },
  {id:"53470",value:"Skinnarila 3-vaihe" },
  {id:"53471",value:"Skinnarila 6-vaihe" },
  {id:"53472",value: "Skinnarila 7-vaihe"},
  {id:"51493",value:"Skinnarila AMK"},
  {id:"53473",value:"Skinnarila YO-talo" },
  {id:"47732",value:"Ulkopuolinen tila" },
  {id:"00000",value:"LUT"}
]

  


  useMemo(async ()=> {
      setRooms([])
      setRoom(0)
       if(building !== 0 || building ==="00000") {
        
      const response = await axios.get("/buildings?building="+building);
      const rms = await response.data;
      const entries =  Object.keys(rms).map((key) =>{
        return {id:rms[key],value:key}
      });
      
      setRooms(entries);

       }
  },[building]);

 const handleOnChange = (event)=>{
  
  setBuilding(event.target.value);
  
 }

  const ListRooms =  ()=> {
    const r = room;
     return (
      rooms.map((room,key)=>{
        return <option style={{color:r===room.id?'#00E5D7':'black',fontWeight:500}} key={key} value={room.id}>{room.value}</option>
      })
    )
    

  };

  const ListBuildings = () => {
    const b = building;
    return (

    buildings.map((building,key)=>{
      return <option style={{color:b===building.id?'#00E5D7':'black',fontWeight:500}}  key={key} value={building.id}>{building.value}</option>
    })
  )
  };
  

  

  
  const getRoom = ()=> {

      setChoice(true)
 
  }
  
  function MainView() {
    const {isError, isLoading, data:data,happening} = useQuery(
      ["bookings",room],
      ()=>getBookings(room),
      {staleTime:6000}
      );
 
  
    if(isLoading) {
      return <LoadingSpinner />
    }
  
    
    if(isError) {
      return <div style={{display:'grid',justifyContent:'center',alignItems:'center',height:'100vh',width:'100vw'}}>
      <div style={{ position: 'absolute', zIndex: '1' ,left:'18vw',fontSize:'2vw',fontFamily:'cursive',color:'#00E5D7',transform: 'rotate(-45deg)'}}>Something  Went  Wrong</div>
      <img alt='404' width='100%' height='100%' src={NotFound} ></img>
      </div>
    }
        
  
    return (
      
      <div style={{ overflow: 'hidden'}}>
        
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
          <MyCalendar bookings={data} />
          <div style={{marginTop:70,height:600,width:200,display:'flex',flexDirection:'column',justifyContent:'space-around',textAlign:'center',alignItems:'center'}}>
            <div style={{borderRadius:10,borderStyle:'double',width:150,height:150,backgroundColor:'white',display:'flex',justifyContent:'center',alignItems:'center'}}>
              <div >
                <span style={{fontFamily:'cursive',fontSize:25,color:'black',fontWeight:900}}>{room!==0?room:''}</span>
                  <hr style={{marginBottom:15,marginTop:15,backgroundColor:'#00C2E5'}}/>
                  {
                    happening?
                    <span style={{fontFamily:'cursive',fontSize:25,color:'red',fontWeight:900}}>{language === 'en'?'Reserved':'Varattu'}</span>
                    :<span style={{fontFamily:'cursive',fontSize:25,color:'green',fontWeight:900}}>{language === 'en'?'Free':'Vapaa'}</span>
                  }
                
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

if (choice) return <MainView />

  return (
   <div style={{display:'flex',justifyContent:'center',marginTop:50,alignItems:'center'}}>
       <>
            
           <label htmlFor='buildings' style={{marginRight:20,marginLeft:20,fontWeight:900}} >{language ==='en'?'Building:':'Rakennus'}</label>
            <select style={{fontFamily:'monospace',width:230,height:25,borderColor:'black',borderRadius:10,textAlign:'center',border:'solid'}} value={building} onChange={handleOnChange} id="buildings">
            <option  defaultValue value={0} >{language === 'en'?'Choose a building':'Valitse rakennus'}</option>
            
            <ListBuildings />
          
            </select> 
            <label htmlFor='rooms' style={{marginRight:20,marginLeft:20,fontWeight:900}} > {language === 'en'?'Room:':'Tila'}</label>
            <select   style={{fontFamily:'monospace',width:300,height:25,borderColor:'black',borderRadius:10,textAlign:'center',border:'solid'}} value={room} onChange={(event)=> {setRoom(event.target.value)}} id="rooms">
            <option  defaultValue value={0} >{language === 'en'?'Choose a room':'Valitse tila'}</option>
            {
              
              
              building && <ListRooms />
            }
            </select>
            {parseInt(room) !== 0?<input onClick={getRoom} style={{cursor:'pointer',backgroundColor:'white',borderRadius:10,fontSize:18,marginLeft:40,width:80}}type={'button'} value={language === 'en'?'Show':'Näytä'} />:<div style={{marginLeft:40,width:80}}></div>}
            </>
    </div>
    
  )
}

