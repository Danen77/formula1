import React from 'react'

const styles = {
  content: {
    fontSize: 35,
    position: 'absolute',
    left: 0,
    right: 0,
    marginTop: 20,
    textAlign: 'center'
  }
}

export default function NotFound () {
  return (
    <p style={styles.content}>
      404 Not Found
    </p>
  )
}