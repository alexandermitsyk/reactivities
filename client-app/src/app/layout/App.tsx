import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import NavigationBar from '../../feature/nav/NavigationBar';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import HomePage from '../../feature/home/HomePage';
import ActivityForm from '../../feature/activities/form/ActivityForm';
import ActivityDetails from '../../feature/activities/details/ActivityDetails';

const App: React.FC<RouteComponentProps> = ( { location } ) => {
    return (
        <>
            <Route exact path='/' component={HomePage} />
            <Route exact path={'/(.+)'} render={() => (
                <>
                    <NavigationBar />
                    <Container style={{ marginTop: 85 }}>
                        <Route exact path='/activities' component={ActivityDashboard} />
                        <Route path='/activity/:id' component={ActivityDetails} />
                        <Route key={location.key} path={['/create-activity', '/manage/:id']} component={ActivityForm} />
                    </Container>
                </>
            )} />
            
        </>
    );
}

export default withRouter(observer(App));
