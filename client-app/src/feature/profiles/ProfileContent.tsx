import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfileFollowings from './ProfileFollowings';
import ProfilePhotos from './ProfilePhotos';

const panes = [
    { menuItem: 'About', render: () => <Tab.Pane>About content</Tab.Pane> },
    { menuItem: 'Photos', render: () => <ProfilePhotos /> },
    { menuItem: 'Activities', render: () => <Tab.Pane>Activities content</Tab.Pane> },
    { menuItem: 'Followers', render: () => <Tab.Pane><ProfileFollowings /></Tab.Pane> },
    { menuItem: 'Following', render: () => <Tab.Pane><ProfileFollowings /></Tab.Pane> }
];

interface IProps {
    setActiveTab: (activeIndex: any) => void;
}

const ProfileContent: React.FC<IProps> = ({ setActiveTab }) => {
    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition="right"
            panes={panes}
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
        />
    )
}

export default ProfileContent;
