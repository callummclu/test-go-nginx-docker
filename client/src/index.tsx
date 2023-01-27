import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { AuthProvider } from './hooks/useAuth';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MantineProvider>
    <NotificationsProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </NotificationsProvider>
  </MantineProvider>
);

serviceWorkerRegistration.unregister();
