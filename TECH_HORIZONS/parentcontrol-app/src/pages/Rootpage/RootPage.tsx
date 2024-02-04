import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect } from 'react-router';

import { playCircle, home, time, add, arrowUp, trash, eyeSharp } from 'ionicons/icons';

import HomePage from '../Homepage/HomePage';
import RadioPage from '../Addfundspage/RadioPage';
import LibraryPage from '../Sendfundspage/LibraryPage';
import SearchPage from '../Transhistorypage/SearchPage';
import ProfilePage from '../Profile/ProfilePage';
import QRScannerPage from '../QRScanner/QRScannerPage';
import SettingsPage from '../Settings/SettingsPage';

function Root() {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/home" />
          <Redirect exact path="/login" to="/home" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          <Route path="/home" render={() => <HomePage />} exact={true} />
          <Route path="/radio" render={() => <RadioPage />} exact={true} />
          <Route path="/library" render={() => <LibraryPage />} exact={true} />
          <Route path="/search" render={() => <SearchPage />} exact={true} />
          <Route path="/profile" render={() => <ProfilePage />} exact={true} />
          <Route path="/qrscanner" render={() => <QRScannerPage />} exact={true} />
          <Route path="/settings" render={() => <SettingsPage />} exact={true} />

          </IonRouterOutlet>
        

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={eyeSharp} />
            <IonLabel>Dash Board</IonLabel>
          </IonTabButton>

          <IonTabButton tab="radio" href="/radio">
            <IonIcon icon={add} />
            <IonLabel>Add Accounts</IonLabel>
          </IonTabButton>

          <IonTabButton tab="library" href="/library">
            <IonIcon icon={trash} />
            <IonLabel>Delete Accounts</IonLabel>
          </IonTabButton>

          <IonTabButton tab="search" href="/search">
            <IonIcon icon={time} />
            <IonLabel>Past Activities</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}
export default Root;