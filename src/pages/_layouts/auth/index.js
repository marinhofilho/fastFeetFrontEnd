import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';

function authLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default authLayout;

authLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
