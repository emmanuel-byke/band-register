import { useState } from 'react';
import { navHeaders } from "../assets/constants";
import { icons } from "../assets/index";
import ActivitiesSummary from './ActivitiesSummary';
import BandRegistration from './BandRegistration';
import Contact from './Contact';
import Feedback from './Feedback';
import Hero from './Hero';
import Navbar from './Navbar';
import PendingSchedules from './PendingSchedules';
import StatisticalDetails from './StatisticalDetails';
import TestConnection from './TestConnection';

function HomePage() {
  const [isConnected, setIsConnected] = useState(null);


  return (
    <div>

      {isConnected ? 
        <>
          <nav>
            <Navbar 
              navHeaders={ navHeaders }
              mainIcon={icons.mainIcon}
              userIcon={icons.userIcon}
            />
          </nav>
            <Hero />
          <div className='mx-8'>
            <BandRegistration />
            <PendingSchedules />
            <ActivitiesSummary />
            <Feedback />
          </div>
          <StatisticalDetails />
          <Contact />
        </>
      : <TestConnection 
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
      }

      

    </div>
  )
}

export default HomePage
