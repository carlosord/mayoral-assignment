
import React, { useState } from 'react';

interface Props {
    sortOptions: { label: string, value: string }[],
    sortFunctions: { [key: string]: (a: any, b: any) => number }
    onSelectSorter: (sorter: (a: any, b: any) => number) => void
}

const Sorter: React.FC<Props> = ({sortOptions, sortFunctions, onSelectSorter}) => {

    const [sortBy, setSortBy] = useState('-')

    const onSort = (event: any) => {
        const value = event.target.value
        setSortBy(value)
        onSelectSorter(sortFunctions[value])
    }

    return (
        <select value={sortBy} onChange={onSort}>
            <option value="-">-</option>
            { sortOptions.map(option => <option key={`sort_opt_${option.value}`} value={option.value}>{option.label}</option>)}
        </select>
    )

}

export default Sorter;