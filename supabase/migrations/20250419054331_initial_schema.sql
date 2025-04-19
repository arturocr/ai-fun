-- Schema for Supabase PostgreSQL database

-- Enable the pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Table to store user weather search history
CREATE TABLE IF NOT EXISTS search_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  location TEXT NOT NULL,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL,
  city TEXT,
  country TEXT,
  weather_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Add an index on user_id for faster queries
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE
);

-- Create an index on user_id for faster lookup of user history
CREATE INDEX IF NOT EXISTS idx_search_history_user_id ON search_history(user_id);

-- Create an index on created_at for time-based sorting
CREATE INDEX IF NOT EXISTS idx_search_history_created_at ON search_history(created_at);

-- Row Level Security (RLS) policies
-- Enable RLS on the search_history table
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own history
CREATE POLICY "Users can view their own search history"
  ON search_history
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own search history
CREATE POLICY "Users can insert their own search history"
  ON search_history
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own search history
CREATE POLICY "Users can update their own search history"
  ON search_history
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own search history
CREATE POLICY "Users can delete their own search history"
  ON search_history
  FOR DELETE
  USING (auth.uid() = user_id);