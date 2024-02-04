import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';


const socialMediaActivitiesData = [
  { id: 1, accountType: 'Instagram', activity: 'Liked a post', date: '2024-02-01' },
  { id: 2, accountType: 'Facebook', activity: 'Posted a status', date: '2024-02-05' },
  { id: 3, accountType: 'Twitter', activity: 'Retweeted a tweet', date: '2024-02-10' },
  { id: 4, accountType: 'Instagram', activity: 'Commented on a photo', date: '2024-02-15' },

];

const SocialMediaActivitiesPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredActivities, setFilteredActivities] = useState(socialMediaActivitiesData);

  const handleSearchInput = (e: CustomEvent) => {
    const searchInput = e.detail.value || '';
    setSearchText(searchInput);
    filterActivities(searchInput);
  };

  const filterActivities = (searchInput: string) => {
    const filtered = socialMediaActivitiesData.filter((activity) =>
      activity.activity.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredActivities(filtered);
  };

  const handleClearSearch = () => {
    setSearchText('');
    setFilteredActivities(socialMediaActivitiesData);
  };

  const handleSortByDate = () => {
    const sortedActivities = [...filteredActivities].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setFilteredActivities(sortedActivities);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Social Media Activities</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          value={searchText}
          onIonChange={handleSearchInput}
          placeholder="Search activities"
        />
        <IonButton onClick={handleClearSearch}>Clear Search</IonButton>
        <IonButton onClick={handleSortByDate}>
          <IonIcon icon={calendarOutline} />
          Sort by Date
        </IonButton>
        <IonList>
          {filteredActivities.map((activity) => (
            <IonItem key={activity.id}>
              <IonLabel>{activity.accountType}</IonLabel>
              <IonLabel>{activity.activity}</IonLabel>
              <IonLabel slot="end">{activity.date}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );
};

export default SocialMediaActivitiesPage;
