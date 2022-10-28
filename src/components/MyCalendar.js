import React,{useCallback,useState} from 'react'
import { Calendar, momentLocalizer,Views} from 'react-big-calendar'
import moment from 'moment'
import { LanguageContext } from './Header'
import 'moment/locale/fi'

export const MyCalendar = ({bookings,...props}) => {
    const [language] = React.useContext(LanguageContext)
    const [view, setView] = useState(Views.MONTH)
   
    const onView = useCallback((newView) => setView(newView), [setView])
    moment.locale(language)
    const localizer = momentLocalizer(moment)
    const lang = {
      en: null,
      fi: {
        week: 'Viikko',
        work_week: 'Työviikko',
        day: 'Päivä',
        month: 'Kuukausi',
        previous: 'Edellinen',
        next: 'Seuraava',
        today: 'Tänään',
        agenda: 'Kalenteri',
    
        showMore: (total) => `+${total} lisää`,
      },

    }
    
    const formats = {
      monthHeaderFormat: (date, culture, localizer) =>
      localizer.format(date, 'MMM-YY', culture),
      dayHeaderFormat: (date, culture, localizer) =>
      localizer.format(date, 'ddd MM-YY', culture),
      dayRangeHeaderFormat: ({start, end},culture, localizer) =>
        localizer.format(start, 'ddd D', culture) + ' - ' + localizer.format(end, 'ddd D', culture)
    }
    const refactorTooltip= (event)=>{
      const dateStart= new Date(event.start);
      const dateEnd= new Date(event.end);
      const dateStartHour= dateStart.getHours();
      const dateStartMinutes= (dateStart.getMinutes()<10?'0':'')+dateStart.getMinutes();
      const dateEndHour= dateEnd.getHours();
      const dateEndMinutes= (dateEnd.getMinutes()<10?'0':'')+dateEnd.getMinutes();
    return view === 'month'?dateStartHour+':'+dateStartMinutes+' - '+ dateEndHour+':'+dateEndMinutes+'\n'+event.title+'\n'+event.extra:'\n'+event.title+'\n'+event.extra;


    }
    



  return (
    <div style={{width:'79vw'}}>
        
    <Calendar
 
      localizer={localizer}
      events={bookings}
      startAccessor="start"
      endAccessor="end"
      formats={formats}
      messages={lang[language]}
      tooltipAccessor={(event)=>refactorTooltip(event)}
  
      onView={onView}
      view={view}
      style={{borderRadius:20,borderBottomLeftRadius:10,borderBottomRightRadius:10,overflow:'hidden',height:600,backgroundColor:'white',marginTop:70,marginBottom:70}}
      views={[
        'month',
        'week',
        'day'
      ]}
      
      min={new Date(1972, 0, 1, 8, 0, 0, 0)}
      max={new Date(1972, 0, 1, 19, 0, 0, 0)}
        
        onSelectEvent={(event)=>alert(event)}
     
    />
    
  </div>
  )
}
