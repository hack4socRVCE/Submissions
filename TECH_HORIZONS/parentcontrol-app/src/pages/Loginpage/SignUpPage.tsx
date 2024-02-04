// SignUp.tsx

import React from 'react';
import {
  IonContent,
  IonHeader,
  IonNavLink,
  IonPage,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonTitle,
  IonToolbar,
  IonInput,
  IonLabel,
} from '@ionic/react';
import Root from '../Rootpage/RootPage';
import './SignUpPage.css';

const SignUp: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New User</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard className="ExploreContainer-card">
          <IonCardHeader className="ExploreContainer-card-header">
            <IonCardTitle className="ExploreContainer-card-title">Sign Up</IonCardTitle>
            <IonCardSubtitle className="ExploreContainer-card-subtitle">Enter Details For New Registration</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent className="ExploreContainer-card-content">
            <form className="ExploreContainer-form">
              <IonLabel>
                Email:
                <IonInput type="email" required />
              </IonLabel>
              <br />
              <IonLabel>
                Phone Number:
                <IonInput type="tel" required />
              </IonLabel>
              <br />
              <IonLabel>
                Full Name:
                <IonInput type="text" required />
              </IonLabel>
              <br />
              <IonLabel>
                Date of Birth:
                <IonInput type="date" required />
              </IonLabel>
              <br />
              <IonLabel>
                Password:
                <IonInput type="password" required />
              </IonLabel>
              <br />
              <IonLabel>
                Confirm Password:
                <IonInput type="password" required />
              </IonLabel>
              <br />
              {/* Add more fields as needed */}
              <IonNavLink routerDirection="forward" component={() => <Root />}>
                <IonButton>Sign up</IonButton>
              </IonNavLink>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
