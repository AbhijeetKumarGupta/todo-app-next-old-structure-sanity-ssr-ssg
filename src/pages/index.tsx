import Image from "next/image";
import styles from "@/src/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/todo.webp"
          alt="Next.js logo"
          width={600}
          height={600}
          priority
        />

        <div className={styles.ctas}>
          <Link
            className={styles.primary}
            href={"/add-task"}
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Add Task
          </Link>
          <Link
            href="/task-list"
            className={styles.secondary}
          >
            View List
          </Link>
        </div>
      </main>
    </div>
  );
}
