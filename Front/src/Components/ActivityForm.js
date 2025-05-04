import React, { useState } from 'react';
import { FitnessService } from '../Services/FitnessService';

const ActivityForm = ({ onSubmit, activity = null }) => {
    const [name, setName] = useState(activity ? activity.name : '');
    const [description, setDescription] = useState(activity ? activity.description : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const activityData = { name, description };

        if (activity) {
            await FitnessService.updateActivity(activity._id, activityData);
        } else {
            await FitnessService.createActivity(activityData);
        }

        onSubmit();
        setName('');
        setDescription('');
    };

    return (
        <div>
            <h2>{activity ? 'Edit Activity' : 'Add Activity'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{activity ? 'Update' : 'Add'}</button>
            </form>
        </div>
    );
};

export default ActivityForm;
