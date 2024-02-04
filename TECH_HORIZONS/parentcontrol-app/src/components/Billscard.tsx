import React from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/react';
import { logoInstagram, logoFacebook, logoTwitter } from 'ionicons/icons';
import './BillsCard.css'; 

interface BillsCardProps {
  onButtonClick: () => void;
}

const BillsCard: React.FC<BillsCardProps> = ({ onButtonClick }) => {
  return (
    <div>
      {/* ... (existing code) */}
      <IonButton onClick={onButtonClick}>Check Account Activity</IonButton>
    </div>
  );
};

export default BillsCard;
