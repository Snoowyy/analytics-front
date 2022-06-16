import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MultiselectStore, MultiselectState } from './multiselect.store';
import { Multiselect } from './multiselect.model';
import { distinct } from '@progress/kendo-data-query';

@Injectable({ providedIn: 'root' })
export class MultiselectQuery extends QueryEntity<MultiselectState, Multiselect[]> {

  constructor(protected store: MultiselectStore) {
    super(store);
  }

  public getOptions(): Observable<Multiselect[]> {
    return this.selectEntity(`options`)
      .pipe(
        map((options: Multiselect[]) => {
          if (!options) return [];
          const businessUnit = this.getBusinessUnit(options);
          const clients = this.getClients(options);
          const pointsSale = this.getPointSales(options);
          const regions = this.getRegions(pointsSale);
          const products = this.getProducts(options);
          const productCategories = this.getProductCategories(products);
          const categoriesPointSale = this.getCategoriesPointsSale(pointsSale);

          return businessUnit
            .concat(clients)
            .concat(pointsSale)
            .concat(regions)
            .concat(products)
            .concat(productCategories)
            .concat(categoriesPointSale);
        })
      );
  }

  public getAllClients(): Observable<Multiselect[]> {
    return this.selectEntity(`options`)
      .pipe(
        map((options: Multiselect[]) => {
          if (!options) return [];
          const clients = this.getClients(options);
          return clients;
        })
      );
  }

  private getBusinessUnit(options: Multiselect[]): Multiselect[] {
    const chains: Multiselect[] = [];
    options.forEach((opt: Multiselect) => {
      if (opt.type === 'businessunit' && opt.name !== '') {
        chains.push({
          name: opt.name,
          type: 'empresa',
          gln: opt.gln
        });
      }
    });
    return chains;
  }

  private getPointSales(options: Multiselect[]): Multiselect[] {
    const pointsSale: Multiselect[] = [];
    options.forEach((opt: Multiselect) => {
      if (opt.type === 'pv' && opt.name !== '') {
        pointsSale.push({
          name: opt.name,
          type: 'punto de venta',
          categories: opt.categories,
          gln: opt.gln,
          region: opt.region,
          retailer: opt.retailer
        });
      }
    });
    return pointsSale;
  }

  private getRegions(pointSales: Multiselect[]): Multiselect[] {
    const regions: Multiselect[] = [];
    pointSales.forEach((ps: Multiselect) => {
      if (ps.region !== '' && ps.region) {
        regions.push({
          name: ps.region.toLowerCase(),
          type: 'ciudad'
        });
      }
    });
    return distinct(regions, 'name');
  }

  private getProducts(options: Multiselect[]): Multiselect[] {
    const products: Multiselect[] = [];
    options.forEach((opt: Multiselect) => {
      if (opt.type === 'product' && opt.name !== '')
        products.push({
          name: opt.name,
          type: 'producto',
          gtin: opt.gtin,
          categories: opt.categories
        });
    });
    return products;
  }

  private getClients(options: Multiselect[]): Multiselect[] {
    const clients: Multiselect[] = [];
    options.forEach((opt: Multiselect) => {
      if (opt.type === 'client' && opt.name !== '')
        clients.push({
          gln: opt.gln,
          name: opt.name,
          type: 'cliente'
        });
    });
    return clients;
  }

  private getProductCategories(products: Multiselect[]): Multiselect[] {
    const categories: Multiselect[] = [];
    products.forEach((prod: Multiselect) => {
      prod.categories.forEach((category: string) => {
        if (category !== '') {
          categories.push({
            name: category,
            type: 'categoria de producto',
            levels: prod.categories
          });
        }
      });
    });
    return distinct(categories, 'name');
  }

  private getCategoriesPointsSale(pointsSale: Multiselect[]): Multiselect[] {
    const categories: Multiselect[] = [];
    pointsSale.forEach((ps: Multiselect) => {
      ps.categories.forEach((category: string) => {
        if (category !== '') {
          categories.push({
            name: category.toLowerCase(),
            type: 'categoria de punto de venta',
            levels: ps.categories
          });
        }
      });
    });
    return distinct(categories, 'name');
  }
}
