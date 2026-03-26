interface BlogPostData {
  id: string;
  slug: string;
  title: { he: string; en: string };
  excerpt: { he: string; en: string };
  content: { he: string; en: string };
  category: { he: string; en: string };
  cover: string;
  date: string;
  readTime: number;
  author: string;
}

export const blogPosts: BlogPostData[] = [
  {
    id: "1",
    slug: "buying-property-greece-guide",
    title: {
      he: "המדריך המלא לרכישת נכס ביוון — שלב אחר שלב",
      en: "The Complete Guide to Buying Property in Greece — Step by Step",
    },
    excerpt: {
      he: "יוון הפכה לאחת היעדים הנדל\"ניים הפופולריים ביותר בקרב משקיעים ישראלים. אבל איך בדיוק נראה התהליך? מה העלויות האמיתיות? ומה חשוב לבדוק לפני שחותמים?",
      en: "Greece has become one of the most sought-after real estate destinations for Israeli investors. But what does the process actually look like, what are the real costs, and what should you check before signing?",
    },
    content: {
      he: `<p>יוון מושכת משקיעים ישראלים כבר כמה שנים טובות — שילוב של מחירים תחרותיים, ביקוש שכירות גבוה מתיירים, ותוכנית ה-Golden Visa שפתחה דלתות לתושבי קבע. אבל רכישת נכס במדינה זרה מחייבת הכנה. הנה מה שצריך לדעת.</p>

<h2>שלב 1: קבלת מספר מס יווני (AFM)</h2>
<p>לפני הכל — ועוד לפני שסוגרים על נכס — צריך להשיג <strong>AFM</strong> (Arithmos Forologikou Mitroou), מספר הזיהוי הפיסקלי היווני. זה המקבילה ל"תעודת זהות מס" שלכם בעיני הרשויות היווניות. בלי AFM אי אפשר לחתום על חוזה, לפתוח חשבון בנק, או לרשום נכס.</p>
<p>מקבלים אותו בלשכת המס המקומית (DOY) בנוכחות פיזית, בדרך כלל תוך יום אחד. עורך הדין שלכם יכול לסדר את זה בשמכם עם ייפוי כוח.</p>

<h2>שלב 2: פתיחת חשבון בנק יווני</h2>
<p>בנקים יווניים דורשים חשבון מקומי להעברת תשלומי הרכישה. זה גם עוזר לאחר מכן בניהול שכירות ותשלום ארנונה. הבנקים הנפוצים הם Piraeus Bank, Alpha Bank ו-Eurobank. פותחים חשבון עם דרכון, AFM ועדות כתובת.</p>

<h2>שלב 3: מינוי עורך דין מקומי</h2>
<p>זה לא אופציונלי — זה חיוני. עורך דין יווני בודק את <strong>ניקיון הנכס</strong>: שאין עליו שעבודים, חובות, ירושות תלויות, בעיות בתב"ע, או בנייה לא חוקית. הרבה נכסים ביוון סובלים מבעיות רישום היסטוריות, ועורך דין טוב יציל אתכם מכאב ראש עתידי. עלות: בדרך כלל 1%–2% ממחיר הנכס.</p>

<h2>שלב 4: בדיקת נאותות</h2>
<p>עורך הדין מבצע בדיקה במרשם המקרקעין (Ktimatologio) ובמשרד העירייה. הבדיקה כוללת: בעלות, שטח רשום, היתרי בנייה, קנסות, ותשלומי עירייה שלא שולמו. בנכסים ישנים יותר — במיוחד באיים — כדאי גם לבדוק את <strong>ה-E9</strong> (הצהרת רכוש) של המוכר.</p>

<h2>שלב 5: חוזה מקדמי (Προσύμφωνο)</h2>
<p>לאחר שנמצא נכס מתאים ומחיר מוסכם, חותמים על <strong>חוזה מקדמי</strong> בפני נוטריון (Συμβολαιογράφος). בשלב זה משלמים <strong>מקדמה של כ-10%</strong>. אם הקונה מחזיר בחרטה — הוא מאבד את המקדמה. אם המוכר נסוג — הוא מחזיר כפל מקדמה.</p>

<h2>שלב 6: חוזה סופי ורישום</h2>
<p>החוזה הסופי (<strong>Συμβόλαιο</strong>) נחתם בפני נוטריון, בנוכחות שני הצדדים ועורכי הדין שלהם. בשלב זה משלמים את יתרת התשלום ומעבירים את הבעלות. לאחר החתימה, עורך הדין מגיש את הרישום במרשם המקרקעין.</p>

<h2>עלויות שיש לקחת בחשבון</h2>
<ul>
<li><strong>מס העברה:</strong> 3.09% משווי הנכס (נגבה על הגבוה מבין מחיר החוזה לבין "הערך האובייקטיבי" שקובעת הרשות)</li>
<li><strong>שכר נוטריון:</strong> כ-1%–1.5%</li>
<li><strong>שכר עורך דין:</strong> כ-1%–2%</li>
<li><strong>דמי רישום:</strong> כ-0.5%</li>
<li><strong>עמלת תיווך:</strong> בדרך כלל 2%–3% + מע"מ (משולמת על ידי הקונה)</li>
</ul>
<p>בסך הכל, צפו להוסיף <strong>7%–9%</strong> על גבי מחיר הנכס כעלויות עסקה.</p>

<h2>ויזת הזהב היוונית</h2>
<p>השקעה של <strong>800,000 אירו ומעלה</strong> באזורים כמו אתונה, תסלוניקי, מיקונוס וסנטוריני — או <strong>400,000 אירו</strong> ביתר חלקי יוון — מזכה בתושבות קבע יוונית (ויזת זהב). התושבות מאפשרת מגורים חופשיים ביוון ונסיעה חופשית בכל מדינות שנגן. היא לא דורשת שהייה מינימלית.</p>

<h2>טיפים מהשטח</h2>
<ul>
<li>בדקו תמיד שהנכס <strong>רשום בקדסטר</strong> (Ktimatologio) ולא רק במשרד ההיפותקות הישן — רישום הקדסטר הוא הסטנדרט המהימן</li>
<li>באיים קטנים, יש לבדוק אם הנכס נמצא <strong>מחוץ לתכנון</strong> (εκτός σχεδίου) — זה משפיע על האפשרות להוסיף בנייה</li>
<li>שאלו על <strong>ENFIA</strong> — מס הנדל"ן השנתי — לפני הרכישה. הוא נגבה מהקונה מרגע הרישום</li>
<li>אם אתם קונים להשכרת Airbnb — בדקו מראש את דרישות הרישוי המקומיות, כי הן מהדקות</li>
</ul>`,
      en: `<p>Greece has been attracting Israeli investors for several years now — a compelling mix of competitive prices, strong tourist rental demand, and a Golden Visa program that opened doors to permanent residency. But buying property abroad requires preparation. Here's what you need to know.</p>

<h2>Step 1: Getting a Greek Tax Number (AFM)</h2>
<p>Before anything else — even before locking in a property — you need an <strong>AFM</strong> (Arithmos Forologikou Mitroou), the Greek fiscal identification number. Think of it as your tax ID in the eyes of Greek authorities. Without an AFM, you cannot sign a contract, open a bank account, or register a property.</p>
<p>You obtain it at the local tax office (DOY) in person, typically in one day. Your lawyer can arrange this on your behalf with a power of attorney.</p>

<h2>Step 2: Opening a Greek Bank Account</h2>
<p>Greek banks require a local account for transferring purchase payments. It also simplifies rental management and municipal tax payments afterward. The most common banks are Piraeus Bank, Alpha Bank, and Eurobank. You'll need your passport, AFM, and proof of address to open one.</p>

<h2>Step 3: Appointing a Local Lawyer</h2>
<p>This is not optional — it's essential. A Greek attorney conducts a <strong>title search</strong> to confirm there are no mortgages, debts, pending inheritances, zoning issues, or illegal construction. Many Greek properties carry historical registration problems, and a good lawyer will save you significant headaches. Cost: typically 1%–2% of the property price.</p>

<h2>Step 4: Due Diligence</h2>
<p>Your lawyer checks the Land Registry (Ktimatologio) and municipal records for ownership history, registered area, building permits, fines, and unpaid municipal fees. For older properties — especially on the islands — it's also worth verifying the seller's <strong>E9 declaration</strong> (property declaration form).</p>

<h2>Step 5: Preliminary Contract (Προσύμφωνο)</h2>
<p>Once you've agreed on a property and price, you sign a <strong>preliminary contract</strong> before a notary (Συμβολαιογράφος) and pay a <strong>deposit of around 10%</strong>. If the buyer backs out, the deposit is forfeited. If the seller pulls out, they owe double the deposit back.</p>

<h2>Step 6: Final Contract and Registration</h2>
<p>The final deed (<strong>Συμβόλαιο</strong>) is signed before a notary, with both parties and their lawyers present. The remaining balance is paid and ownership is transferred. Your lawyer then files the registration with the Land Registry.</p>

<h2>Costs to Budget For</h2>
<ul>
<li><strong>Transfer tax:</strong> 3.09% of the property value (calculated on the higher of the contract price or the "objective value" set by the tax authority)</li>
<li><strong>Notary fees:</strong> approximately 1%–1.5%</li>
<li><strong>Lawyer fees:</strong> approximately 1%–2%</li>
<li><strong>Registration fees:</strong> approximately 0.5%</li>
<li><strong>Agency commission:</strong> typically 2%–3% + VAT (paid by the buyer)</li>
</ul>
<p>In total, expect to add <strong>7%–9%</strong> on top of the purchase price in transaction costs.</p>

<h2>The Greek Golden Visa</h2>
<p>An investment of <strong>€800,000 or more</strong> in areas such as Athens, Thessaloniki, Mykonos, and Santorini — or <strong>€400,000</strong> in other parts of Greece — qualifies you for Greek permanent residency (the Golden Visa). It grants free residence in Greece and visa-free travel across the Schengen Area, with no minimum stay requirement.</p>

<h2>Practical Tips</h2>
<ul>
<li>Always verify that the property is <strong>registered in the Ktimatologio</strong> (the national land registry), not just in the older Mortgage Registry — the Ktimatologio is the authoritative standard</li>
<li>On smaller islands, check whether the property is <strong>outside the building plan</strong> (εκτός σχεδίου) — this affects future construction rights</li>
<li>Ask about <strong>ENFIA</strong> — the annual property tax — before purchasing. It becomes the buyer's responsibility upon registration</li>
<li>If you're buying for Airbnb rental, check local licensing requirements in advance — regulations have been tightening across popular areas</li>
</ul>`,
    },
    category: { he: "מדריכים", en: "Guides" },
    cover: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&h=630&fit=crop",
    date: "2025-03-10",
    readTime: 7,
    author: "מערכת MANAIO",
  },
];
