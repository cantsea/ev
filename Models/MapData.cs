namespace ev.Models;

public class MapData
{
    public int TotalPages { get; set; } = 1000;
    public List<CharacterModel> Characters { get; set; } = new();
    public List<MapEntry> Entries { get; set; } = new();
}

public class CharacterModel
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = "";
    public string Color { get; set; } = "#3b82f6";
}

public class MapEntry
{
    public string CharacterId { get; set; } = "";
    public int Page { get; set; }
    public double Progress { get; set; }
    public string Location { get; set; } = "";
    public double X { get; set; }
    public double Y { get; set; }
    public string Note { get; set; } = "";
}