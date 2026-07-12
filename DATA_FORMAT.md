# Map Data Format

Timeline order is based on printed page numbers.

## Chapters

Each chapter records its name and starting page. Chapters are ordered by `Page`.

```json
{
  "Name": "Discovery",
  "Page": 6
}
```

## Entries

Each movement entry requires a `Page`. Decimal values may be used to order multiple events that happen on the same printed page.

```json
{
  "CharacterId": "character-id",
  "Page": 12.5,
  "Location": "Palancar Valley",
  "X": 42.5,
  "Y": 61.25,
  "Note": "Optional event context",
  "IsInvisible": false
}
```

When a chapter is selected, the viewer shows only entries whose `Page` is less than that chapter's starting page. Events in the selected chapter and all later chapters remain hidden.

Add a final synthetic chapter such as `End of Eragon` after the book's last real chapter so readers can reveal events from the final chapter. Its page should be later than every event in the book.
