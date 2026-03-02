import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address || !address.includes("@")) {
        return NextResponse.json({ error: "Invalid address" }, { status: 400 });
    }

    const [username, domain] = address.split("@");
    const lnurlEndpoint = `https://${domain}/.well-known/lnurlp/${username}`;

    try {
        const response = await fetch(lnurlEndpoint, {
            headers: {
                "User-Agent": "Antigravity/1.0",
            },
        });

        if (!response.ok) {
            // Fallback for some domains that might be blockaded or different
            return NextResponse.json({ error: "Could not fetch LNURL parameters" }, { status: 502 });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
