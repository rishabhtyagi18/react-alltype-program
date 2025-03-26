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
    <CharacterMovies />
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
