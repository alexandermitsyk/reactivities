import React, { useState, useEffect, SyntheticEvent, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import NavigationBar from '../../feature/nav/NavigationBar';
import { IActivity } from '../models/activity';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';
import ActivityStore from '../stores/activityStore';

const App = () => {
    const activityStore = useContext(ActivityStore);
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [target, setTarget] = useState('');

    useEffect(() =>{
        agent.Activities.list()
        .then(response => {
            let activities: IActivity[] = [];
            response.forEach(activity =>{
                activity.date = activity.date.split('.')[0];
                activities.push(activity);
            });
            setActivities(activities);
        }).then(() => setLoading(false));
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
        setSubmitting(true);
        agent.Activities.create(activity).then(() =>{
            setActivities([...activities, activity]);
            setSelectedActivity(activity);
            setEditMode(false);
        }).then(() => setSubmitting(false));
    };

    const handleEdicActivity = (activity: IActivity) => {
        setSubmitting(true);
        agent.Activities.update(activity).then(() =>{
            setActivities([...activities.filter(a => a.id !== activity.id), activity]);
            setSelectedActivity(activity);
            setEditMode(false);
        }).then(() => setSubmitting(false));
    };

    const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setSubmitting(true);
        setTarget(event.currentTarget.name);
        agent.Activities.delete(id).then(() =>{
            setActivities([...activities.filter(a => a.id !== id)]);
        }).then(() => setSubmitting(false));
    }

    if(loading) return <LoadingComponent content='Loading activities...' />

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
                    submitting={submitting}
                    target={target}
                />
            </Container>
        </>
    );
}

export default App;
