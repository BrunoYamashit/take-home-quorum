# Quorum Legislative Data - Node.js Implementation

## What this is
A small Node.js/Express application that reads four CSV files (`bills_(2).csv`, `legislators_(2).csv`, `votes_(2).csv`, `vote_results_(2).csv`) from the `data/` folder and shows:
- For every legislator: how many bills they supported and opposed.
- For every bill: how many legislators supported and opposed, and the primary sponsor.

## Requirements
- Node.js (22+ recommended)
- npm
- CSVs

## How to run
1. Place your CSV files in the `data/` folder with these exact names:
   - `bills_(2).csv` (columns: id,title,primarySponsor)
   - `legislators_(2).csv` (columns: id,name)
   - `votes_(2).csv` (columns: id,bill_id)
   - `vote_results_(2).csv` (columns: id,legislator_id,vote_id,vote_type)
2. From project root:
   ```bash
   npm install
   npm start
   ```
3. Open `http://localhost:3000` in your browser.

## Notes
- If files are missing, the app will show empty tables and print a warning.