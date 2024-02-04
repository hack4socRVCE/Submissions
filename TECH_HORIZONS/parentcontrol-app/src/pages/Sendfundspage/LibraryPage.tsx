import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonToast,
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

const RemoveAccountsPage: React.FC = () => {
  const [monitoredAccounts, setMonitoredAccounts] = useState([
    { id: 1, accountType: 'Instagram', accountName: 'example_instagram' },
    // Add more accounts as needed
  ]);

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleRemoveAccount = (accountId: number) => {
    // Remove the account with the specified id
    const updatedAccounts = monitoredAccounts.filter((account) => account.id !== accountId);
    setMonitoredAccounts(updatedAccounts);
    setShowSuccessToast(true);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Remove Monitored Accounts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {/* List of monitored accounts */}
          {monitoredAccounts.map((account) => (
            <IonItem key={account.id}>
              <IonLabel style={{ fontSize: '16.5px', fontWeight: 'bold', color: '#262626' }}>
                Account Type: {account.accountType}
              </IonLabel>
              <IonLabel style={{ fontSize: '15px', fontWeight: 'bold', color: '#262626' }}>
                Account Name: {account.accountName}
              </IonLabel>
              <IonButton slot="end" color="danger" onClick={() => handleRemoveAccount(account.id)}>
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        {/* Toasts for feedback messages */}
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message="Account removed successfully!"
          duration={2000}
          color="success"
        />
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message="Failed to remove account. Please try again."
          duration={2000}
          color="danger"
        />
      </IonContent>
    </>
  );
};

export default RemoveAccountsPage;
