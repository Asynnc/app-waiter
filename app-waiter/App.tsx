import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { Main } from './src/main';
import { Container } from './src/main/styles';

export default function App() {

  const [isFontsLoaded] = useFonts({
    'GeneralSans-Regular': require('./src/assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans-SemiBold': require('./src/assets/fonts/GeneralSans-Semibold.otf'),
    'GeneralSans-Bold': require('./src/assets/fonts/GeneralSans-Bold.otf'),

  });

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <Container>
      <StatusBar />
      <Main />
    </Container>
  );
}
