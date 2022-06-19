import React, { useState } from 'react'
import PaginatorStyle from './Paginator.module.css'

type propsType = {
    totalUsersCount: number
    usersCount: number
    currentPageNumber: number
    onPageChange: (pageNum: number) => void
}
export const Paginator: React.FC<propsType> = ({ totalUsersCount, usersCount, currentPageNumber, onPageChange }) => {
    let pagesCount = Math.ceil(totalUsersCount / usersCount),
        pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionSize = 10,
        [portionNumber, setPortionNumber] = useState(1),
        portionCount = totalUsersCount / portionSize,
        leftPortionNumber = (portionNumber - 1) * portionSize + 1,
        rightPortionNumber = portionSize * portionNumber

    return (
        <div>
            {(portionNumber > 1) &&
                <button
                    onClick={() => {
                        setPortionNumber(portionNumber - 1)
                    }}>Prev</button>}

            {pages
                .filter(pageNum => leftPortionNumber <= pageNum && pageNum <= rightPortionNumber)
                .map(pageNum =>
                    <span
                        key={pageNum}
                        className={currentPageNumber === pageNum ?
                            PaginatorStyle.selectedPage :
                            PaginatorStyle.normalPage}
                        onClick={() => {
                            onPageChange(pageNum)
                        }}
                    >
                        {pageNum}
                    </span>)}

            {(portionNumber < portionCount) &&
                <button
                    onClick={() => {
                        setPortionNumber(portionNumber + 1)
                    }}>
                    Next
                </button>}
        </div>
    )
}
