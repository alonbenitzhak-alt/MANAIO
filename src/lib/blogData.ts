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
  {
    id: "2",
    slug: "buying-property-cyprus-guide",
    title: {
      he: "המדריך המלא לרכישת נכס בקפריסין — שלב אחר שלב",
      en: "The Complete Guide to Buying Property in Cyprus — Step by Step",
    },
    excerpt: {
      he: "קפריסין היא אחת היעדים הנדל\"ניים הקרובים והנוחים ביותר למשקיעים ישראלים — 40 דקות טיסה, סביבה אנגלופונית ומשפט מבוסס common law. הנה כל מה שצריך לדעת לפני שרוכשים.",
      en: "Cyprus is one of the most accessible real estate destinations for Israeli investors — a 40-minute flight, an English-speaking environment, and a legal system rooted in common law. Here's everything you need to know before buying.",
    },
    content: {
      he: `<p>קפריסין מושכת משקיעים ישראלים בעיקר בשל הקרבה הגיאוגרפית, השפה האנגלית כשפת עסקים, ומערכת משפטית המבוססת על ה-common law הבריטי — מה שמקל על הבנת הנהלים בהשוואה למדינות אירופאיות אחרות. לימסול ופאפוס הן הערים המובילות לרכישה, עם שוק שכירות פעיל ועלייה עקבית במחירים בשנים האחרונות.</p>

<h2>שלב 1: מציאת עורך דין מקומי</h2>
<p>בקפריסין, <strong>מינוי עורך דין לפני כל פעולה</strong> הוא הצעד הראשון — לא אחרי. עורך הדין מבצע בדיקת שטר הבעלות (Title Deed), בודק שאין שעבודים, מיסים שלא שולמו, צווי בנייה בלתי חוקיים, והגבלות תכנון. בקפריסין ישנם נכסים רבים שעדיין אין להם שטר בעלות סופי — עורך הדין יזהיר אתכם מראש. עלות: בדרך כלל כ-1% ממחיר הנכס.</p>

<h2>שלב 2: הסכם הזמנה ומקדמה</h2>
<p>לאחר שמצאתם נכס, חותמים על <strong>הסכם הזמנה (Reservation Agreement)</strong> ומשלמים מקדמה סמלית — בדרך כלל בין €2,000 ל-€5,000 — כדי להוציא את הנכס מהשוק בזמן שמתבצעת בדיקת הנאותות. הסכם זה אינו מחייב לרכישה, אך המקדמה לרוב אינה מוחזרת אם הקונה נסוג ללא עילה.</p>

<h2>שלב 3: בדיקת נאותות</h2>
<p>עורך הדין בודק את הנכס ברשם המקרקעין של קפריסין (Land Registry). הבדיקה כוללת: בעלות ושרשרת בעלות היסטורית, שעבודים ומשכנתאות, היתרי בנייה, ותאימות לתכנית המתאר. אם הנכס הוא <strong>דירה חדשה מקבלן</strong> — בדקו שהקבלן רשום ומורשה וכי הפרויקט קיבל את כל האישורים הנדרשים.</p>

<h2>שלב 4: חוזה מכר (Sale and Purchase Agreement)</h2>
<p>לאחר השלמת הבדיקות, חותמים על <strong>חוזה מכר מפורט</strong> הכולל את מחיר הנכס, לוח התשלומים, מועד המסירה ותנאי הביטול. חוזה זה מוגש לרשם המקרקעין תוך 60 יום — רישום זה מגן על הקונה מפני מכירה כפולה או שעבוד עתידי של הנכס על ידי המוכר.</p>

<h2>שלב 5: מס בולים (Stamp Duty)</h2>
<p>בתוך 30 יום מחתימת החוזה, יש לשלם <strong>מס בולים</strong>:
<ul>
<li>0.15% על החלק עד €170,860</li>
<li>0.20% על החלק שמעל €170,860</li>
</ul>
מדובר בסכום נמוך יחסית — על נכס של €300,000 למשל, מס הבולים יעמוד על כ-€515.</p>

<h2>שלב 6: אישור מועצת השרים (לאזרחים שאינם מהאיחוד האירופי)</h2>
<p>אזרחים שאינם מהאיחוד האירופי — כולל ישראלים — נדרשים לקבל <strong>אישור מועצת השרים</strong> לרכישת נכס למגורים בקפריסין. בפועל, מדובר בהליך פורמלי שמאושר כמעט תמיד לנכסי מגורים. ההליך מתבצע דרך עורך הדין שלכם ולוקח בדרך כלל 2–4 חודשים. בתקופת הביניים, הרכישה מתקדמת כרגיל.</p>

<h2>שלב 7: העברת בעלות ורישום שטר</h2>
<p>לאחר קבלת כל האישורים ותשלום מלוא התמורה, מתבצעת <strong>העברת שטר הבעלות (Title Deed Transfer)</strong> ברשם המקרקעין. בשלב זה משולמת עמלת ההעברה. חשוב לדעת: <strong>נכסים חדשים שנרכשו עם מע"מ פטורים מעמלת ההעברה</strong> — זו הטבה משמעותית שכדאי לבדוק עם עורך הדין.</p>

<h2>עלויות שיש לקחת בחשבון</h2>
<ul>
<li><strong>מע"מ על נכסים חדשים:</strong> 19% — אך ניתן לקבל שיעור מופחת של 5% לנכס מגורים ראשוני עד שטח של 200 מ"ר (עם תנאים)</li>
<li><strong>עמלת העברה (נכסי יד שנייה):</strong> 3% עד €85,430 | 5% עד €170,860 | 8% מעל</li>
<li><strong>מס בולים:</strong> 0.15%–0.20% (ראו שלב 5)</li>
<li><strong>שכר עורך דין:</strong> כ-1%</li>
<li><strong>עמלת תיווך:</strong> בדרך כלל 3%–5% (משולמת לרוב על ידי המוכר/הקבלן, אך מומלץ לוודא)</li>
</ul>

<h2>תושבות קבע קפריסאית דרך השקעה</h2>
<p>השקעה של <strong>€300,000 ומעלה בנכס חדש</strong> מאפשרת לקבל <strong>תושבות קבע קפריסאית</strong>. התוכנית דורשת בנוסף להוכיח הכנסה קבועה מחוץ לקפריסין — לפחות €30,000 לשנה + €5,000 לכל תלוי נוסף. התושבות ניתנת לכל החיים, אינה דורשת שהייה מינימלית, ומעניקה גישה חופשית לשירותי בריאות וחינוך בקפריסין.</p>
<p>בניגוד לתוכנית האזרחות שבוטלה ב-2020, תוכנית התושבות הקבע פעילה ומייצרת — ומהווה אחד הגורמים המרכזיים שמניעים ביקוש ישראלי לנכסים בלימסול ופאפוס.</p>

<h2>הבדל חשוב: קפריסין היוונית לעומת צפון קפריסין</h2>
<p>כל האמור לעיל מתייחס ל<strong>רפובליקה של קפריסין</strong> (הדרום) — מדינה חברה באיחוד האירופי עם מערכת משפטית יציבה. <strong>צפון קפריסין</strong> הוא אזור שאינו מוכר בינלאומית, עם סיכונים משפטיים משמעותיים הנוגעים לבעלות על קרקע. משקיעים מומלץ שלא לרכוש נכסים בצפון קפריסין ללא ייעוץ משפטי מעמיק במיוחד.</p>

<h2>טיפים מהשטח</h2>
<ul>
<li>בדקו שלנכס יש <strong>שטר בעלות סופי</strong> (Title Deed) — חלק מהנכסים בקפריסין עדיין ממתינים לרישום, מה שמגביל את יכולת המשכון והמכירה</li>
<li>אם הנכס חדש — בקשו לראות את <strong>היתר הבנייה</strong> ואת <strong>תעודת האכלוס</strong> (Certificate of Final Approval)</li>
<li>עמלת ההעברה הופחתה ב-50% בעסקאות ללא מע"מ — שאלו את עורך הדין האם ההנחה חלה בעסקה הספציפית שלכם</li>
<li>לימסול ופאפוס מציעות שוק שכירות פעיל לאורך כל השנה, בעוד שערים קטנות יותר תלויות יותר בעונת הקיץ</li>
</ul>`,
      en: `<p>Cyprus attracts Israeli investors primarily due to its geographical proximity, English as the language of business, and a legal system rooted in British common law — making the process far more familiar than most European countries. Limassol and Paphos lead the market, with active rental demand and consistent price appreciation in recent years.</p>

<h2>Step 1: Appoint a Local Lawyer First</h2>
<p>In Cyprus, <strong>appointing a lawyer before anything else</strong> is the starting point — not an afterthought. Your lawyer will search the Title Deed, check for mortgages, unpaid taxes, illegal construction, and planning restrictions. Many properties in Cyprus still lack a final Title Deed — your lawyer will flag this upfront. Cost: typically around 1% of the purchase price.</p>

<h2>Step 2: Reservation Agreement and Deposit</h2>
<p>Once you've found a property, you sign a <strong>Reservation Agreement</strong> and pay a token deposit — usually between €2,000 and €5,000 — to take the property off the market while due diligence is completed. This agreement is not a binding commitment to purchase, but the deposit is generally non-refundable if the buyer walks away without cause.</p>

<h2>Step 3: Due Diligence</h2>
<p>Your lawyer searches the Cyprus Land Registry to verify ownership history, mortgages, building permits, and compliance with the local development plan. For <strong>new-build apartments</strong>, check that the developer is registered and licensed and that all required planning and building permits are in place.</p>

<h2>Step 4: Sale and Purchase Agreement</h2>
<p>After due diligence is complete, you sign a detailed <strong>Sale and Purchase Agreement (SPA)</strong> covering the purchase price, payment schedule, completion date, and cancellation terms. This contract is submitted to the Land Registry within 60 days — a critical step that protects the buyer against double-selling or the seller mortgaging the property after signing.</p>

<h2>Step 5: Stamp Duty</h2>
<p>Within 30 days of signing the SPA, stamp duty must be paid:
<ul>
<li>0.15% on the portion up to €170,860</li>
<li>0.20% on the portion above €170,860</li>
</ul>
This is a relatively modest cost — on a €300,000 property, for example, stamp duty comes to approximately €515.</p>

<h2>Step 6: Council of Ministers Approval (Non-EU Buyers)</h2>
<p>Non-EU citizens — including Israelis — are required to obtain <strong>Council of Ministers approval</strong> to purchase residential property in Cyprus. In practice, this is a routine formality for residential purchases and is almost always granted. Your lawyer handles the application, which typically takes 2–4 months. The transaction proceeds in parallel during this period.</p>

<h2>Step 7: Title Deed Transfer and Registration</h2>
<p>Once all approvals are in place and full payment has been made, the <strong>Title Deed is transferred</strong> at the Land Registry. Transfer fees are paid at this stage. Importantly: <strong>new properties purchased with VAT are exempt from transfer fees</strong> — a significant saving worth confirming with your lawyer.</p>

<h2>Costs to Budget For</h2>
<ul>
<li><strong>VAT on new properties:</strong> 19% — but a reduced rate of 5% applies to a primary residence up to 200 sqm (conditions apply)</li>
<li><strong>Transfer fees (resale properties):</strong> 3% up to €85,430 | 5% up to €170,860 | 8% above</li>
<li><strong>Stamp duty:</strong> 0.15%–0.20% (see Step 5)</li>
<li><strong>Legal fees:</strong> approximately 1%</li>
<li><strong>Agency commission:</strong> typically 3%–5% (usually paid by the seller/developer, but confirm in advance)</li>
</ul>

<h2>Cyprus Permanent Residency by Investment</h2>
<p>An investment of <strong>€300,000 or more in a new property</strong> qualifies you for <strong>Cyprus Permanent Residency</strong>. The program also requires proof of stable income from outside Cyprus — at least €30,000 per year, plus €5,000 per additional dependent. The residency is granted for life, requires no minimum stay, and provides access to Cyprus's healthcare and education systems.</p>
<p>Unlike the citizenship-by-investment program cancelled in 2020, the Permanent Residency program remains active and is one of the primary drivers of Israeli demand for properties in Limassol and Paphos.</p>

<h2>Important Distinction: Republic of Cyprus vs. Northern Cyprus</h2>
<p>Everything above refers to the <strong>Republic of Cyprus</strong> (the south) — a full EU member with a stable legal framework. <strong>Northern Cyprus</strong> is an internationally unrecognized territory with significant legal risks related to land ownership. Investors are strongly advised against purchasing in Northern Cyprus without exceptionally thorough legal counsel.</p>

<h2>Practical Tips</h2>
<ul>
<li>Confirm the property has a <strong>final Title Deed</strong> — many properties in Cyprus are still awaiting registration, which limits your ability to mortgage or resell</li>
<li>For new builds, ask to see the <strong>building permit</strong> and the <strong>Certificate of Final Approval</strong></li>
<li>Transfer fees are reduced by 50% on resale transactions not subject to VAT — ask your lawyer whether this discount applies to your specific deal</li>
<li>Limassol and Paphos offer active year-round rental markets, while smaller towns tend to be more seasonal</li>
</ul>`,
    },
    category: { he: "מדריכים", en: "Guides" },
    cover: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=630&fit=crop",
    date: "2025-03-17",
    readTime: 8,
    author: "מערכת MANAIO",
  },
];
