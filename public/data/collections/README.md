# Markdown Workout Collections

This project now supports markdown-based workout collections as a more compact and flexible alternative to JSON files.

## Simplified Format (Recommended)

The most efficient format embeds workouts directly in the description field:

```json
{
  "id": "quick-blast",
  "title": "Quick 5-Minute Blast",
  "description": "Perfect for when you only have 5 minutes to spare!\n\nBurpees|10\nPush-ups|20\nSquats|30\nPlank|60\nMountain Climbers|20"
}
```

### Benefits of Simplified Format

- **Minimal footprint**: No separate workouts array
- **Single source of truth**: Description contains everything
- **Easy migration**: Automatic conversion from legacy format
- **Flexible parsing**: Smart detection of workout vs description text

## Legacy JSON Format (Still Supported)

```json
{
  "id": "classic",
  "title": "Classic Mix",
  "description": "The original workout collection - a balanced mix to get you started!",
  "workouts": [
    "Simple & Sinister",
    "ABC x3",
    "AXE Snatch"
  ]
}
```

## Workout Syntax

### Plain Text Workouts
```
Workout Name
```
- Default multiplier: 1
- Auto-generates Google search URL

### Workouts with Multipliers
```
Workout Name|3
```
- Multiplier: 3
- Auto-generates Google search URL

### Markdown Links
```
[Workout Name](https://example.com/workout)
```
- Uses provided URL
- Default multiplier: 1

### Markdown Links with Multipliers
```
[Workout Name](https://example.com/workout)|5
```
- Uses provided URL
- Multiplier: 5

## Migration

Legacy collections are automatically converted to the simplified format using the `convertLegacyCollection()` function, which:

1. Extracts multipliers from workout names (e.g., "ABC x3" → "ABC x3|3")
2. Embeds workouts into the description field
3. Maintains backward compatibility

## Examples

### Simplified Collection
```json
{
  "id": "hiit",
  "title": "HIIT Workout",
  "description": "High-intensity interval training!\n\nBurpees|10\nMountain Climbers|20\nJump Squats|15\nPush-ups|25"
}
```

### With Custom Links
```json
{
  "id": "strength",
  "title": "Strength Training",
  "description": "Build muscle and strength!\n\n[Deadlift](https://stronglifts.com/deadlift)|5\n[Bench Press](https://stronglifts.com/bench-press)|5\n[Squats](https://stronglifts.com/squat)|5"
}
```

## Parsing

The system automatically detects the format and parses workouts accordingly:

- **Simplified format**: Parses workouts from description field
- **Legacy format**: Uses workouts array, with fallback to description parsing
- **Markdown files**: Supports frontmatter and embedded workouts

All parsing includes comprehensive debugging output for troubleshooting.
