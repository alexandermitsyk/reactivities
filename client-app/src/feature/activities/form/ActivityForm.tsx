import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';

interface DetailParams {
    id: string
};


const ActivityForm: React.FC<RouteComponentProps<DetailParams>>= ({ 
    match,
    history
 }) => {
    const activityStore = useContext(ActivityStore);
    const { 
        createActivity, 
        editActivity, 
        submitting, 
        activity: initialFormStete,
        loadActivity,
        clearActivity,
     } = activityStore;

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    });

    useEffect(() =>{
        if (match.params.id && activity.id.length === 0) {
           loadActivity(match.params.id).then(() => initialFormStete && setActivity(initialFormStete));
        }

        return () => {
           clearActivity();
        }
   }, [loadActivity, clearActivity, match.params.id, initialFormStete, activity.id.length]);

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;

        setActivity({
            ...activity,
            [name]: value
        });
    };

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid(),
            }
            createActivity(newActivity).then(() => history.push(`/activity/${newActivity.id}`));
        } else {
            editActivity(activity).then(() => history.push(`/activity/${activity.id}`));
        }
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input 
                    placeholder='Title' 
                    name='title' 
                    value={activity.title} 
                    onChange={handleInputChange} 
                />
                <Form.TextArea 
                    rows={2} 
                    placeholder='Description' 
                    name='description' 
                    value={activity.description} 
                    onChange={handleInputChange} 
                />
                <Form.Input 
                    placeholder='Category' 
                    value={activity.category} 
                    name='category' 
                    onChange={handleInputChange} 
                />
                <Form.Input 
                    type='datetime-local' 
                    placeholder='Date' 
                    value={activity.date} 
                    name='date'
                    onChange={handleInputChange} 
                 />
                <Form.Input 
                    placeholder='City' 
                    value={activity.city}
                    name='city' 
                    onChange={handleInputChange}
                />
                <Form.Input 
                    placeholder='Venue' 
                    value={activity.venue} 
                    name='venue' 
                    onChange={handleInputChange}
                />
                <Button
                    floated='right'
                    loading={submitting}
                    positive 
                    type='submit' 
                    content='Submit'
                 />
                <Button 
                    onClick={() => history.push('/activities')} 
                    floated='right' 
                    type='button' 
                    content='Cancel' 
                />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm);
