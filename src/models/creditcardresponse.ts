export class CreditCardResponse {
    
    constructor(model: any) {
        this.Id = model.id;
        this.CardName = model.cardName;
        this.CardNumber = model.cardNumber;
        this.CardLimit = model.cardLimit;
        this.Balance = model.balance;
    }

    public Id: number;
    public CardName: string;
    public CardNumber: string;
    public CardLimit: number;
    public Balance: number;
}