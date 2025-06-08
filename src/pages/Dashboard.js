import React from 'react';

export default function Dashboard() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📊 Welcome to your Dashboard!</h1>
      <p style={styles.text}>This is where your amazing journey begins.</p>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '10vh',
    textAlign: 'center',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#4ade80',
  },
  text: {
    fontSize: '1.2rem',
    color: '#555',
  },
};
