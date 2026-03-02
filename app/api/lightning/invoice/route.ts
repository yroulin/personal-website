import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");
    const amountSats = searchParams.get("amount");

    if (!address || !amountSats) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const [username, domain] = address.split("@");
    const lnurlEndpoint = `https://${domain}/.well-known/lnurlp/${username}`;

    try {
        // 1. Get Params
        const paramRes = await fetch(lnurlEndpoint);
        if (!paramRes.ok) throw new Error("Failed to fetch LNURL params");
        const params = await paramRes.json();

        const { callback, minSendable, maxSendable } = params;
        const amountMsats = parseInt(amountSats) * 1000;

        if (amountMsats < minSendable || amountMsats > maxSendable) {
            return NextResponse.json({ error: "Amount out of range" }, { status: 400 });
        }

        // 2. Get Invoice
        const callbackUrl = new URL(callback);
        callbackUrl.searchParams.set("amount", amountMsats.toString());

        const invoiceRes = await fetch(callbackUrl.toString());
        if (!invoiceRes.ok) throw new Error("Failed to fetch invoice");
        const invoiceData = await invoiceRes.json();

        return NextResponse.json(invoiceData);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
