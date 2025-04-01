-- Database Schema for AppleStone Solutions Website

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Hero Section Table
CREATE TABLE IF NOT EXISTS hero_section (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  button_text TEXT NOT NULL,
  button_link TEXT NOT NULL,
  secondary_button_text TEXT,
  secondary_button_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Page Headers Table
CREATE TABLE IF NOT EXISTS page_headers (
  id SERIAL PRIMARY KEY,
  page_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product Types Table
CREATE TABLE IF NOT EXISTS product_types (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  features TEXT[],
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Business Goals Table
CREATE TABLE IF NOT EXISTS business_goals (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  benefits TEXT[],
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Machines Table
CREATE TABLE IF NOT EXISTS machines (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT,
  features TEXT[],
  specifications JSONB,
  status TEXT,
  location TEXT,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Updates Table
CREATE TABLE IF NOT EXISTS updates (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Page Content Table
CREATE TABLE IF NOT EXISTS page_content (
  id SERIAL PRIMARY KEY,
  page_name TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  quote TEXT NOT NULL,
  image_url TEXT,
  rating INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  "order" INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create update_timestamp function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables to update the updated_at timestamp
CREATE TRIGGER update_hero_section_timestamp
BEFORE UPDATE ON hero_section
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_page_headers_timestamp
BEFORE UPDATE ON page_headers
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_product_types_timestamp
BEFORE UPDATE ON product_types
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_business_goals_timestamp
BEFORE UPDATE ON business_goals
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_machines_timestamp
BEFORE UPDATE ON machines
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_updates_timestamp
BEFORE UPDATE ON updates
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_page_content_timestamp
BEFORE UPDATE ON page_content
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_testimonials_timestamp
BEFORE UPDATE ON testimonials
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_faqs_timestamp
BEFORE UPDATE ON faqs
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_settings_timestamp
BEFORE UPDATE ON settings
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

