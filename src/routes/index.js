import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Orders from '~/pages/Orders';
import OrderNew from '~/pages/OrderNew';

import Deliverymens from '~/pages/Deliverymens';
import DeliverymenNew from '~/pages/DeliverymenNew';

import Recipients from '~/pages/Recipients';
import RecipientNew from '~/pages/RecipientNew';

import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/orders/new" exact component={OrderNew} isPrivate />
      <Route path="/orders/edit/:id" exact component={OrderNew} isPrivate />
      <Route path="/orders" exact component={Orders} isPrivate />
      <Route path="/" exact component={SignIn} />
      {/* Need to use exact or the first route (just '/orders') will be the one called */}

      {/* couldn't send form in route below */}
      <Route
        path="/deliverymen/new"
        exact
        component={DeliverymenNew}
        isPrivate
      />
      <Route path="/deliverymen" exact component={Deliverymens} isPrivate />

      <Route path="/recipient/new" exact component={RecipientNew} isPrivate />
      <Route path="/recipient" exact component={Recipients} isPrivate />

      <Route path="/problems" exact component={Problems} isPrivate />
    </Switch>
  );
}
