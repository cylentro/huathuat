# Favicon Change Plan (SVG Edition)

Task: Change the favicon to a thematic SVG icon (Fa or Pineapple).

## Proposed Changes
1. **Design SVG**: Create a premium SVG icon featuring the "發" (Fa) character with a vibrant red and gold color palette.
2. **Implementation**: 
    - Save the SVG as `src/app/icon.svg`. This is the modern Next.js way to handle SVG icons.
    - Delete the old `src/app/favicon.ico` to avoid conflicts.
3. **Verify**: Check the browser or run a local dev server to see the change.

## Brainstorming
- **Design**: A circle with a red gradient background, a golden border, and the character "發" in the center in a bold, modern font style.
- **Alternative**: A minimalist pineapple icon with geometric patterns.
- **Preference**: The "發" character is very iconic for "HUAT" (prosperity).

## Verification
- File exists: `src/app/icon.svg`
- File removed: `src/app/favicon.ico`
