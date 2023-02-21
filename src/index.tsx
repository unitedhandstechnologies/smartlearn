import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { UserInfoProvider } from './contexts/UserContext';
import './Translations/i18n';
import 'react-calendar/dist/Calendar.css';
import './CalendarCustomStyle.css';
import { StudentInfoProvider } from './contexts/StudentContext';

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <UserInfoProvider>
        <StudentInfoProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StudentInfoProvider>
      </UserInfoProvider>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
