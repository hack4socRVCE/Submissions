import { IonContent, IonHeader, IonPage, IonNavLink,IonButton,IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonTitle, IonToolbar,IonInput,IonImg } from '@ionic/react';
import Root from '../Rootpage/RootPage';
import SignUp  from './SignUpPage';
import './LoginPage.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
      <IonImg src="/assets/logo copy.png" alt="Logo" className="logo" />
  <IonTitle>TEENGUARD</IonTitle>
  <IonTitle style={{ fontSize: '14px' }}>Take Control of Your Child's Social Media Usage</IonTitle>
</IonToolbar>
</IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard className="ExploreContainer-card">
      <IonCardHeader className="ExploreContainer-card-header">
        <IonCardTitle className="ExploreContainer-card-title">Login</IonCardTitle>
        <IonCardSubtitle className="ExploreContainer-card-subtitle">Enter your credentials</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent className="ExploreContainer-card-content" >
        <form className="ExploreContainer-form">
            <IonInput label='Username' type="text" />
          <br />
            <IonInput label="Password" type="password" />
          <br />
          <IonNavLink routerDirection="forward" component={() => <Root />}>
          <IonButton>Login</IonButton>
        </IonNavLink>
        </form>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>New user? <IonNavLink routerDirection="forward" component={() => <SignUp />}>Sign Up</IonNavLink></p>
      </IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;