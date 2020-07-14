import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import DashboardFastFeet from '../pages/DashboardFastFeet';

import Deliverys from '../pages/Deliverys';

import PackageForm from '../pages/PackageForm';
import DeliverysForm from '../pages/DeliverysForm';
import Recipients from '../pages/Recipients';
import RecipientForm from '../pages/RecipientForm';
import Problems from '../pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={DashboardFastFeet} isPrivate />

      <Route path="/package/form/:id?" component={PackageForm} isPrivate />

      <Route path="/recipients" component={Recipients} isPrivate />

      <Route
        path="/recipient/form/:id?"
        exact
        component={RecipientForm}
        isPrivate
      />

      <Route path="/problems" component={Problems} isPrivate />

      <Route path="/entregadores" exact component={Deliverys} isPrivate />
      <Route
        path="/entregadores/form/:id?"
        exact
        component={DeliverysForm}
        isPrivate
      />
    </Switch>
  );
}
