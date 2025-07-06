import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithProvider } from '../../../../test/jest';
import ActionableMessage from '.';

const createProps = (customProps = {}) => ({
  message: 'I am an actionable message!',
  ...customProps,
});

describe('ActionableMessage', () => {
  it('renders the component with initial props', () => {
    const props = createProps();
    const { container, getByText } = renderWithProvider(<ActionableMessage {...props} />);
    expect(getByText(props.message)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders button for primaryActionV2 prop', () => {
    const props = createProps({ primaryActionV2: { label: 'primary-action-v2' } });
    const { getByRole } = renderWithProvider(<ActionableMessage {...props} />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('calls primaryActionV2.onClick when button is clicked', () => {
    const onClick = jest.fn();
    const props = createProps({ primaryActionV2: { label: 'primary-action-v2', onClick } });
    const { getByRole } = renderWithProvider(<ActionableMessage {...props} />);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
