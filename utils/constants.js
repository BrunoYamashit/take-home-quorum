import { fileURLToPath } from 'url';

const billsPath = fileURLToPath(new URL('../data/bills_(2).csv', import.meta.url));
const legislatorsPath =  fileURLToPath(new URL('../data/legislators_(2).csv', import.meta.url))
const votesPath =  fileURLToPath(new URL('../data/votes_(2).csv', import.meta.url))
const voteResultsPath =  fileURLToPath(new URL('../data/vote_results_(2).csv', import.meta.url))

export const FILES = {
  bills: billsPath,
  legislators: legislatorsPath,
  votes: votesPath,
  vote_results: voteResultsPath,
};