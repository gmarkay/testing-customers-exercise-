'use strict'
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('acme.sqlite')


module.exports.getCustomers = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM customers", function (err, rows) {
      resolve(rows);
    });
  });
};

// let sql = `SELECT PlaylistId id,
//                   Name name
//            FROM playlists
//            WHERE PlaylistId  = ?`;
// let playlistId = 1;


module.exports.getCustomer = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * 
            FROM customers
            WHERE customer_id=${id}`, function (err, row) {
        resolve(row);
      })
  })
};

module.exports.addCustomer = ({ firstName, lastName, city, street, state, zip, phone }) => {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO customers VALUES(
      null,
      "${firstName}",
      "${lastName}",
      "${city}",
      "${street}",
      "${state}",
      "${zip}",
      "${phone}"
    )`, function () {
        resolve({ id: this.lastID });
      });
  });
}
