import classNames from 'classnames';
import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';

import s from './Pagination.module.scss';

interface IPaginationProps {
    currentPage: number;
    countPages: number;
    handlePageChange: (page: { selected: number }) => void;
}

const Pagination: FC<IPaginationProps> = ({ currentPage, handlePageChange, countPages }) => {
    return (
        <ReactPaginate
            pageCount={countPages}
            onPageChange={handlePageChange}
            // pageRangeDisplayed={3}
            // marginPagesDisplayed={2}
            previousLabel={'<'}
            nextLabel={'>'}
            //
            pageClassName={classNames(s.pageItem, 'p-5', 'sm:px-5', 'md:px-6', 'lg:px-7')}
            pageLinkClassName={s.pageLink}
            previousClassName={classNames(s.pageItem, s.buttons, 'p-5', 'sm:p-5', 'md:p-6', 'lg:p-7')}
            previousLinkClassName={s.pageLink}
            nextClassName={classNames(s.pageItem, s.buttons, 'p-5', 'sm:p-5', 'md:p-6', 'lg:p-7')}
            nextLinkClassName={s.pageLink}
            //
            breakLabel='...'
            breakClassName={s.pageItem}
            breakLinkClassName={s.pageLink}
            //
            containerClassName={s.pagination}
            //
            activeClassName={s.active}
            renderOnZeroPageCount={undefined}
            forcePage={currentPage}
        />
    );
};

export default Pagination;
