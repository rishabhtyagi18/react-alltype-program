import logo from './logo.svg';
import './App.css';
import SearchComponent from './Components/SearchComponent'
import Chessboard from './Components/Chessboard'
import DropdownWithDetails from './Components/DropdownWithDetails'
import FlipkartProductPage from './Components/FlipkartProductPage'
import DataTable from './Components/SideBarNavigation/DataTable'
import Sidebar from './Components/SideBarNavigation/Sidebar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartComponent from './Components/FetchCartDisplayItem/CartComponent';
import CharacterMovies from './Components/MovieApp/CharacterMovies'
import CommentSection from './Components/CommentsLikeReddit/CommentSection';
import withTimerHOC from './Components/TimerWithHOC/withTimerHOC';
import TimerDisplay from './Components/TimerWithHOC/TimerDisplay';
import CountdownTimer from './Components/TimerWithHOC/CountdownTimer';
import GridSequence from './Components/GridSequence/GridSequence';
import CountDownTimerWithButtons from './Components/CountDownTimerWithButtons/CountDownTimerWithButtons';

const EnhancedTimerDisplay = withTimerHOC(TimerDisplay);

function App() {
  return (
    // <SearchComponent />
    // <div style={styles.container}>
    //   {/* <DropdownWithDetails /> */}
    //   <FlipkartProductPage />
    // </div>

    // <Router>
    //   <div style={{ display: 'flex' }}>
    //     <Sidebar />
    //     <div style={{ marginLeft: '240px', padding: '20px', flexGrow: 1 }}>
    //       <Routes>
    //         <Route path="/" element={<h1>Dashboard</h1>} />
    //         <Route path="/table" element={<DataTable />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </Router>
    // <CartComponent />
    // <CharacterMovies />

    // <div>
    //   <h1>Reddit-like Comment System</h1>
    //   <CommentSection />
    // </div>


    // <div>
    //   <h1>Higher-Order Component Timer Example</h1>
    //   <EnhancedTimerDisplay />
    //   <CountdownTimer startSeconds={10} />
    // </div>

    // <GridSequence />

    <CountDownTimerWithButtons />
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    height: '100vh', // Full viewport height
    backgroundColor: '#f0f0f0', // Optional background color
  },
};

export default App;
