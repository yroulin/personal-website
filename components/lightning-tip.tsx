"use client";

import { QRCodeSVG } from "qrcode.react";
import { Bitcoin, Copy, Check, Loader2, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface LightningTipProps {
    address: string;
    title: string;
    description: string;
}

export function LightningTip({ address, title, description }: LightningTipProps) {
    const [copied, setCopied] = useState(false);
    const [amount, setAmount] = useState<string>("1000");
    const [invoice, setInvoice] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<"amount" | "invoice">("amount");

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const fetchInvoice = async () => {
        setLoading(true);
        try {
            const [username, domain] = address.split("@");
            const lnurlEndpoint = `https://${domain}/.well-known/lnurlp/${username}`;

            const paramRes = await fetch(lnurlEndpoint);
            if (!paramRes.ok) throw new Error("Failed to fetch LNURL params");
            const params = await paramRes.json();

            const { callback, minSendable, maxSendable } = params;
            const amountMsats = parseInt(amount) * 1000;

            if (amountMsats < minSendable || amountMsats > maxSendable) {
                throw new Error("Amount out of range");
            }

            const callbackUrl = new URL(callback);
            callbackUrl.searchParams.set("amount", amountMsats.toString());

            const invoiceRes = await fetch(callbackUrl.toString());
            if (!invoiceRes.ok) throw new Error("Failed to fetch invoice");
            const data = await invoiceRes.json();

            if (data.pr) {
                setInvoice(data.pr);
                setStep("invoice");

                if ((window as any).webln) {
                    try {
                        await (window as any).webln.enable();
                        await (window as any).webln.sendPayment(data.pr);
                    } catch (e) {
                        console.log("WebLN payment failed or dismissed", e);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching invoice", error);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setStep("amount");
        setInvoice(null);
    };

    return (
        <Dialog onOpenChange={(open) => !open && reset()}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-full border-orange-500/20 bg-orange-500/5 text-orange-600 dark:text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/40 transition-all group"
                >
                    <Bitcoin className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span>Support with LNURL</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Bitcoin className="w-5 h-5 text-orange-500" />
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {step === "amount" ? description : "Scan this invoice with your Lightning wallet."}
                    </DialogDescription>
                </DialogHeader>

                {step === "amount" ? (
                    <div className="space-y-6 py-4">
                        <div className="grid grid-cols-3 gap-2">
                            {["1000", "5000", "10000"].map((sats) => (
                                <Button
                                    key={sats}
                                    variant={amount === sats ? "default" : "outline"}
                                    className={amount === sats ? "bg-orange-500 hover:bg-orange-600" : ""}
                                    onClick={() => setAmount(sats)}
                                >
                                    {parseInt(sats).toLocaleString()} sats
                                </Button>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Custom Amount (Sats)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-mono text-lg"
                                placeholder="Enter amount..."
                            />
                        </div>

                        <Button
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 text-lg font-semibold rounded-xl transition-all"
                            onClick={fetchInvoice}
                            disabled={loading || !amount || parseInt(amount) <= 0}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}
                            Generate Invoice
                        </Button>

                        <p className="text-[10px] text-center text-slate-400">
                            Address: {address}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-6 py-6 animate-in fade-in zoom-in duration-300">
                        <div className="p-4 bg-white rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
                            <QRCodeSVG
                                value={invoice || ""}
                                size={220}
                                level="M"
                                includeMargin={false}
                            />
                        </div>

                        <div className="w-full space-y-3">
                            <div className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 group">
                                <code className="flex-1 text-[10px] font-mono break-all text-slate-700 dark:text-slate-300 px-2 line-clamp-2">
                                    {invoice}
                                </code>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 shrink-0"
                                    onClick={() => copyToClipboard(invoice || "")}
                                >
                                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full text-slate-500 hover:text-orange-500"
                                onClick={reset}
                            >
                                ← Change amount
                            </Button>
                        </div>
                    </div>
                )}

                <div className="flex justify-center border-t border-slate-100 dark:border-slate-900 pt-4 mt-2">
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        Powered by LNURL ⚡
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
