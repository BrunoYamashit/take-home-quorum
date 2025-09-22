import { LegislatorBillService } from '../../service/legislatorBill.service.js';

import { jest } from '@jest/globals';

describe('LegislatorBillService', () => {
  let service;
  const mockData = {
    bills: [
      { id: 1, title: 'Bill 1', sponsor_id: 1 },
      { id: 2, title: 'Bill 2', sponsor_id: 2 }
    ],
    legislators: [
      { id: 1, name: 'Legislator 1' },
      { id: 2, name: 'Legislator 2' }
    ],
    votes: [
      { id: 1, bill_id: 1 },
      { id: 2, bill_id: 2 }
    ],
    voteResults: [
      { legislator_id: 1, vote_id: 1, vote_type: 1 },
      { legislator_id: 2, vote_id: 1, vote_type: 2 }
    ]
  };

  beforeEach(() => {
    jest.restoreAllMocks();
    const mockImporter = {
      fromCSV: jest.fn().mockResolvedValue([
        mockData.bills,
        mockData.legislators,
        mockData.votes,
        mockData.voteResults
      ])
    };

    service = new LegislatorBillService(mockImporter);
  });

  test('computes legislatorBills and billVotes correctly', async () => {
    const result = await service.getLegislatorBills();

    expect(result).toHaveProperty('legislatorBills');
    expect(result).toHaveProperty('billVotes');

    expect(result.legislatorBills).toHaveLength(2);
    expect(result.legislatorBills[0]).toEqual({
      id: 1,
      title: 'Legislator 1',
      supported: 1,
      opposed: 0
    });
    expect(result.legislatorBills[1]).toEqual({
      id: 2,
      title: 'Legislator 2',
      supported: 0,
      opposed: 1
    });

    expect(result.billVotes).toHaveLength(2);
    expect(result.billVotes[0]).toEqual({
      id: 1,
      title: 'Bill 1',
      supported: 1,
      opposed: 1,
      primarySponsor: 'Legislator 1'
    });
    expect(result.billVotes[1]).toEqual({
      id: 2,
      title: 'Bill 2',
      supported: 0,
      opposed: 0,
      primarySponsor: 'Legislator 2'
    });
  });
});