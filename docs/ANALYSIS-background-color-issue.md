# 🐛 Analysis: Background Color Not Changing

**Issue**: When scrolling to About section, background colors don't appear to change visually.

**Date**: October 2, 2025  
**Status**: Root cause identified

---

## 🔍 Problem Analysis

### **What's Happening:**

The JavaScript IS updating the CSS variables correctly, BUT the visual change is **not visible** to the user.

### **Root Cause Identified:**

There are **TWO LAYERS** fighting each other:

```
Layer 1 (Bottom): body { background: $body-bg-gradient }
                  ↓ JavaScript changes this to CSS variables
                  ✅ This DOES change (but you can't see it)

Layer 2 (Top):    body::before { background: $body-radial-blue, $body-radial-purple }
                  ↓ This is FIXED and never changes
                  ❌ These STATIC glows cover the gradient below
```

### **Visual Representation:**

```
┌─────────────────────────────────────────┐
│  body::before (z-index: -1)             │
│  FIXED GLOWS:                           │
│  - Blue glow at top-left (static)       │ ← PROBLEM: These never change!
│  - Purple glow at bottom-right (static) │ ← They cover the gradient
│  ─────────────────────────────────────  │
│                                         │
│  body { background }                    │
│  GRADIENT (changes with JS)             │ ← Hidden by glows above
│                                         │
└─────────────────────────────────────────┘
```

---

## 📊 Code Evidence

### **Current Implementation:**

**File**: `style/base/_base.scss`

```scss
body {
  --color-start: 245, 247, 251;  // ✅ CSS variables defined
  --color-mid: 236, 252, 255;
  --color-end: 241, 245, 255;
  --glow-color: 37, 99, 235;
  
  background: $body-bg-gradient;  // ✅ Gradient here (changes by JS)
}

body::before {
  content: "";
  position: fixed;
  background: $body-radial-blue, $body-radial-purple;  // ❌ STATIC (never changes)
  //           ↑ These are SCSS variables, not CSS custom properties
  //           ↑ They compile to fixed colors at build time
  z-index: -1;
  opacity: 1;  // ❌ 100% opacity = completely covers gradient below
}
```

### **Why It Doesn't Work:**

1. **SCSS Variables vs CSS Variables**
   ```scss
   // SCSS variable (static, compiled at build)
   $body-radial-blue: radial-gradient(...)  // ❌ Can't change at runtime
   
   // CSS variable (dynamic, can change at runtime)
   --glow-color: 37, 99, 235  // ✅ Can change with JavaScript
   ```

2. **Z-Index Layering**
   - `body::before` has `z-index: -1`
   - It sits ON TOP of the body background
   - At 100% opacity, it completely blocks the gradient below

3. **JavaScript Only Changes Body Background**
   ```javascript
   document.body.style.background = `linear-gradient(...)` // Changes this
   // But body::before glow is still on top covering it!
   ```

---

## 🔧 The Fix (3 Options)

### **Option 1: Update body::before to Use CSS Variables** (Recommended)

**Change**:
```scss
body::before {
  background: 
    radial-gradient(
      circle at 18% 16%, 
      rgba(var(--glow-color), 0.28) 0%,  // Use CSS variable
      rgba(var(--glow-color), 0) 62%
    ),
    radial-gradient(
      circle at 84% 88%, 
      rgba(var(--glow-color), 0.26) 0%,  // Use CSS variable
      rgba(var(--glow-color), 0) 60%
    );
  
  transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);  // Smooth transition
}
```

**Pros**: Glows change color to match theme  
**Cons**: None (best solution)

---

### **Option 2: Lower Opacity of body::before**

**Change**:
```scss
body::before {
  opacity: 0.6;  // Instead of 1.0
}
```

**Pros**: Gradient below shows through  
**Cons**: Glows become less visible, may look washed out

---

### **Option 3: Remove body::before Entirely**

**Change**: Delete the `body::before` block

**Pros**: Gradient changes are fully visible  
**Cons**: Lose the depth/glow effect

---

## 🎯 Recommended Solution

**Use Option 1**: Update `body::before` to use CSS custom properties

**Why**:
✅ Glows AND gradient both change color  
✅ Maintains the depth/layered effect  
✅ Most cohesive visual result  
✅ Matches the premium aesthetic you want

**Implementation**:
1. Update `_base.scss` to use `rgba(var(--glow-color), ...)` in body::before
2. Add transition property to body::before
3. JavaScript already updates --glow-color, so it will work automatically

---

## ✅ Verification Steps

After fix is applied, check:

1. **Hero Section**: Glows should be blue (original)
2. **Scroll to About**: Glows should change to purple
3. **Check Console**: Should see "Background → About theme"
4. **Visual Difference**: Background should shift from blue → purple tint
5. **Transition**: Should be smooth (1.2 seconds)

---

## 📝 Additional Notes

**Why You Couldn't See It Before:**

The JavaScript WAS working correctly:
- Intersection Observer: ✅ Detecting sections
- CSS Variables: ✅ Being updated
- Background gradient: ✅ Changing

BUT visually hidden by the fixed glow layer on top!

**This is a common issue** when layering backgrounds with pseudo-elements.

---

**End of Analysis**

