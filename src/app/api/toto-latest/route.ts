import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
    try {
        const res = await fetch("https://www.singaporepools.com.sg/DataFileArchive/Lottery/Output/toto_result_top_draws_en.html?v=15", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch from SP: ${res.status}`);
        }

        const html = await res.text();
        const $ = cheerio.load(html);

        const results: { drawNo: null, date: string, numbers: number[], additional: number }[] = [];

        // If we just use global selectors, they might be flat. Let's find specific containers for each draw.
        // In our manual test output, $(".drawDate").text() returned multiple concatenated dates. So we need to map them properly.
        const dates = $('.drawDate').map((i, el) => $(el).text().trim()).get();

        // There are 6 winning numbers per draw usually.
        // The classes are .win1 to .win6 and .additional
        // We can iterate over the dates and extract the associated numbers

        // Alternatively, if the HTML is perfectly ordered:
        const addNums = $('.additional').map((i, el) => parseInt($(el).text().trim())).get();

        for (let i = 0; i < dates.length; i++) {
            // Because of the way cheerio handles global maps, we can use eq() if we know each draw has exactly 1 win1, 1 win2, etc.
            const w1 = parseInt($('.win1').eq(i).text().trim());
            const w2 = parseInt($('.win2').eq(i).text().trim());
            const w3 = parseInt($('.win3').eq(i).text().trim());
            const w4 = parseInt($('.win4').eq(i).text().trim());
            const w5 = parseInt($('.win5').eq(i).text().trim());
            const w6 = parseInt($('.win6').eq(i).text().trim());

            if (!isNaN(w1) && !isNaN(w6) && !isNaN(addNums[i])) {
                results.push({
                    drawNo: null, // SP doesn't easily expose drawNo in the top_draws html sometimes
                    date: dates[i],
                    numbers: [w1, w2, w3, w4, w5, w6],
                    additional: addNums[i]
                });
            }
        }

        return NextResponse.json({ success: true, data: results });
    } catch (error: unknown) {
        console.error("Scraping error:", error);
        return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
