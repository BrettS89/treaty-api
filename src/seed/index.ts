import mongoose from 'mongoose';
import app from '../app';

(async () => {
  // Create roles
  try {
    const collections = mongoose.connection.collections;
    console.log(collections);
    const [brokerRole, reinsurerRole, brokerAdminRole, reinsurerAdminRole, superadminRole] =
      await Promise.all([
        app.service('security/role').create({ name: 'broker' }, { internal: true }),
        app.service('security/role').create({ name: 'reinsurer' }, { internal: true }),
        app.service('security/role').create({ name: 'broker-admin' }, { internal: true }),
        app.service('security/role').create({ name: 'reinsurer-admin' }, { internal: true }),
        app.service('security/role').create({ name: 'superadmin' }, { internal: true }),
      ]);

    // Create accounts
    const [brokerAccount, reinsurerAccount, superadminAccount] =
      await Promise.all([
        app.service('security/account').create({ name: 'Beach & Associates' }, { internal: true }),
        app.service('security/account').create({ name: 'Everest' }, { internal: true }),
        app.service('security/account').create({ name: 'Superadmin' }, { internal: true })
      ]);

    // Create users
    const [brokerUser, reinsurerUser] =
      await Promise.all([
        app.service('security/user').create({
          email: 'brett@broker.com',
          password: 'secret',
          account_id: brokerAccount._id,
          role_id: brokerRole._id,
        }),
        app.service('security/user').create({
          email: 'brett@reinsurer.com',
          password: 'secret',
          account_id: reinsurerAccount._id,
          role_id: reinsurerRole._id,
        }),
        app.service('security/user').create({
          email: 'brett@superadmin.com',
          password: 'secret',
          account_id: superadminAccount._id,
          role_id: superadminRole._id,
        })
      ]);
  } catch(e) {
    console.log(e);
  }
})();
