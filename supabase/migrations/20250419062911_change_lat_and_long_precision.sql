-- Change the precision of latitude and longitude columns in search_history table
ALTER TABLE search_history
  ALTER COLUMN latitude TYPE DECIMAL(12,9),
  ALTER COLUMN longitude TYPE DECIMAL(12,9);
