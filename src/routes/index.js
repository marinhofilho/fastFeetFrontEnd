import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Orders from '~/pages/Orders';
import OrderNew from '~/pages/OrderNew';

import Deliverymen from '~/pages/Deliverymen';
import DeliverymenNew from '~/pages/DeliverymenNew';

export default function Routes() {
  return (
    <Switch>
      <Route path="/orders/new" exact component={OrderNew} isPrivate />
      <Route path="/orders" exact component={Orders} isPrivate />
      <Route path="/" exact component={SignIn} />
      {/* Need to use exact or the first route (just '/orders') will be the one called */}

      <Route
        path="/deliverymen/new"
        exact
        component={DeliverymenNew}
        isPrivate
      />
      <Route path="/deliverymen" exact component={Deliverymen} isPrivate />
    </Switch>
  );
}
