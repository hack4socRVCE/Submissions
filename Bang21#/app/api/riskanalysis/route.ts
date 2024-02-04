// pages/api/route.ts or app/api/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DOMParser } from '@xmldom/xmldom';
import { calculateDistance } from  "@/utils/calculateDistance";

type Circle = {
    center: [number, number];
    radius: number;
};

type DataPoint = {
    lat: number;
    lng: number;
    [key: string]: any;
};

const parseKML = (filePath: string): DataPoint[] => {
    const kml = fs.readFileSync(filePath, 'utf-8');
    const doc = new DOMParser().parseFromString(kml, 'text/xml');
    const placemarks = doc.getElementsByTagName('Placemark');
    const points: DataPoint[] = [];

    for (let i = 0; i < placemarks.length; i++) {
        const pointNode = placemarks[i].getElementsByTagName('Point')[0];
        if (pointNode) {
            const coordText = pointNode.getElementsByTagName('coordinates')[0].textContent || '';
            const [lng, lat] = coordText.trim().split(',').map(Number);
            points.push({ lat, lng });
        }
    }
    return points;
};

export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
        const requestBody = await req.text();
        let circles: Circle[] = [];

        try {
            const jsonBody = JSON.parse(requestBody);
            circles = jsonBody.circles;
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const kmlFiles = ['/kml/flood.kml', '/kml/waterdepth.kml'];
        const pointsInCircles: DataPoint[] = [];

        kmlFiles.forEach(kmlFile => {
            const filePath = path.join(process.cwd(), 'public', kmlFile);
            const points = parseKML(filePath);

            points.forEach(point => {
                circles.forEach(circle => {
                    const distance = calculateDistance({lat: point.lat, lon: point.lng}, {lat: circle.center[0], lon: circle.center[1]});

                    if (distance <= circle.radius) {
                        pointsInCircles.push({...point, distance});
                    }
                });
            });
        });

        return new Response(JSON.stringify({ pointsInCircles }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } else {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
            status: 405,
            headers: {
                'Content-Type': 'application/json',
                'Allow': 'POST',
            },
        });
    }
}
