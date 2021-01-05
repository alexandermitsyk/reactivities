import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext } from 'react';
import { Item, Label, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ActivityListItem from './ActivityListItem';
import { format } from 'date-fns';

const ActivityList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { activitiesByDate } = rootStore.activityStore;

    return (
        <>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Label size='large' color='blue'>
                        {format(group, 'eeee do MMMM')}
                    </Label>
                    <Segment clearing>
                        <Item.Group divided>
                            {
                                activities.map((activity) => (
                                    <ActivityListItem key={activity.id} activity={activity} />
                                ))
                            }
                        </Item.Group>
                    </Segment>
                </Fragment>
            ))}
        </>
    )
}

export default observer(ActivityList);