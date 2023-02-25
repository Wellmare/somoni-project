import { doAsyncFunc } from './doAsyncFunc';

export const sendNotification = (notification: string, onClick?: (event: Event) => void): void => {
    if (!('Notification' in window)) {
        // Браузер не поддерживает уведомления.
        console.error('Браузер не поддерживает уведомления');
    }
    console.log('try send notification');
    doAsyncFunc(async function requestPermission(): Promise<void> {
        return await new Promise(function (resolve, reject) {
            const permissionResult = Notification.requestPermission(function (result) {
                // Поддержка устаревшей версии с функцией обратного вызова.
                resolve(result);
            });

            // eslint-disable-next-line @typescript-eslint/no-misused-promises,@typescript-eslint/strict-boolean-expressions
            if (permissionResult) {
                permissionResult.then(resolve, reject);
            }
        }).then(function (permissionResult) {
            if (permissionResult !== 'granted') {
                throw new Error('Permission not granted.');
            }
            console.log('send notification');
            // eslint-disable-next-line no-new
            const notif = new Notification('Новое уведомление!', {
                body: notification,
                icon: 'icon.png',
            });
            notif.onclick = onClick === undefined ? null : onClick;
        });
    });
};
