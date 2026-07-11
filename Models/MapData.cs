namespace ev.Models;

public class MapData
{
    public int TotalPages { get; set; } = 1000;
    public List<CharacterModel> Characters { get; set; } = new();
    public List<ChapterModel> Chapters { get; set; } = new();
    public List<MapEntry> Entries { get; set; } = new();
    public List<LocationPreset> Locations { get; set; } = new();

    public void NormalizeTimeline()
    {
        var indicesAreValid = Chapters.All(c => c.Index > 0) &&
                              Chapters.Select(c => c.Index).Distinct().Count() == Chapters.Count;

        if (!indicesAreValid)
        {
            for (var i = 0; i < Chapters.Count; i++)
                Chapters[i].Index = i + 1;
        }

        Chapters = Chapters.OrderBy(c => c.Index).ToList();

        foreach (var entry in Entries.Where(e => e.ChapterIndex <= 0))
        {
            entry.ChapterIndex = Chapters
                .Where(c => c.Page.HasValue && entry.Page.HasValue && c.Page.Value <= entry.Page.Value)
                .OrderByDescending(c => c.Page)
                .FirstOrDefault()?.Index ?? Chapters.FirstOrDefault()?.Index ?? 0;
        }

        foreach (var group in Entries.GroupBy(e => new { e.CharacterId, e.ChapterIndex }))
        {
            var sequences = group.Select(e => e.Sequence).ToList();
            if (sequences.All(s => s > 0) && sequences.Distinct().Count() == sequences.Count)
                continue;

            var ordered = group
                .OrderBy(e => e.Page ?? double.MaxValue)
                .ThenBy(e => e.Sequence <= 0 ? int.MaxValue : e.Sequence)
                .ToList();

            for (var i = 0; i < ordered.Count; i++)
                ordered[i].Sequence = i + 1;
        }
    }
}

public class CharacterModel
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = "";
    public string Color { get; set; } = "#3b82f6";
}

public class ChapterModel
{
    public int Index { get; set; }
    public string Name { get; set; } = "";
    public double? Page { get; set; }
}

public class LocationPreset
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = "";
    public double X { get; set; }
    public double Y { get; set; }
}

public class MapEntry
{
    public string CharacterId { get; set; } = "";
    public int ChapterIndex { get; set; }
    public int Sequence { get; set; }
    public double? Page { get; set; }
    public string Location { get; set; } = "";
    public double X { get; set; }
    public double Y { get; set; }
    public string Note { get; set; } = "";
    public bool IsInvisible { get; set; } = false;
}
