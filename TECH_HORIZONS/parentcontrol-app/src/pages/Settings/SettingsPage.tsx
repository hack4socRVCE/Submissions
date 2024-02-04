import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent>
        {/* Your settings page content goes here */}
        <h1>Settings Page</h1>

        {/* Example button to navigate back */}
        <button onClick={() => history.push('/Settings')}>Go back to home</button>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
