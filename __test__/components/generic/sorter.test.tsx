
import '@testing-library/jest-dom'
import * as React from 'react';
import Sorter from '../../../src/components/generic/sorter';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Generic sorter component', () => {

    const sortOptions = [
        { value: 'name', label: 'By Name' }
    ]

    const sortFunctions = {
        name: (a: string, b: string) => a.localeCompare(b)
    }

    it('Renders Sorter with default option', () => {
        render(<Sorter sortOptions={sortOptions} sortFunctions={sortFunctions} onSelectSorter={() => null}></Sorter>)
        const sorterElement = screen.getByRole('combobox');
        expect(sorterElement).toBeInTheDocument();
        expect(screen.getByDisplayValue('-')).toBeInTheDocument();
    });

    it('Modify value when select an option', () => {
        render(<Sorter sortOptions={sortOptions} sortFunctions={sortFunctions} onSelectSorter={() => null}></Sorter>)
        const sorterElement = screen.getByRole('combobox');
        fireEvent.change(sorterElement, { target: { value: 'name' } });
        expect(screen.getByDisplayValue('By Name')).toBeInTheDocument();
    });

});