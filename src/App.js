import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import MultiSearchReplace from './pages/MultiSearchReplace';
import FuzzySearch from './pages/FuzzySearch';
import HangarooPuzzle from './pages/HangarooPuzzle';
import Spinner from './pages/Spinner';
import Rope from './pages/Rope';
import AdjectiveFiller from './pages/AdjectiveFiller';
import ClickCounter from './pages/ClickCounter';
import DateTimeFetcher from './pages/DateTimeFetcher';
import NavBar from './pages/NavBar';
import Accordion from './pages/Accordion';
import TabNavigation from './pages/TabNavigation';
import Test from './pages/Test';
import { ThemeProvider } from './pages/ThemeProvider';
import ThemedButton from './pages/ThemedButton';
import TodoList from './pages/TodoList';
import HTMLForm from './pages/HTMLForm';
import HolyGrailLayout from './pages/HolyGrailLayout';
import MortgageCalculator from './pages/MortgageCalculator';
import PaginatedDataTable from './pages/PaginatedDataTable';
import DiceRoller from './pages/DiceRoller';
import FileExplorer from './pages/FileExplorer';
import { ModalTest } from './pages/ModalTest';
import TrafficLight from './pages/TrafficLight';
import DigitalClock from './pages/DigitalClock';
import ImageCarousel from './pages/ImageCarousel';
import JobBoard from './pages/JobBoard';
import OfficeManagement from './pages/OfficeManagement';
import { paginatedDataTableUsers, fileExplorerData, imageCarouselData } from './assets/data';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route index element={<Home />} />
          <Route path="multiSearchReplace" element={<MultiSearchReplace />} />
          <Route path="fuzzySearch" element={<FuzzySearch />} />
          <Route path="hangarooPuzzle" element={<HangarooPuzzle />} />
          <Route path="spinner" element={<Spinner />} />
          <Route path="rope" element={<Rope />} />
          <Route path="adjectiveFiller" element={<AdjectiveFiller />} />
          <Route path="clickCounter" element={<ClickCounter />} />
          <Route path="dateTimeFetcher" element={<DateTimeFetcher />} />
          <Route path="navBar" element={
            <NavBar links={[
              { name: 'Space Weather Live', target: 'https://www.spaceweatherlive.com/' },
              { name: 'Light Pollution Map', target: 'https://www.lightpollutionmap.info/' },
              { name: 'Clear Dark Sky', target: 'https://www.cleardarksky.com/' },
            ]} />
          } />
          <Route path="accordion" element={<Accordion items={[
            { id: '1', title: 'Title 1', content: 'This is the first item in the Accordion list' },
            { id: '2', title: 'Title 2', content: 'And then comes the second item in the Accordion list' },
            { id: '3', title: 'Title 3', content: 'Third item in the accordion list comes after the second' },
            { id: '4', title: 'Title 4', content: 'Finally, the fourth and the last item in the list' },
          ]} />} />
          <Route path="tabNavigation" element={<TabNavigation tabs={[
            { id: '1', title: 'About Us', content: 'This tab shows us information about the About Us of this website' },
            { id: '2', title: 'Services', content: 'The services offered here include eating blueberries, eating corn, and making and eating cake' },
            { id: '3', title: 'Hours', content: 'Hours of operation are from 10am to 1am, no emergency services' },
            { id: '4', title: 'Contact Us', content: 'Leave a letter at the grocery store Aisle 67 under the vegan cookie dough ice cream' },
          ]} />} />
          <Route path="theme" element={
            <ThemeProvider>
              <ThemedButton />
            </ThemeProvider>
          } />
          <Route path="todoList" element={<TodoList />}></Route>
          <Route path="htmlForm" element={<HTMLForm />}></Route>
          <Route path="holyGrailLayout" element={<HolyGrailLayout />}></Route>
          <Route path="mortgageCalculator" element={<MortgageCalculator />}></Route>
          <Route path="paginatedDataTable" element={<PaginatedDataTable users={paginatedDataTableUsers} />}></Route>
          <Route path="diceRoller" element={<DiceRoller />}></Route>
          <Route path="fileExplorer" element={<FileExplorer data={fileExplorerData} />}></Route>
          <Route path="modalTest" element={<ModalTest />}></Route>
          <Route path="trafficLight" element={<TrafficLight />}></Route>
          <Route path="digitalClock" element={<DigitalClock />}></Route>
          <Route path="imageCarousel" element={<ImageCarousel images={imageCarouselData} />}></Route>
          <Route path="jobBoard" element={<JobBoard />}></Route>
          <Route path="officeManagement" element={<OfficeManagement />}></Route>
          <Route path="test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
