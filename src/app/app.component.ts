import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreditCardRequest } from 'src/models/creditcardrequest';
import { CreditCardResponse } from 'src/models/creditcardresponse';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar, private api: ApiService) { }
  ngOnInit(): void {
    this.getAllCards();
  }
  displayedColumns: string[] = ['CardName', 'CardNumber', 'Balance', 'CardLimit'];

  public name: string = "";
  public card: string = "";
  public limit: string = "";
  public allCards: CreditCardResponse[] = [];

  public title = 'Publicis Sapient';

  add() {
    var model = this.getModel();
    if (model) {
      this.api.SaveCreditCard(model)
        .subscribe(response => {
          if (response) {
            if (response.status) {
              this._snackBar.open(response.message);
              this.getAllCards();
            }
            else {
              this._snackBar.open("Error", response.message);
            }
          }
          else {
            this._snackBar.open("Error", "Something went wrong");
          }
        },
        err => {
          if(err) {
            this._snackBar.open("Error", err.error.Message);
          }
        });
    }
  }

  getAllCards() {
    this.api.GetAllCards()
      .subscribe(response => {
        if (response) {
          if (response.status) {
            const data: CreditCardResponse[] = [];
            response.data.map((d: any) => {
              data.push(new CreditCardResponse(d));
            });
            this.allCards = data;
          }
          else {
            this._snackBar.open("Error", response.message);
          }
        }
        else {
          this._snackBar.open("Error", "Something went wrong");
        }
      });
  }

  getModel(): CreditCardRequest | null {
    if (this.name && this.card && this.limit) {
      if (this.card.length != 16) {
        this._snackBar.open("Error", "Card number not valid");
        return null;
      }
      if (Number(this.limit) < 0) {
        this._snackBar.open("Error", "Limit cannot be in negative");
        return null;
      }
      return new CreditCardRequest(this.name, this.card, Number(this.limit));
    }
    else {
      if (this.card.length != 16) {
        this._snackBar.open("Error", "Card number not valid");
        return null;
      }
      if (Number(this.limit) < 0) {
        this._snackBar.open("Error", "Limit cannot be in negative");
        return null;
      }
      return null;
    }
  }
}

