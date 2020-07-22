import { openDatabase } from "expo-sqlite";
const db = openDatabase("db");

const addDataToDb = (state) => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS global(id INTEGER PRIMARY KEY AUTOINCREMENT, globalState VARCHAR(255));",
      []
    );
    //console.log("created");
    tx.executeSql("insert into global(globalState) values (?)", [state]);

    //console.log("added");
  });
};

const addDataToDbTickets = (state) => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS tickets(id INTEGER PRIMARY KEY AUTOINCREMENT, ticketState VARCHAR(255));",
      []
    );
    console.log("created");
    tx.executeSql("insert into tickets(ticketState) values (?)", [state]);

    console.log("added");
  });
};

const getData = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("select * from global", [], (tx, res) => {
        let query = res.rows.item(res.rows.length - 1);
        if (query) {
          let jsonValue = query.globalState;
          resolve(JSON.parse(jsonValue));
        }
      });
    });
  });
};

const getTicket = () => {
  console.log("Called - GEt");
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("select * from tickets", [], (tx, res) => {
        let query = res.rows.item(res.rows.length - 1);
        if (query) {
          let jsonValue = query.ticketState;
          resolve(JSON.parse(jsonValue));
        }
      });
    });
  });
};

const storeData = (value) => {
  try {
    //console.log("in store");
    const jsonValue = JSON.stringify(value);
    //console.log("called");
    addDataToDb(jsonValue);
  } catch (e) {
    console.log(e);
    alert("File permissions not set - Write Error");
  }
};
const storeTicket = (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    console.log("called- Store");
    addDataToDbTickets(jsonValue);
  } catch (e) {
    console.log(e);
    alert("File permissions not set - Write Error");
  }
};

const removeItemValue = () => {
  try {
    var jsonValue = {
      isLoggedin: false,
    };
    storeData(JSON.stringify(jsonValue));
  } catch (exception) {
    return false;
  }
};

exports.storeData = storeData;
exports.getData = getData;
exports.deleteData = removeItemValue;
exports.storeTicket = storeTicket;
exports.getTicket = getTicket;
