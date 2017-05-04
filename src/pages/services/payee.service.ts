export class PayeeService {
  private payees: {title: string}[] = [];

  addPayee(payee: {title: string}) {
    this.payees.push(payee);
  }

  getPayees() {
    return this.payees.slice();
  }
}
