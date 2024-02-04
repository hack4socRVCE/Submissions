import React, { useState } from 'react';
import { IonCard, IonCardContent, IonProgressBar, IonLabel, IonButton } from '@ionic/react';
import { IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

const ParentalControlBarsCard: React.FC = () => {
  const [abusiveContentHigh, setAbusiveContentHigh] = useState(70);
  const [abusiveContentModerate, setAbusiveContentModerate] = useState(40);
  const [abusiveContentLow, setAbusiveContentLow] = useState(10);

  const handleButtonClick = () => {
    // Simulating changes in alert levels
    setAbusiveContentHigh(80);
    setAbusiveContentModerate(30);
    setAbusiveContentLow(9);
  };

  return (
    <IonCard>
      <IonCardContent>
        <IonCardHeader>
          <IonCardTitle>Parental Control Alerts</IonCardTitle>
          <IonCardSubtitle>Monitoring Social Media Content</IonCardSubtitle>
        </IonCardHeader>

        <IonLabel>High Level Alerts</IonLabel>
        <IonProgressBar color="danger" value={abusiveContentHigh / 100}></IonProgressBar>

        <IonLabel>Moderate Level Alerts</IonLabel>
        <IonProgressBar color="warning" value={abusiveContentModerate / 100}></IonProgressBar>

        <IonLabel>Low/No Alerts</IonLabel>
        <IonProgressBar color="success" value={abusiveContentLow / 100}></IonProgressBar>

        <IonButton expand="full" onClick={handleButtonClick} style={{ marginTop: '10px' }}>
          Show Alerts
        </IonButton>
      </IonCardContent>
    </IonCard> 
  );
};

export default ParentalControlBarsCard;
