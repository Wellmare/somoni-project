import React, { FC } from 'react';
import sanitize, { IOptions } from 'sanitize-html';

interface ISanitizeHtmlProps {
    options?: IOptions;
    html: string;
}

export const SanitizeHtml: FC<ISanitizeHtmlProps> = ({ html, options }) => {
    const defaultOptions: IOptions = {
        allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p'],
        allowedAttributes: {
            'a': ['href'],
        },
    };

    const sanitized = sanitize(html, { ...defaultOptions, ...options });

    return <div dangerouslySetInnerHTML={{ __html: sanitized }}></div>;
};
