import Navbar from './Navbar';
import Hero from './Hero';
import PendingSchedules from './PendingSchedules';
import ActivitiesSummary from './ActivitiesSummary';
import Feedback from './Feedback';
import BandRegistration from './BandRegistration';
import StatisticalDetails from './StatisticalDetails';
import Contact from './Contact';
import { navHeaders } from "../assets/constants";
import { icons } from "../assets/index";

function HomePage() {
  return (
    <header>


      <nav>
        <Navbar 
          navHeaders={ navHeaders }
          mainIcon={icons.mainIcon}
          userIcon={icons.userIcon}
        />
      </nav>
        {/* <Hero /> */}
      <div className='mx-8'>
        {/* <BandRegistration />
        <PendingSchedules /> */}
        {/* <ActivitiesSummary /> */}
        {/* <Feedback /> */}
      </div>
      {/* <StatisticalDetails /> */}
      <Contact />
    </header>
  )
}

export default HomePage
