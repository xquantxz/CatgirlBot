CREATE TABLE IF NOT EXISTS Catgirl (
    catgirl_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    image_url TEXT,
    exp BIGINT DEFAULT 0,
    name TEXT NOT NULL,
    owner_id TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Warning (
    user_id TEXT NOT NULL,
    guild_id TEXT NOT NULL,
    admin_id TEXT,
    reason TEXT
);
