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
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

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
              this._snackBar.open("Success", response.message);
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
    else {
      this._snackBar.open("Error", "Not Valid");
    }
  }

  getAllCards() {
    this.api.GetAllCards()
      .subscribe(response => {
        if (response) {
          if (response.status) {
            response.data.map((d: any) => {
              this.allCards.push(new CreditCardResponse(d));
            });
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
      return new CreditCardRequest(this.name, this.card, Number(this.limit));
    }
    else {
      return null;
    }
  }
}

