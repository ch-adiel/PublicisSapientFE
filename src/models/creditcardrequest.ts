export class CreditCardRequest {
    
    constructor(cardName: string, cardNumber: string, cardLimit: number) {
        this.CardName = cardName;
        this.CardNumber = cardNumber;
        this.CardLimit = cardLimit;
    }

    public CardName: string;
    public CardNumber: string;
    public CardLimit: number;
}