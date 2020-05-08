import { store } from 'react-notifications-component';

export default function notification (type, title, message) {
    return store.addNotification({
        title,
        message,
        type,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 3000,
        }
    })
}
