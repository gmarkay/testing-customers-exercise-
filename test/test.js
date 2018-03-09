
const { createTables } = require('../js/makeTable');
const { getCustomers, getCustomer, addCustomer } = require('../js/customersModule')
const { assert: { equal, isFunction, isObject, isArray, lengthOf, oneOf } } = require('chai');

beforeEach((done) => {
  createTables()
    .then(() => {
      done();
    })
})

describe('customers module', () => {
  describe('fetching customer data', () => {
    it('should be a function', () => {
      isFunction(getCustomers);
    });
    it('should return an array of objects', () => {
      return getCustomers()
        .then((custArray) => {
          let i = Math.floor(Math.random() * custArray.length - 1) + 1;
          isArray(custArray);
          isObject(custArray[i]);
        });
    });
    it('should return all customers in db', () => {
      return getCustomers()
        .then((custArray) => {
          lengthOf(custArray, 8)
        });
    });
  });


  describe('fetching one customer', () => {
    let id = Math.floor(Math.random() * 8) + 1;
    it('customer should be an object', () => {
      return (getCustomer(id))
        .then((data) => {
          isObject(data);
        });
    });
    it('should be a customer', () => {
      return (getCustomer(id))
        .then((customer) => {
          equal(id, customer.customer_id);
        });
    });
  });


  describe('adding a customer', () => {
    let newCust = {
      firstName: 'Mike',
      lastName: 'Jones',
      city: 'somewhere',
      street: 'fake street',
      state: 'Tenessee',
      zip: '12345',
      phone: '111-111-1111'
    };
    it('should return an object', () => {
      return addCustomer(newCust)
        .then((data) => {
          isObject(data);
        });
    });

    it('should add a new item to db', () => {
      return addCustomer(newCust)
        .then((obj) => {
          equal(9, obj.id);
        })
    });
  });


});
