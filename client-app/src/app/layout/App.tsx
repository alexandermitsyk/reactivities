import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import NavigationBar from '../../feature/nav/NavigationBar';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import { LoadingComponent } from './LoadingComponent';
import ActivityStore from '../stores/activityStore';

const App = () => {
    const activityStore = useContext(ActivityStore);

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

    return (
        <>
            <NavigationBar />
            <Container style={{ marginTop: 85 }}>
                <ActivityDashboard />
            </Container>
        </>
    );
}

export default observer(App);
