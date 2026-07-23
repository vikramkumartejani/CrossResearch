import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const asset = searchParams.get('asset') || 'EURUSD'
    const source = searchParams.get('source') || 'live'
    const seasonality = searchParams.get('seasonality') || null

    const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000'
    
    if (seasonality) {
      const apiUrl = new URL('/seasonality', backendUrl)
      apiUrl.searchParams.append('instruments', seasonality)
      
      const response = await fetch(apiUrl.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
        console.error('FastAPI error:', errorData)
        return NextResponse.json(
          { error: 'Failed to fetch seasonality data from backend', details: errorData.detail || errorData },
          { status: response.status }
        )
      }

      const data = await response.json()
      return NextResponse.json(data)
    }

    const apiUrl = `${backendUrl}/price-ranges?asset=${asset}&source=${source}`
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
      console.error('FastAPI error:', errorData)
      return NextResponse.json(
        { error: 'Failed to fetch price ranges from backend', details: errorData.detail || errorData },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
