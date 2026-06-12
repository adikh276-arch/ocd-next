import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lng = searchParams.get('lng');
  const ns = searchParams.get('ns');

  if (!lng || !ns) {
    return NextResponse.json({ error: 'Missing lng or ns' }, { status: 400 });
  }

  // Try different possible paths for the translation file
  const root = process.cwd();
  const possiblePaths = [
    path.join(root, 'public', 'locales', lng, `${ns}.json`),
    path.join(root, 'src', 'app', ns, '_src', 'i18n', `${lng}.json`),
    path.join(root, 'src', 'app', ns, 'i18n', `${lng}.json`),
    path.join(root, 'src', 'app', ns, '_src', 'locales', `${lng}.json`),
  ];

  for (const filePath of possiblePaths) {
    try {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
          const content = fs.readFileSync(filePath, 'utf8');
          // Validate JSON to prevent client-side crashes
          JSON.parse(content); 
          return new NextResponse(content, {
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }
    } catch (err) {
      console.error(`[locales] Error reading/parsing ${filePath}:`, err);
    }
  }

  // Fallback to empty object if not found or errored
  return NextResponse.json({}, { status: 200 });
}
