import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Route } from 'react-router-dom';

const FeatureToggledRoute = ({ flag, redirectRoute, ...props }) =>
  flag ? <Route {...props} /> : <Navigate to={redirectRoute} replace />;

FeatureToggledRoute.propTypes = {
  flag: PropTypes.bool.isRequired,
  redirectRoute: PropTypes.string.isRequired,
};

export default FeatureToggledRoute;
```
[1][3]  
*(Note: Replaced `Redirect` with `Navigate` for React Router v6 compatibility and removed unnecessary useMemo.)*
