import React from 'react'
import styles from './Page.module.css'

export default function Page({sidebar, main}) {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                {sidebar}
            </div>
            <div className={styles.main}>
                {main}
            </div>
        </div>
    )
}
