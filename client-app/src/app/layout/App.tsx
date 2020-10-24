import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';

import NavigationBar from '../../feature/nav/NavigationBar';
import { IActivity } from '../models/activity';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';

const App = () => {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() =>{
        axios.get<IActivity[]>('http://localhost:5000/api/activities')
        .then(response => {
            let activities: IActivity[] = [];
            response.data.forEach(activity =>{
                activity.date = activity.date.split('.')[0];
                activities.push(activity);
            });
            setActivities(activities);
        });
    }, []);

    const handleSelectActiovity = (id: string) => {
        setEditMode(false);
        setSelectedActivity(activities.filter(a => a.id === id)[0]);
    };

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    };

    const handleCreateActivity = (activity: IActivity) => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
    };

    const handleEdicActivity = (activity: IActivity) =>{
        setActivities([...activities.filter(a => a.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
    };

    const handleDeleteActivity = (id: string) =>{
        setActivities([...activities.filter(a => a.id !== id)]);
    }

    return (
        <>
            <NavigationBar openCreateForm={handleOpenCreateForm}/>
            <Container style={{marginTop: 85}}>
                <ActivityDashboard 
                    activities={activities} 
                    selectActivity={handleSelectActiovity} 
                    selectedActivity={selectedActivity!}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    setSelectedActivity={setSelectedActivity}
                    editActivity={handleEdicActivity}
                    createActivity={handleCreateActivity}
                    deleteActivity={handleDeleteActivity}
                />
            </Container>
        </>
    );
}

export default App;
