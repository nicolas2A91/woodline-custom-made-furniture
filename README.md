# Woodline – Custom Made Furniture

## Setup

### 1. Add your photos
Copy your 9 photos into the `/public/photos/` folder with these exact filenames:
- `villa-exterior.jpeg`
- `entrance-hall.jpeg`
- `hidden-door.jpeg`
- `black-wardrobe.jpeg`
- `wine-cellar-outside.jpeg`
- `wine-cellar-inside.jpeg`
- `kitchen.jpeg`
- `bathroom.jpeg`
- `wine-cellar-angle.jpeg`

### 2. Create Supabase table
Run this in your Supabase SQL Editor:
```sql
create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz default now()
);
```

### 3. Install & run locally
```bash
npm install
npm run dev
```

### 4. Deploy to Netlify
```bash
npm run build
```
Then drag the `dist/` folder to [netlify.com/drop](https://netlify.com/drop)

**Or connect GitHub for auto-deploys:**
1. Push this folder to a GitHub repo
2. Go to netlify.com → "Add new site" → "Import from Git"
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Site name: `woodline-custom-made-furniture`

## Supabase credentials
- URL: https://rgxvdkwqsfpwheibxsrw.supabase.co
- Anon key: already configured in `src/supabase.js`
