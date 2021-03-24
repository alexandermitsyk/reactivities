import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import NavigationBar from '../../feature/nav/NavigationBar';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import HomePage from '../../feature/home/HomePage';
import ActivityForm from '../../feature/activities/form/ActivityForm';
import ActivityDetails from '../../feature/activities/details/ActivityDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
import LoginForm from '../../feature/activities/user/LoginForm';
import { RootStoreContext } from '../stores/rootStore';
import { LoadingComponent } from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../feature/profiles/ProfilePage';

const App: React.FC<RouteComponentProps> = ({ location }) => {
    const rootStore = useContext(RootStoreContext);
    const { appLoaded, setAppLoaded, token } = rootStore.commonStore;
    const { getUser } = rootStore.userStore;

    useEffect(() => {
        if (token) {
            getUser().finally(() => setAppLoaded());
        } else {
            setAppLoaded();
        }
    }, [getUser, setAppLoaded, token]);

    if (!appLoaded) return <LoadingComponent content='Loading app...' />

    return (
        <>
            <ModalContainer />
            <ToastContainer position='bottom-right' />
            <Route exact path='/' component={HomePage} />
            <Route exact path={'/(.+)'} render={() => (
                <>
                    <NavigationBar />
                    <Container style={{ marginTop: 85 }}>
                        <Switch>
                            <Route exact path='/activities' component={ActivityDashboard} />
                            <Route path='/activity/:id' component={ActivityDetails} />
                            <Route key={location.key} path={['/create-activity', '/manage/:id']} component={ActivityForm} />
                            <Route path='/login' component={LoginForm} />
                            <Route path='/profile/:userName' component={ProfilePage} />
                            <Route component={NotFound} />
                        </Switch>
                    </Container>
                </>
            )} />
        </>
    );
}

export default withRouter(observer(App));
