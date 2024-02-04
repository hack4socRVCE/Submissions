import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const QRScannerPage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent>
        {/* Your QR scanner page content goes here */}
        <h1>QR Scanner Page</h1>

        {/* Example button to navigate back */}
        <button onClick={() => history.push('/QRScanner')}>Go back to home</button>
      </IonContent>
    </IonPage>
  );
};

export default QRScannerPage;
