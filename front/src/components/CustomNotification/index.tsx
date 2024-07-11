import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const CustomNotification = ({ type, message, description }: { type: NotificationType, message: string, description: string }) => {
    return notification[type]({
        message: message,
        description: description,
    });
};

