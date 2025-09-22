# Questions

## 1) Discuss your strategy and decisions implementing the application. Please, consider time complexity, effort cost, technologies used and any other variable that you understand important on your development process.
- **Language & libraries**: Node.js with Express and `csv-parse` for CSV parsing. Chosen for simplicity and rapid setup.
- **Space/Time complexity**: Overall O(Bill+Legislators+Votes+Results).
- **Effort & tradeoffs**: This implementation is quick to implement and easy to understand. For production, I'd add streaming, input validation, richer type parsing, pagination and caching.

## 2) How would you change your solution to account for future columns that might be requested, such as “Bill Voted On Date” or “Co-Sponsors”
- **Extend CSV parsing**: The CSV parser already preserves extra columns; update mapping to include new fields (e.g., `vote_date`). 
- **Schema approach**: Introduce a simple schema layer or JSON schema for expected columns and optional columns, with automated migrations/parsers.
- **Co-sponsors**: Add a new CSV or a column with a list of co-sponsor IDs; parse and store as arrays. Update UI to show a tooltip or expandable row with co-sponsor names.
- **Storage**: For many new fields and scale, move to a relational DB (Postgres) capturing relationships (bills, legislators, votes, co-sponsors) and index on frequently queried columns (e.g., vote_date).

## 3) How would you change your solution if instead of receiving CSVs of data, you were given a list of legislators or bills that you should generate a CSV for?
  1. Add an Express POST endpoint that accepts JSON `{ legislators: [id,...] }` or `{ bills: [id,...] }`.
  2. Filter the in-memory models (or DB) to the requested items and serialize to CSV (e.g., using `csv-stringify` or simple join logic).
  3. Respond with `Content-Type: text/csv` and `Content-Disposition: attachment; filename=...` so the client can download the generated CSV.
- If large-scale or asynchronous processing is required, enqueue the generation job and provide a job status endpoint.

## 4) Time spent
- Implementation & writeup scaffolding in this project: +- 1.5 hours on development. 0.5 hours on testing.

## Additional suggestions / production improvements
- Input validation & stricter logging.
- Pagination and server-side sorting for large tables.
- Authentication & access control for client usage.
- Move heavy workloads to a database and add indexes for performance.
- Provide CSV import API (HTTP upload) and async processing with progress updates.
