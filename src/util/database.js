import * as SQlite from "expo-sqlite";
import { Place } from "../../models/places";

const database = SQlite.openDatabase("places.db");

export function initDatabase() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        // `DROP TABLE places`,
        `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title text NOT NULL,
                imageUrl text NOT NULL,
                address text NOT NULL,
                location text NOT NULL
            )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function insertPlace(place) {
  place.location = JSON.stringify(place.location);
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title,imageUrl,address,location) VALUES (?,?,?,?)`,
        [
            place.title,
            place.imageUrl,
            place.address,
            place.location,
        ],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}


export function fetchPlaces() {
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          `SELECT * from places`,
          [],
          (_, result) => {
            console.log(result);
            const places=[];
            for (const dp of result.rows._array) {
              places.push(new Place(
                dp.title,dp.imageUrl,
                dp.address,
                dp.location,
                dp.id
              ))
            }
            resolve(places);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
    return promise;
  }