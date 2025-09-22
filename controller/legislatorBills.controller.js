import { LegislatorBillService } from "../service/legislatorBill.service.js";

export class LegislatorBillController {
  #service;
  constructor(service = new LegislatorBillService()) {
    this.#service = service;
  }

  /**
   * @param {any} req
   * @param {{ send: (arg0: string) => void; }} res
   */
  async getLegislatorBills(req, res) {
    try {
      const { legislatorBills, billVotes } = await this.#service.getLegislatorBills();
      res.send(`
    <html>
      <head>
        <title>Quorum - Take home</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 24px; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { background: #f3f3f3; }
        </style>
      </head>
      <body>
        <h1>Legislative Data</h1>

        <h2>Legislators</h2>
        <table>
          <tr><th>ID</th><th>Legislator</th><th>Supported bills</th><th>Opposed bills</th></tr>
          ${legislatorBills
            .map(
              (lb) =>
                `<tr><td>${lb.id}</td><td>${lb.title}</td><td>${lb.supported}</td><td>${lb.opposed}</td></tr>`
            )
            .join("")}
        </table>

        <h2>Bills</h2>
        <table>
          <tr><th>ID</th><th>Bill</th><th>Supporters</th><th>Opposers</th><th>Primary Sponsor</th></tr>
          ${billVotes
            .map(
              (bv) =>
                `<tr><td>${bv.id}</td><td>${bv.title}</td><td>${bv.supported}</td><td>${bv.opposed}</td><td>${bv.primarySponsor}</td></tr>`
            )
            .join("")}
        </table>
      </body>
    </html>
  `);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
