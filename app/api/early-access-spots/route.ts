import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint for early access spots remaining
 * Replace with your actual database queries
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Replace with actual database queries
    // Example:
    // const totalSpots = 500;
    // const usedSpots = await db.artists.count({ where: { earlyAccess: true } });
    // const remaining = totalSpots - usedSpots;
    
    // For now, return mock data
    const totalSpots = 500;
    const usedSpots = 247; // Mock data
    const remaining = totalSpots - usedSpots;

    return NextResponse.json(
      {
        total: totalSpots,
        used: usedSpots,
        remaining: remaining,
        percentage: Math.round((usedSpots / totalSpots) * 100),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error('Early access spots API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch early access spots' },
      { status: 500 }
    );
  }
}
