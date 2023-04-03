import { PostContext } from 'app/context';
import classNames from 'classnames';
import React, { FC, useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import { preparePathToNavigate } from 'shared/lib/path';
import { Button, ButtonColors } from 'shared/ui/Button';

interface IPostContentProps {
    limitContentView: boolean;
}

export const PostContent: FC<IPostContentProps> = ({ limitContentView }) => {
    const { post } = useContext(PostContext);
    if (post === null) return null;
    const { content, postId } = post;

    const editorRef: { current: HTMLDivElement | null } = { current: null };
    const [isHide, setIsHide] = useState(false);
    // console.log(content.split('<br>'));

    useEffect(() => {
        if (limitContentView) {
            if (editorRef.current !== null) {
                const remToPx = (rem: number): number => {
                    return parseFloat(window.getComputedStyle(document.documentElement).fontSize) * rem;
                };
                if (editorRef.current.clientHeight > remToPx(20)) {
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
                    <Link to={preparePathToNavigate.post(postId)}>
                        <Button color={ButtonColors.gray} className={'px-3 py-2 mb-3'}>
                            Читать далее
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};
