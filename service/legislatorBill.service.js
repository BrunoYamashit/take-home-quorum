import { Importer } from './importer.js'
import { FILES } from '../utils/constants.js'

export class LegislatorBillService {
    #importer;
    constructor(importer = new Importer()) {
        this.#importer = importer;
    }

    /**
     * 
     * @returns { legislatorBills: {id: string, title: string, supported: number, opposed: number}[], billVotes: {billId: string, title: string, supported: number, opposed: number, primarySponsor: string}[] }
     */
    async getLegislatorBills() {
        try {
            const [bill, legislators, votes, voteResults] = await this.#importer.fromCSV([
                FILES.bills,
                FILES.legislators,
                FILES.votes,
                FILES.vote_results,
            ]);
            const legislatorBills = legislators.map(leg => {
                const supportedVotesId = voteResults.filter(vr => vr.legislator_id === leg.id && vr.vote_type == 1).map(vr => vr.vote_id);
                const opposedVotesId = voteResults.filter(vr => vr.legislator_id === leg.id && vr.vote_type == 2).map(vr => vr.vote_id);
                const SupportedBillsIds = votes.filter(v => supportedVotesId.includes(v.id)).map(v => v.bill_id); 
                const OpposedBillsIds = votes.filter(v => opposedVotesId.includes(v.id)).map(v => v.bill_id);
                const supported = bill.filter(b => SupportedBillsIds.includes(b.id)).length;
                const opposed = bill.filter(b => OpposedBillsIds.includes(b.id)).length;
                
                return {
                    id: leg.id,
                    title : leg.name,
                    supported,
                    opposed
                };
            });
            
            const billVotes = bill.map(b => {
                const votesForBill = votes.filter(v => v.bill_id === b.id).map(v => v.id);
                const supported = voteResults.filter(vr => votesForBill.includes(vr.vote_id) && vr.vote_type == 1).length;
                const opposed = voteResults.filter(vr => votesForBill.includes(vr.vote_id) && vr.vote_type == 2).length;
                const primarySponsor = legislators.find(l => l.id === b.sponsor_id)?.name || "Unknown";
                return {
                    id: b.id,
                    title: b.title,
                    supported,
                    opposed,
                    primarySponsor
                }
            });
            return {legislatorBills, billVotes };
        } catch (error) {
            if(typeof error === 'string' && error.includes('does not exist')) {
                console.log(error);
                return { legislatorBills: [], billVotes: [] };
            }
            throw new Error("Error processing CSV files");
            
        }

    }
}