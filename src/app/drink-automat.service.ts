import { Injectable } from '@angular/core';

@Injectable()
export class DrinkAutomatService {
  // exsample data
  coins: any[] = [{
    val: 0.10,
    amount: 5
  },
  {
    val: 0.20,
    amount: 5
  },
  {
    val: 0.50,
    amount: 5
  },
  {
    val: 1.00,
    amount: 5
  },
  {
    val: 2.00,
    amount: 5
  }];
  constructor() {  }
  // counts money of user and adds coins to machine
  // looks for biggest possible change
  // retuns drink and array of coins
  changeMoney(givencoins: any, drink: any) {
    let price: number = drink.price;
    let givenmoney = 0;
    let amount: number;
    const changeMoney: any[] = [];
    // add coins from userinput
    for (let i = 0; i < givencoins.length; i++) {
      if (typeof givencoins[i] === 'object' && givencoins[i].amount > 0) {
        for (let y = 0; y < this.coins.length; y++) {
          if (givencoins[i].val === this.coins[y].val ) {
            this.coins[y].amount = this.coins[y].amount + givencoins[i].amount;
            givenmoney = givenmoney + (givencoins[i].amount * givencoins[i].val);
          }
        }
      }
    }
    price = givenmoney - price;
    // get coins for user
    for (let i = 0; i < this.coins.length; i++) {
      if (this.coins[(this.coins.length - (i + 1))].amount > 0) {
        amount = Number((price / this.coins[(this.coins.length - (i + 1))].val).toString().substr(0, 1));
        if (amount >= 1) {
          price = Number((price % this.coins[(this.coins.length - (i + 1))].val).toPrecision(1));
          changeMoney.push({
            val: this.coins[(this.coins.length - (i + 1))].val,
            amount: amount
          });
          this.coins[(this.coins.length - (i + 1))].amount = amount;
          if (price <= 0) {
            return {
              coins: changeMoney,
              drink: drink.label
            };
          }
        }
      }
    }
  }
}
