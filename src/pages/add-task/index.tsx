'use client';

import client from '@/sanity/sanityClient';
import { useState, FormEvent } from 'react';
import Link from 'next/link';

import styles from "./add-task.module.css";

export default function AddTask() {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<Status>('open');
    const [submitting, setSubmitting] = useState<boolean>(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true)

        const newTask: Task = {
            _type: 'task',
            name,
            description,
            status,
        };

        try {
            await client.create(newTask);
            setName('');
            setDescription('');
            setStatus('open');
            setSubmitting(false)
            alert('Task added successfully!');
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Failed to add task');
        }
    };

    return (
        <>
            <div className={styles.header}>
                <Link
                    href="/"
                    className={styles.backButton}
                >
                    ⬅
                </Link>
                <h1>Add Task Form</h1>
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

                    <button type="submit" className={styles.addButton} disabled={submitting}>{submitting ? '...Submitting' : 'Submit'}</button>
                </form>
            </div>
        </>
    );
}
