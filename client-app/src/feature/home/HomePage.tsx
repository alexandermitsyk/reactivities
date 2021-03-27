import React, { useContext } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../activities/user/LoginForm';
import RegisterForm from '../activities/user/RegisterForm';

const HomePage = () => {
    const rootStore = useContext(RootStoreContext);
    const { isLoggedIn, user } = rootStore.userStore;
    const { openModal } = rootStore.modalStore;
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text className="login-container">
                <Header as='h1' inverted>
                    <Image
                        size='massive'
                        src='/assets/logo-audit.svg'
                        alt='logo'
                        style={{ marginBottom: 12 }}
                    />
                        Reactivities
                </Header>
                {
                    isLoggedIn && user ? (
                        <>
                            <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
                            <Button as={Link} to='/activities' size='huge' color="green">
                                Go to activities!
                                </Button>
                        </>
                    ) : (
                        <>
                            <Header as='h2' inverted content='Welcome to Reactivities' />
                            <div>
                                <Button onClick={() => openModal(<LoginForm />)} size='medium' color="green">
                                    Login
                                </Button>
                                <Button onClick={() => openModal(<RegisterForm />)} size='medium' color="green">
                                    Register
                                </Button>
                            </div>
                        </>
                    )
                }
            </Container>
        </Segment>
    );
};

export default HomePage;
