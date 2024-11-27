'use client';

import client from '@/sanity/sanityClient';
import { useRouter } from 'next/navigation';

import styles from "./task-details.module.css";
export default function DeleteButton({taskId}:{taskId: string | undefined}) {

    const router = useRouter();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?') && taskId) {
            try {
                await client.delete(taskId);
                alert('Task deleted successfully!');
                router.push('/task-list');
            } catch (error) {
                console.error('Error deleting task:', error);
                alert('Failed to delete task. Please try again.');
            }
        }
    };

    return (
        <button
            className={styles.deleteButton}
            onClick={handleDelete}
        >
            Delete
        </button>
    )
}