import React from 'react'
import img from '../../img.jpg'
import '../../global.css'
function Landing() {
  return (
    <div className='landing'>
      <p className="landing-para">
        Our country is indeed a crowded one and along with a 
        lot of people comes a lot of traffic! <br></br>
        The traffic police work day in and day out to ensure traffic dicipline yet struggle sometimes 
        due to the sheer volume of traffic! <br></br>
        This app aims to make storage of traffic offences an easy and effortless process! <br></br>
        Enter a new offence by clicking the top right icon! <br></br>
        View offences allows one to view recently entered offences and also search for 
        a drivers details based on DL number!


      </p>
      <div className="img--cnt">
          <img src={img}
       alt="img" className="landing--img" />
      </div>
    

    </div>
  )
}

export default Landing