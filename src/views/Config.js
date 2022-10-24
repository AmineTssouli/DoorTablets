import React from 'react'

export const Config = () => {
  return (
    <div style={{display:'flex',justifyContent:'center',marginTop:50}}>
        <label style={{marginRight:20}} for="rooms">Choose a room:</label>
            <select id="rooms">
            <option value="volvo">Volvoqqqqqq</option>
            <option selected value="saab">Saabsssssss</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
            </select>
    </div>
  )
}
