# Favicon Change Plan

Taks: Change the favicon to a thematic icon (HUAT HUAT theme).

## Proposed Changes
1. **Generate Icon**: Use `generate_image` to create a vibrant, modern, and lucky icon (e.g., a stylized gold coin or lucky pineapple).
2. **Apply Icon**: Overwrite `src/app/favicon.ico` with the new design.
3. **Verify**: Ensure the file is updated.

## Brainstorming
- **Theme**: "HUAT HUAT" (Prosperity, Luck).
- **Icon Idea**: A glowing, stylized 3D gold coin with the character "發" (Fa) or a golden pineapple.
- **Why**: Standard Next.js favicons are generic. A custom one enhances the premium feel.

## Verification
- Run `ls -l src/app/favicon.ico` to check the file size change.
- (Manual) User can refresh the page to see the new icon.
