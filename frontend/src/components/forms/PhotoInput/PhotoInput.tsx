import classNames from 'classnames';
import React, { FC } from 'react';

import s from './PhotoInput.module.scss';

interface IPhotoInputProps {
    // id: string;
    // error: FieldError | undefined;
    // register: () => UseFormRegisterReturn;
    image: string | null;
    openFilePicker: () => void;
}

const PhotoInput: FC<IPhotoInputProps> = ({ openFilePicker, image }) => {
    // const [isError, setIsError] = useState<boolean>(false);
    // useEffect(() => {
    //     setIsError(error?.message !== undefined);
    // }, [error]);

    return (
        <div className={classNames('mb-3')}>
            <div className={s.avatar} onClick={() => openFilePicker()}>
                {image !== null && <img src={image} alt='' className={s.img} />}
            </div>
            {/* <input */}
            {/*     type='file' */}
            {/*     accept={'image/*'} */}
            {/*     id={id} */}
            {/*     {...register()} */}
            {/*     {...props} */}
            {/*     className={classNames('py-1', 'px-3', 'mt-1', 'rounded-md', s.hide)} */}
            {/* /> */}
            {/* {isError && <p className={classNames(s.error)}>{error?.message}</p>} */}
        </div>
    );
};
export default PhotoInput;
