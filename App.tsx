

import { AuthContextProvider } from '@/context/auth.context';
import './src/styles/global.css';
import NavigationRoutes from '@/routes';
import { SnackbarContextProvider } from '@/context/snackbar.context';
import { Snackbar } from '@/Components/Snackbar';

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <NavigationRoutes/>
        <Snackbar/>
      </AuthContextProvider>
    </SnackbarContextProvider>
  );
}


