# Brand Guidelines: Real-Time QR Code Attendance System Portfolio

## 1. Core Identity & Aesthetic
The portfolio merges high-end, editorial B2B SaaS aesthetics with a "Minimalist Y2K" undertone. It relies on stark contrast, extreme negative space (white), massive typography, and highly intentional pops of brand color to guide user action and attention.

## 2. Color Palette (The 60-30-10 Rule)
Based on UX/UI psychology and the 60-30-10 rule, this project strictly adheres to the following distribution:

- **60% Dominant Base (White / `#FFFFFF`)**: Used for the vast majority of backgrounds. It creates breathing room, emphasizes scale, and gives the project an ultra-premium, clean B2B feel.
- **30% Secondary (Brand Blue / `#3662E3`)**: Formally the accent color, this is now used as a heavy secondary structure. It is applied to primary call-to-actions, major structural UI elements, massive section banners, and bold typographic blocks to provide a strong, unified digital identity.
- **10% Core Accent (Y2K Green / `#A9D77D`)**: Used aggressively but extremely sparingly. Reserved **only** for massive success metrics, oversized editorial accents (like quotation marks), and distinct interactive pops where an organic, nostalgic break is needed from the blue/white structure.

**Complementary Accent Tokens:**
- **Y2K Sand (`#E0D6C2`)**: A soft, elegant beige used for subtle warm accents, secondary editorial background tints, or balanced complementary elements without invoking the harshness of a standard gray.

## 3. Typography
- **Headlines (Serif)**: Large, elegant serif fonts (`font-serif`, e.g., Playfair Display or equivalent) used for massive section headers (`text-6xl`, `text-8xl`). It communicates authority, trust, and high-fashion editorial design.
- **Body & Utilities (Sans & Mono)**: Clean sans-serif for readable body copy. Uppercase monospace (`font-mono tracking-widest text-xs`) for UI labels, tags, and structural numbering (e.g., `01 // THE PROBLEM`).

## 4. UI Elements: The Global Button System
To ensure a consistent ecosystem, every button across the platform must follow these exact structural guidelines:

### Primary CTA (Action-Oriented)
- **Shape**: Rounded rectangle with subtle curves (`rounded-xl` for large buttons, `rounded-lg` for smaller).
- **Background**: Solid Brand Blue (`bg-[#3662E3]`).
- **Text**: Pure White (`text-white`), bold or medium weight.
- **Padding**: Generous. Typically `px-8 py-4` for large CTAs.
- **Hover State**: 
  - Background darkens precisely to `#2A4DB8`.
  - No spatial movement or scaling (keep it grounded and structural).
- **Shadow**: Glowing brand drop shadow to emphasize priority (`shadow-xl shadow-[#3662E3]/20`).

### Secondary CTA (Alternative Action)
- **Shape**: Rounded rectangle with subtle curves (`rounded-xl` or `rounded-lg`).
- **Background**: Pure White (`bg-white`) or Transparent.
- **Text**: Near Black (`text-near-black`) or Brand Blue (`text-[#3662E3]`).
- **Border**: Thin 1px solid border (`border border-gray-200` or `border-[#3662E3]/20`).
- **Hover State**: 
  - Background shifts to ultra-light gray/blue (`hover:bg-gray-50` or `hover:bg-[#F0F4FF]`).
  - Text remains clear.

## 5. Visual Weight & Borders
- **Borders**: Avoid harsh structural borders. Instead, use thin `1px` lines (`bg-gray-100` or `border-white/50`) to frame content elegantly without boxing it in.
- **Shadows**: Only use shadows on elements meant to "float" above the white canvas (interactive widgets, primary CTA buttons). Use very soft, diffused shadows (`drop-shadow-2xl` for widgets, colored `/20` opacity shadows for buttons).
