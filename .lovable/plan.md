# Publish Portfolio on Custom Domain

## Goal

Deploy the portfolio to the purchased custom domain `vibhormishra.dev` and hide the "Edit with Lovable" badge/watermark. and also commit and push this website on my github account in the repo name the repo My Portfolio

## Current State (verified)

- Project is **not published** yet.
- Effective publish visibility is **public**.
- Lovable badge is currently **visible**.

## Steps

### 1. Publish the site

- Run a security scan and, if clean, publish via `preview_ui--publish`.
- This creates the `.lovable.app` production URL and enables the custom-domain flow.

### 2. Connect the custom domain

- In **Project Settings → Project section → Domains** (or the Publish dialog → **Add custom domain**), add:
  - `vibhormishra.dev` (root)
  - `www.vibhormishra.dev` (subdomain)
- Follow Lovable's DNS instructions. For a non-Cloudflare registrar, add:
  - **A records** for `@` and `www` pointing to `185.158.133.1`
  - **TXT record** for `_lovable` with the verification value Lovable provides
- Wait for DNS propagation (up to 72 hours; often much faster).
- Set the primary domain so the other redirects to it.

### 3. Hide the Lovable badge

- Use `publish_settings--set_badge_visibility` with `hide_badge: true`.
- **Requirement:** this requires a **Pro plan or higher**.
- If the workspace is not on Pro, the badge cannot be hidden through this tool.

## Expected Outcome

- `vibhormishra.dev` serves the portfolio.
- No "Edit with Lovable" watermark is shown on the live site.

## Notes

- Frontend changes require clicking **Update** in the publish dialog to go live after the initial deploy.
- Backend/database changes deploy automatically.
- If the site shows a login wall after publish, verify effective publish visibility is still `public`.

## Approval Needed

Please confirm:

1. You want me to proceed with publishing now.
2. Your workspace is on a Pro plan (or higher) so I can hide the badge.
3. You will add the DNS records at your domain registrar, or you want step-by-step instructions only.
