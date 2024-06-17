import axios from "axios";

interface Coordinates {
    lat: number;
    lon: number;
}

async function validateAddress(address: string): Promise<boolean> {
    const url = `http://dev.virtualearth.net/REST/v1/Locations?q=${encodeURIComponent(
        address
    )}&key=${process.env.LOCATION_API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.resourceSets[0].resources.length === 0) {
            return false;
        }

        return true;
    } catch (e) {
        console.error("Error in address validation:", (e as Error).message);
        throw e;
    }
}

async function getCoordinates(address: string): Promise<Coordinates> {
    if (!(await validateAddress(address))) {
        console.warn(`Invalid address received: ${address}. Using "Rothschild Haifa" as fallback.`);
        address = "Rothschild, Haifa, Israel";
    }

    const url = `http://dev.virtualearth.net/REST/v1/Locations?q=${encodeURIComponent(
        address
    )}&key=${process.env.LOCATION_API_KEY}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.resourceSets[0].resources.length === 0) {
            throw new Error("No results found for the address");
        }

        const {point} = data.resourceSets[0].resources[0];
        return {lat: point.coordinates[0], lon: point.coordinates[1]};
    } catch (e) {
        console.error("Error in geocoding:", (e as Error).message);
        throw e;
    }
}

export async function calculateDistance(
    address1: string,
    address2: string
): Promise<number> {
    try {
        const coords1 = await getCoordinates(address1);
        const coords2 = await getCoordinates(address2);

        const url = `http://dev.virtualearth.net/REST/v1/Routes?wp.0=${coords1.lat},${coords1.lon}&wp.1=${coords2.lat},${coords2.lon}&key=${process.env.LOCATION_API_KEY}`;

        const response = await axios.get(url);
        const data = response.data;

        if (data.resourceSets[0].resources.length === 0) {
            throw new Error("No route found between the addresses");
        }

        const route = data.resourceSets[0].resources[0];
        const distance = route.travelDistance; // distance in kilometers

        return parseFloat(distance.toFixed(2));
    } catch (e) {
        console.error("Error:", (e as Error).message);
        throw e;
    }
}