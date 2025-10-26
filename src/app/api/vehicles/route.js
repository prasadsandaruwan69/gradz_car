"use server";

let VEHICLES = [];

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ success: true, data: VEHICLES });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const id = `veh_${Date.now()}`;
    const vehicle = { id, ...body };
    VEHICLES.unshift(vehicle);
    return NextResponse.json({ success: true, data: vehicle }, { status: 201 });
  } catch (err) {
    console.error('POST /api/vehicles error', err);
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
