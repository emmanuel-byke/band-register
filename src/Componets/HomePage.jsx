import { useContext, useState } from 'react';
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
import { NewCommer } from '../features/welcome/NewCommer';
import { useUser } from '../state/hooks/ContextUser';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppProvider';

function HomePage() {
  const [isConnected, setIsConnected] = useState(null);
  const { showWelcome, setShowWelcome } = useContext(AppContext);
  const { user } = useUser();
  const navigate = useNavigate();

  if(isConnected && showWelcome && user?.logged_in_times < 1) {
    navigate('/welcome');
    setShowWelcome(false);
  }

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
