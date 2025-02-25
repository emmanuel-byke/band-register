import Navbar from './Navbar';
import Hero from './Hero';
import StatisticalSummary from './StatisticalSummary';
import PendingSchedules from './PendingSchedules';
import ActivitiesSummary from './ActivitiesSummary';
import Feedback from './Feedback';
import BandRegistration from './BandRegistration';
import StatisticalDetails from './StatisticalDetails';
import Contact from './Contact';

function HomePage() {

  return (
    <header>
      <nav>
        <Navbar />
      </nav>
        <Hero />        
      <div className='mx-8'>
        <BandRegistration />
        <PendingSchedules />
        <ActivitiesSummary />
        {/* <StatisticalSummary /> */}
        <Feedback />
      </div>
      <StatisticalDetails />
      <Contact />
    </header>
  )
}

export default HomePage
