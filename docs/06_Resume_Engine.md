06 — Resume Engine & Document Architecture

The exact design for Golden Profile, Golden Resume, templates, tailoring and exports.

CareerOS • Locked planning baseline • 27 September 2026

1. Separation of concerns

Layer

Responsibility

Career Profile

Canonical factual career data.

Evidence Graph

Proof and provenance for claims.

Golden Resume

User-approved master presentation/content selection.

Template

Visual/layout rules only.

Tailoring Plan

JD-specific proposed changes.

Resume Version

Approved snapshot for a role/opportunity.

Renderer

Turns structured content into PDF/DOCX.

2. Golden Profile

The Golden Profile is the long-term source of truth. It contains experiences, education, skills, projects, goals, links, evidence and preferences. It should not contain one-off JD-specific wording unless the user deliberately promotes it.

3. Golden Resume

The Golden Resume is a user-approved representation of the profile. It can be broader than a one-page application resume and can contain selectable blocks. Tailoring creates derived versions; it never overwrites the master.

4. Resume JSON example

{ "header": {...}, "summary": {...}, "experience": [...], "projects": [...], "skills": [...], "education": [...], "links": [...] }

5. Template system

Template IDs are versioned.

Templates define typography, spacing, colors, section layout, page rules and link styling.

Content is injected from Resume JSON.

Template changes do not mutate resume content.

Each exported document records template_version and renderer_version.

6. Import pipeline

Store original PDF/DOCX unchanged.

Extract text and metadata with PyMuPDF/python-docx.

Capture layout hints where available.

LLM maps extracted content to Resume JSON.

Show side-by-side extraction review.

User resolves ambiguous fields.

Create an imported Golden Resume only after approval.

7. Tailoring pipeline

Select target opportunity/JD.

Extract normalized requirements.

Retrieve relevant profile/evidence blocks.

Rank resume blocks for relevance.

Generate patch proposals.

Validate against evidence.

User accepts/rejects/edits.

Create immutable tailored Resume Version.

Render PDF/DOCX.

8. Formatting preservation

Do not ask the LLM to output final PDF markup. The LLM outputs structured content and patch instructions. HTML/CSS + Playwright controls final PDF layout. This gives reliable control over bold, italic, underline, hyperlinks, spacing, page breaks and section order within CareerOS-controlled templates.

9. Arbitrary uploaded PDF limitation

Pixel-perfect reconstruction of every arbitrary PDF is not guaranteed. CareerOS should offer 'Import and convert to editable CareerOS format'. Once converted to a CareerOS template, future tailoring becomes deterministic.

10. Resume QA

Check page count.

Check overflow/clipping.

Check broken links.

Check empty sections.

Check unsupported claims.

Check date consistency.

Check duplicate bullets.

Check font availability.

Render to image for automated visual regression.

Store export checksum and version metadata.