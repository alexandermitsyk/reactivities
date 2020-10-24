import React, { FormEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) =>void;
}

export const ActivityForm: React.FC<IProps> = ({ 
    setEditMode, 
    activity: initialFormStete,
    createActivity,
    editActivity
}) => {
    const initializeForm = () => {
        if (initialFormStete) {
            return initialFormStete;
        } else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: '',
            }
        }
    };

    const [activity, setActivity] = useState<IActivity>(initializeForm);

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
            createActivity(newActivity);
        } else {
            editActivity(activity);
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
                    positive 
                    type='submit' 
                    content='Submit'
                 />
                <Button 
                    onClick={() => setEditMode(false)} 
                    floated='right' 
                    type='button' 
                    content='Cancel' 
                />
            </Form>
        </Segment>
    )
}
