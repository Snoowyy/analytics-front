import { Injectable } from '@angular/core';
import { AngularIndexedDB, KeyTypeIDb, IndexDetails } from 'src/app/shared/angular.indexed-db';

const DB_NAME = 'DnsData';
const DB_VERSION = 1;
const TABLE_NAME = '$cache';

@Injectable()
export class CvnCacheService {
  private db: AngularIndexedDB;
  isOpen = false;

  constructor() {
    this.db = new AngularIndexedDB(DB_NAME, DB_VERSION);
  }

  async openDatabase() {
    if (!this.isOpen) {
      await this.db.openDatabase(DB_VERSION, TABLE_NAME, (ev, db) => {
        db.createObjectStore(TABLE_NAME);
      });
      this.isOpen = true;
    }
  }

  async getByKey<T>(key: KeyTypeIDb) {
    await this.openDatabase();
    return <T>await this.db.getByKey(TABLE_NAME, key);
  }

  async getAll(keyRange?: IDBKeyRange, indexDetails?: IndexDetails) {
    await this.openDatabase();
    return await this.db.getAll(TABLE_NAME, keyRange, indexDetails);
  }

  async add(value: any, key: KeyTypeIDb) {
    await this.openDatabase();
    return await this.db.add(TABLE_NAME, value, key);
  }

  async update(value: any, key: KeyTypeIDb) {
    await this.openDatabase();
    return await this.db.update(TABLE_NAME, value, key);
  }

  async delete(key: KeyTypeIDb) {
    await this.openDatabase();
    return await this.db.delete(TABLE_NAME, key);
  }

  async clear() {
    await this.openDatabase();
    await this.db.clear(TABLE_NAME);
  }
}
