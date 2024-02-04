import React from 'react';
import { IonNav } from '@ionic/react';

import LoginPage from './Loginpage/LoginPage';

function Home() {
  return <IonNav root={() => <LoginPage />}></IonNav>;
}
export default Home;