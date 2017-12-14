import { Component } from '@angular/core';
import { DrinkAutomatService } from './drink-automat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // DECLARATION start
  actioncasted = false;
  service: any;
  payed = 0.00;
  toPay = 0.00;
  title = 'Getränkeautomat';
  display = '';
  response: any = {
    coins: [],
    drink: {}
  };
  // DECLARATION end
  // example data
  drinks: any[] =
    [
      [
        {
          label: 'Coca Cola',
          price: 1.2,
          amount: 2
        },
        {
          label: 'Cola light',
          price: 1.4,
          amount: 4
        },
        {
          label: 'Cola Zero',
          price: 1.5,
          amount: 2
        }
      ],
      [
        {
          label: 'Fanta',
          price: 1.1,
          amount: 2
        },
        {
          label: 'Fanta light',
          price: 1.3,
          amount: 4
        },
        {
          label: 'Fanta Zero',
          price: 1.6,
          amount: 2
        }
      ],
      [
        {
          label: 'Apfelschorle',
          price: 1.9,
          amount: 2
        },
        {
          label: 'Club Marte',
          price: 2.1,
          amount: 4
        },
        {
          label: 'Wasser',
          price: 2.3,
          amount: 2
        }
      ]
    ];
  coins: any[] = [{
    val: 0.10,
    amount: 0
  },
  {
    val: 0.20,
    amount: 0
  },
  {
    val: 0.50,
    amount: 0
  },
  {
    val: 1.00,
    amount: 0
  },
  {
    val: 2.00,
    amount: 0
  }];
  constructor(daservice: DrinkAutomatService) {
    this.service = daservice;
  }
  // look after every change of a display character
  // if display matches the nr. of a drink and
  // if enough money is inserted the function will initiate the transaction
  checkForMatch() {
    if (this.display.length >= 2) {
      const x: number = Number.parseInt(this.display.substr(0, 1)) - 1;
      const y: number = Number.parseInt(this.display.substr(1, 1)) - 1;
      if (typeof this.drinks[x][y] === 'object') {
        if (this.drinks[x][y].amount > 0) {
          this.toPay = this.drinks[x][y].price;
          if (this.toPay <= this.payed) {
            this.response = this.service.changeMoney(this.coins, this.drinks[x][y]);
            this.actioncasted = true;
            this.drinks[x][y].amount = this.drinks[x][y].amount - 1;
            this.display = '';
            for (let i = 0; i < this.coins.length; i++) {
              this.coins[i].amount = 0;
            }
            this.payed = 0;
            this.toPay = 0;
          }
       } else {
          this.display = 'leer';
        }
      }
    }
  }
  addNumber(number: number) {
    if(this.display.length < 2) {
      this.display = this.display + number;
      this.checkForMatch();
    }
  }
  reset() {
    this.display = '';
    for (let i = 0; i < this.coins.length; i++) {
      this.coins[i].amount = 0;
    }
    this.payed = 0;
    this.toPay = 0;
    this.actioncasted = false;
    this.response = {
      coins: [],
      drink: {}
    };
  }
}
