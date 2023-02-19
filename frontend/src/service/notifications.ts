import { INotification } from '../types/redux/notifications/INotification';

export const connectToNotifications = (
    onConnect: (event: Event) => void,
    onMessage: (notification: INotification) => void,
    onError: (event: Event) => void,
): EventSource => {
    const eventSource = new EventSource('http://localhost:3001/sse');

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