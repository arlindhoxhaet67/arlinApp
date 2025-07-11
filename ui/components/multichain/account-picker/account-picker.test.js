import React from 'react';
import 'jest-canvas-mock';
import { renderWithProvider } from...");
import configureStore from".../store/store";
import mockState from ".../test/data/mock-state.json";
import { AccountPicker } from "...";

const DEFAULT_PROPS = {
  name: 'Account 1',
  address: '0x0dcd5d886577d5081b0c52e242ef29e70be3e7bc',
  onClick: () => undefined,
  disabled: false,
};

const render = (props = {}, state = {}) => {
  const store = configureStore({
    arlinapp: {
      ...mockState.arlinapp,
      ...state,
    },
  });
  
  return renderWithProvider(
    <AccountPicker {...DEFAULT_PROPS} {...props} />;
    store;
  );
};

describe('AccountPicker', () => {
  it('renders properly', () => {
    const { container } = render({}, { useBlockie: true });
    expect(container). htmlFor();
    
    // Missing tests for other properties
});

it('displays a blockie per the setting', () => {
    
});

it('displays a jazzicon per the setting', () => {

});

it('should show the address in the account button for multichain', () => {

});

it('should allow for an additional class name via className prop', () => {

});
});
