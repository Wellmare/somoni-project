import { PostContext } from 'app/context';
import classNames from 'classnames';
import React, { FC, useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { Button, ButtonColors } from 'shared/ui/Button';

interface IPostContentProps {
    limitContentView: boolean;
}

export const PostContent: FC<IPostContentProps> = ({ limitContentView }) => {
    const { post } = useContext(PostContext);
    if (post === null) return null;
    const { content } = post;

    const editorRef: { current: HTMLDivElement | null } = { current: null };
    const [isHide, setIsHide] = useState(false);
    // console.log(content.split('<br>'));

    useEffect(() => {
        if (limitContentView) {
            if (editorRef.current !== null) {
                if (editorRef.current.clientHeight > 500) {
                    setIsHide(true);
                }
            }
        }
    }, []);

    return (
        <div ref={(el) => (editorRef.current = el)}>
            <ReactQuill
                value={content}
                readOnly={true}
                theme={'bubble'}
                className={classNames('editor-no-styles', 'editor-post-content', isHide ? 'editor-limited' : '')}
            />
            {isHide && (
                <div className={'flex justify-start'}>
                    <Button color={ButtonColors.gray} className={'px-3 py-2 mb-3'}>
                        Читать далее
                    </Button>
                </div>
            )}
        </div>
    );
};
