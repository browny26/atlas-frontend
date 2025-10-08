import React from "react";

const formatDescription = (text) => {
  if (!text) return "N/A";

  // 1️⃣ Decodifica HTML e rimuove tag indesiderati
  const cleanText = text
    .replace(/\\u003c/g, "<") // converte \u003c → <
    .replace(/\\u003e/g, ">") // converte \u003e → >
    .replace(/<\/?div[^>]*>/g, "")
    .replace(/<\/?p[^>]*>/g, "\n")
    .replace(/<\/?em[^>]*>/g, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/\n{2,}/g, "\n")
    .replace(/&amp;/g, "&");

  // 2️⃣ Suddivide il testo per intestazioni note o <strong>
  const parts = cleanText.split(
    /(?=<strong>|DAY\s+\d+:|(?:\b(?:duration|meeting_point|max_age|group_size|pricing|description|what_is_included|what_is_not_included|highlights|check_in_details|what_to_bring|disclaimers|itinerary):))/gi
  );

  return parts.map((section, idx) => {
    // Trova il titolo
    let titleMatch =
      section.match(/<strong>(.*?)<\/strong>/i) ||
      section.match(/DAY\s+\d+:/i) ||
      section.match(
        /\b(duration|meeting_point|max_age|group_size|pricing|description|what_is_included|what_is_not_included|highlights|check_in_details|what_to_bring|disclaimers|itinerary):/i
      );

    let title = titleMatch ? titleMatch[1] || titleMatch[0] : null;

    if (
      title &&
      !title.startsWith("DAY") &&
      !/<strong>/i.test(titleMatch?.[0] || "")
    ) {
      title = title.replaceAll("_", " ");
    }

    // Rimuove titolo dal contenuto
    let value = section
      .replace(/<strong>.*?<\/strong>/i, "")
      .replace(/DAY\s+\d+:/i, "")
      .replace(
        /\b(duration|meeting_point|max_age|group_size|pricing|description|what_is_included|what_is_not_included|highlights|check_in_details|what_to_bring|disclaimers|itinerary):/i,
        ""
      )
      .trim();

    if (!value) return null;

    // Gestisce liste con "-" o "•"
    if (value.includes("•") || value.includes("- ")) {
      const items = value
        .split("\n")
        .map((line) => line.replace(/^[-•]\s*/, "").trim())
        .filter(Boolean);

      return (
        <div key={idx} className="mt-4">
          {title && (
            <p className="font-semibold text-gray-800 capitalize">{title}</p>
          )}
          <ul className="list-disc list-inside mt-1 space-y-1 text-gray-700">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );
    }

    // Gestisce paragrafi multipli
    const paragraphs = value.split("\n").filter(Boolean);

    return (
      <div key={idx} className="mt-4">
        {title && (
          <p className="font-semibold text-gray-800 capitalize">{title}</p>
        )}
        <div className="text-gray-700 mt-1 space-y-2">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    );
  });
};

const ActivityDescription = ({ description }) => {
  return (
    <div className="text-sm leading-relaxed">
      {formatDescription(description)}
    </div>
  );
};

export default ActivityDescription;
