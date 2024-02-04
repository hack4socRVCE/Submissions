import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent>
        {/* Your profile page content goes here */}
        <h1>Profile Page</h1>

        {/* Example button to navigate back */}
        <button onClick={() => history.push('/Profile')}>Go back to home</button>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
