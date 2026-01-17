const Notification = ({ notification }) => {
  if (!notification) return null;

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: '#f0f0f0',
    fontSize: '16px',
    border: `2px solid ${notification.type === 'error' ? 'red' : 'green'}`,
    padding: '10px',
    marginBottom: '10px',
  };

  return <div style={style}>{notification.message}</div>;
};

export default Notification;
