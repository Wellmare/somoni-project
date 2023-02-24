import { url } from '../constants/api';
import { apiEndpoints } from '../constants/apiEndpoints';
import { INotification } from '../types/redux/notifications/INotification';

export const connectToNotifications = (
    userId: string,
    onConnect: (event: Event) => void,
    onMessage: (notification: INotification) => void,
    onError: (event: Event) => void,
): EventSource => {
    const eventSource = new EventSource(`${url}/${apiEndpoints.connectToNotification}${userId}/`);

    eventSource.addEventListener('open', (event) => {
        console.log('SSE connection opened');
        onConnect(event);
    });

    eventSource.addEventListener('message', (event: MessageEvent) => {
        console.log('Received SSE notification:', event.data);
        // setNotifications((event.data as { num: string }).num);
        const data = JSON.parse(event.data) as INotification;
        onMessage(data);
    });

    eventSource.addEventListener('error', (event) => {
        console.error('SSE connection error:', event);
        onError(event);
    });

    return eventSource;
};
