-- ═══════════════════════════════════════════════════
-- LUCID DATABASE SCHEMA v1
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  essence_name VARCHAR(50) NOT NULL,
  bio TEXT DEFAULT '',
  evolved_bio TEXT DEFAULT '',
  photo_url TEXT,
  profile_bg_url TEXT,
  values_list TEXT[] DEFAULT '{}',
  essence_points INTEGER DEFAULT 0,
  tier VARCHAR(20) DEFAULT 'Ember',
  torchbearer BOOLEAN DEFAULT FALSE,
  torch_reason TEXT,
  language VARCHAR(5) DEFAULT 'en',
  location_lat DECIMAL(10,7),
  location_lng DECIMAL(10,7),
  location_city VARCHAR(100),
  hi_depth INTEGER DEFAULT 50,
  hi_empathy INTEGER DEFAULT 50,
  hi_critical_thinking INTEGER DEFAULT 50,
  hi_impact INTEGER DEFAULT 50,
  hi_consistency INTEGER DEFAULT 50,
  total_witnessed INTEGER DEFAULT 0,
  total_stirred INTEGER DEFAULT 0,
  total_illuminated INTEGER DEFAULT 0,
  total_rippled INTEGER DEFAULT 0,
  spectrum_intelligence INTEGER DEFAULT 50,
  spectrum_understanding INTEGER DEFAULT 50,
  spectrum_communication INTEGER DEFAULT 50,
  spectrum_appreciation INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ DEFAULT NOW()
);

-- Sparks
CREATE TABLE sparks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  prompt_translations JSONB DEFAULT '{}',
  category VARCHAR(30) NOT NULL,
  difficulty INTEGER DEFAULT 2 CHECK (difficulty BETWEEN 1 AND 3),
  estimated_time VARCHAR(20) DEFAULT '30 min',
  points INTEGER DEFAULT 40,
  accepted_count INTEGER DEFAULT 0,
  returned_count INTEGER DEFAULT 0,
  avg_depth_score DECIMAL(5,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Spark Responses
CREATE TABLE spark_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  spark_id UUID REFERENCES sparks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  text_content TEXT NOT NULL,
  perspective_text TEXT DEFAULT '',
  photo_url TEXT,
  emotions TEXT[] DEFAULT '{}',
  depth_score INTEGER DEFAULT 50,
  verified BOOLEAN DEFAULT FALSE,
  creator_review TEXT,
  verified_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(spark_id, user_id)
);

-- Reflections
CREATE TABLE reflections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  spark_id UUID REFERENCES sparks(id) ON DELETE SET NULL,
  text_content TEXT NOT NULL,
  photo_url TEXT,
  emotions TEXT[] DEFAULT '{}',
  depth_score INTEGER DEFAULT 50,
  witnessed_count INTEGER DEFAULT 0,
  stirred_count INTEGER DEFAULT 0,
  illuminated_count INTEGER DEFAULT 0,
  rippled_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Illuminations
CREATE TABLE illuminations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reflection_id UUID REFERENCES reflections(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  spectrum VARCHAR(20) NOT NULL,
  text_content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(reflection_id, user_id)
);

-- Stirred
CREATE TABLE stirred (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reflection_id UUID REFERENCES reflections(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(reflection_id, user_id)
);

-- Threads
CREATE TABLE threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_a_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_b_id UUID REFERENCES users(id) ON DELETE CASCADE,
  topic VARCHAR(200),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_a_id, user_b_id)
);

CREATE TABLE thread_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID REFERENCES threads(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  text_content TEXT NOT NULL,
  available_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Circles
CREATE TABLE circles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  challenge TEXT NOT NULL,
  max_members INTEGER DEFAULT 12,
  total_days INTEGER DEFAULT 30,
  start_date DATE NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE circle_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  circle_id UUID REFERENCES circles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(circle_id, user_id)
);

CREATE TABLE circle_reflections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  circle_id UUID REFERENCES circles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  text_content TEXT NOT NULL,
  day_number INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(30) NOT NULL,
  text_content TEXT NOT NULL,
  reference_id UUID,
  reference_type VARCHAR(30),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Journey
CREATE TABLE journey_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  milestone TEXT NOT NULL,
  type VARCHAR(20) NOT NULL,
  emotion VARCHAR(30),
  connected_user_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_sparks_creator ON sparks(creator_id);
CREATE INDEX idx_responses_spark ON spark_responses(spark_id);
CREATE INDEX idx_reflections_author ON reflections(author_id);
CREATE INDEX idx_illuminations_refl ON illuminations(reflection_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, read);
CREATE INDEX idx_thread_msgs ON thread_messages(thread_id);
CREATE INDEX idx_circle_members ON circle_members(circle_id);
CREATE INDEX idx_journey_user ON journey_milestones(user_id);
