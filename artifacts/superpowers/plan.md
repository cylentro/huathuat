# Brainstorm

## Goal
Improve the mobile UI of the Toto Generator, specifically focusing on the "Generate Now" action bar and the "ResultSet" cards, ensuring they are space-efficient, legible, and maintain a premium look on small screens.

## Constraints
- Must be 100% responsive for small mobile screens (320px+).
- Maintain existing functionality and the "Processed" state animations.
- Use Tailwind CSS v4.

## Options / Layout Refinement Concepts

### 1. "Generate Now" Action Bar (Mobile Refinement)
- **Problem**: The large horizontal pill might be too wide or clunky on mobile, forcing elements to stack poorly or take up too much vertical space.
- **Solution**: 
  - On mobile, switch from a wide horizontal layout to a more compact vertical stack or a condensed horizontal row.
  - Reduce padding and font sizes.
  - Potentially make the "GENERATE" button full-width on mobile to provide a better tap target.
  - Simplify the "Total Sets" label to just an icon or smaller text.

### 2. "ResultSet" Cards (Mobile Refinement)
- **Problem**: The balls might wrap awkwardly, or the card might be too tall. The "PROCESSED" stamp might overlay poorly.
- **Solution**:
  - Decrease the size of the `NumberBall` on mobile.
  - Use a tighter grid or flex-wrap for the numbers.
  - Simplify the margin and padding of the `ResultSet` card.
  - Ensure the "Processed" indicator (checkmark/circle) doesn't take up too much horizontal space.

## Acceptance Criteria
- "Generate Now" bar looks sleek and balanced on mobile devices.
- Result sets display numbers clearly without excessive wrapping or overflow.
- All interactive elements are easily tappable.

---

# Implementation Plan

1. **Step 1: Refine `ResultSet.tsx`**
   - Adjust `NumberBall` sizes specifically for the smallest screens.
   - Reduce padding in the `ResultSet` card on mobile.
   - Adjust the "PROCESSED" stamp size and rotation for better fit.

2. **Step 2: Refine "Generate Now" bar in `page.tsx`**
   - Update the sticky action bar container to use a more flexible flexbox layout.
   - Reduce the button size and padding for mobile.
   - Use `hidden sm:block` for non-essential labels to save space.

## Verification
- Use Chrome DevTools mobile emulator to check breakpoints (iPhone SE, iPhone 12 Pro, etc.).
- Verify tapping "GENERATE" and marking results as "Used" works flawlessly on mobile.
