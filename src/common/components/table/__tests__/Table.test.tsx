import { axe } from 'jest-axe';
import React from 'react';

import {
  configure,
  render,
  screen,
  userEvent,
} from '../../../../utils/testUtils';
import Table from '../Table';

configure({ defaultHidden: true });

describe('<Table /> spec', () => {
  let cols;
  let rows;
  let caption;
  let indexKey;
  let renderIndexCol;

  beforeEach(() => {
    cols = [
      { key: 'id', headerName: 'Not rendered' },
      { key: 'firstName', headerName: 'First name' },
      { key: 'surname', headerName: 'Surname' },
      {
        key: 'age',
        headerName: 'Age',
        transform: ({ age }) => {
          return <div style={{ textAlign: 'right' }}>{age}</div>;
        },
      },
      { key: 'profession', headerName: 'Profession' },
    ];
    indexKey = 'id';
    renderIndexCol = false;

    rows = [
      {
        id: 1000,
        firstName: 'Lauri',
        surname: 'Kekkonen',
        age: 39,
        profession: 'Engineer',
      },
      {
        id: 1001,
        firstName: 'Maria',
        surname: 'Sarasoja',
        age: 62,
        profession: 'Designer',
      },
      {
        id: 1002,
        firstName: 'Anneli',
        surname: 'Routa',
        age: 50,
        profession: 'Meteorologist',
      },
      {
        id: 1003,
        firstName: 'Osku',
        surname: 'Rausku',
        age: 18,
        profession: 'Mail Carrier',
      },
      {
        id: 1004,
        firstName: 'Linda',
        surname: 'Koululainen',
        age: 8,
        profession: 'School student',
      },
    ];

    caption = (
      <span>
        <b>Table 1</b>: Table description
      </span>
    );
  });

  it('renders the component', () => {
    const { asFragment } = render(
      <Table
        caption={caption}
        cols={cols}
        rows={rows}
        indexKey={indexKey}
        renderIndexCol={renderIndexCol}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render index column', () => {
    render(
      <Table
        caption={caption}
        cols={cols}
        rows={rows}
        indexKey={indexKey}
        renderIndexCol
      />
    );
    expect(screen.getByText('Not rendered')).toBeInTheDocument();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <Table
        caption={caption}
        cols={cols}
        rows={rows}
        indexKey={indexKey}
        renderIndexCol={renderIndexCol}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Should successfully sort the table', async () => {
    const colsWithSorting = [
      { key: 'id', headerName: 'Not rendered' },
      { key: 'firstName', headerName: 'First name', isSortable: true },
      { key: 'surname', headerName: 'Surname', isSortable: true },
      {
        key: 'age',
        headerName: 'Age',
        transform: ({ age }) => {
          return <div style={{ textAlign: 'right' }}>{age}</div>;
        },
        isSortable: true,
      },
      { key: 'profession', headerName: 'Profession', isSortable: true },
    ];

    const { container } = render(
      <Table
        caption={caption}
        cols={colsWithSorting}
        rows={rows}
        indexKey={indexKey}
        renderIndexCol={renderIndexCol}
      />
    );
    const ageOfFirstRow = container.querySelector(
      '[data-testid="age-0"] > div'
    );
    expect(ageOfFirstRow).toHaveTextContent('39');
    await userEvent.click(screen.getByTestId('hds-table-sorting-header-age'));
    const ageOfSortedTableFirstRow = container.querySelector(
      '[data-testid="age-0"] > div'
    );
    expect(ageOfSortedTableFirstRow).toHaveTextContent('8');
  });

  it('Should successfully call onSort when sort button is pressed', async () => {
    const colsWithSorting = [
      { key: 'id', headerName: 'Not rendered' },
      { key: 'firstName', headerName: 'First name', isSortable: true },
      { key: 'surname', headerName: 'Surname', isSortable: true },
      {
        key: 'age',
        headerName: 'Age',
        transform: ({ age }) => {
          return <div style={{ textAlign: 'right' }}>{age}</div>;
        },
        isSortable: true,
      },
      { key: 'profession', headerName: 'Profession', isSortable: true },
    ];

    const mockOnSort = jest.fn();

    render(
      <Table
        caption={caption}
        cols={colsWithSorting}
        rows={rows}
        indexKey={indexKey}
        onSort={mockOnSort}
        renderIndexCol={renderIndexCol}
      />
    );

    await userEvent.click(screen.getByTestId('hds-table-sorting-header-age'));

    expect(mockOnSort).toHaveBeenCalledTimes(1);
  });
});
