# Map Data Format

Timeline order is based on chapters and event sequences, not printed page numbers.

## Chapters

Each chapter has a stable, one-based `Index`. `Page` is optional metadata for display only.

```json
{
  "Index": 2,
  "Name": "Discovery",
  "Page": 6
}
```

## Entries

Each movement entry identifies the chapter in which it occurs and its one-based sequence within that chapter. Sequences are scoped to a character and chapter. `Page` may be omitted when the source does not provide stable page numbers.

```json
{
  "CharacterId": "character-id",
  "ChapterIndex": 2,
  "Sequence": 1,
  "Location": "Palancar Valley",
  "X": 42.5,
  "Y": 61.25,
  "Note": "Optional event context",
  "IsInvisible": false
}
```

When chapter `N` is selected, the viewer shows only entries where `ChapterIndex < N`. Entries from chapter `N` and all later chapters remain hidden.

Legacy data without chapter indices is normalized when loaded. Chapters receive indices from their existing JSON order, and legacy entries with page numbers are assigned to the latest chapter whose starting page is not greater than the entry page.
