'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import client from '@/sanity/sanityClient';
import Link from 'next/link';

import styles from './edit.module.css';

const EditTask = () => {
    const router = useRouter();
    const { taskId } = router.query;
    const [task, setTask] = useState<Task | null>(null);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<Status>('open');
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (taskId) {
            setLoading(true)
            const fetchTask = async () => {
                try {
                    const query = `*[_type == "task" && _id == $taskId][0]`;
                    const taskData = await client.fetch(query, { taskId });
                    if (taskData) {
                        setTask(taskData);
                        setName(taskData.name);
                        setDescription(taskData.description);
                        setStatus(taskData.status);
                    }
                } catch (error) {
                    console.error('Error fetching task:', error);
                }
            };
            fetchTask().then(() => setLoading(false));
        }
    }, [taskId]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!task) return;

        setSubmitting(true);

        const updatedTask: Task = {
            _id: task._id,
            _type: 'task',
            name,
            description,
            status,
        };

        try {
            if (updatedTask._id) {
                await client.patch(updatedTask._id)
                    .set(updatedTask)
                    .commit();
                setSubmitting(false);
                alert('Task updated successfully!');
                router.push(`/task-list/${task._id}`);
            }
        } catch (error) {
            console.error('Error updating task:', error);
            setSubmitting(false);
            alert('Failed to update task');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className={styles.header}>
                <Link href={`/task-list/${taskId}`} className={styles.backButton}>⬅</Link>
                <h1>Edit Task Form</h1>
            </div>
            <div className={styles.wrapper}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="name">Task Name:</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Status:</label>
                        <div className={styles.options}>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="open"
                                    checked={status === 'open'}
                                    onChange={() => setStatus('open')}
                                />
                                Open
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="inprogress"
                                    checked={status === 'inprogress'}
                                    onChange={() => setStatus('inprogress')}
                                />
                                In Progress
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="completed"
                                    checked={status === 'completed'}
                                    onChange={() => setStatus('completed')}
                                />
                                Completed
                            </label>
                        </div>
                    </div>

                    <button type="submit" className={styles.editButton} disabled={submitting}>
                        {submitting ? '...Submitting' : 'Submit'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default EditTask;