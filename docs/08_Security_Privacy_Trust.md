08 — Security, Privacy & Trust Requirements

Security baseline for career documents, AI processing, authentication and automation.

CareerOS • Locked planning baseline • 27 September 2026

1. Sensitive data classes

Identity/contact information

Resume and employment history

Education/certificates

Career goals and preferences

Application history

Private project links

AI conversation/task history

OAuth tokens and integration credentials

2. Security requirements

Area

Requirement

Auth

Firebase Authentication; verify ID tokens server-side.

Authorization

Every FastAPI resource access checks user ownership/role.

Secrets

Provider keys only in server-side secret management.

Storage

Private buckets/objects by default; signed URLs for controlled access.

Database

Least-privilege DB credentials; migrations reviewed.

Logging

No raw resume text, tokens or personal secrets in ordinary logs.

AI

Do not send unnecessary fields to models; redact when practical.

External integrations

OAuth scopes limited to required actions.

Automation

Human approval for application submission/public posting.

Backups

Encrypted backups and documented restore procedure.

3. Trust rules

Never fabricate resume content.

Never claim an application was submitted unless the user or an authorized integration confirms it.

Never claim a listing is live without source verification metadata.

Never expose one user's profile or resume to another user.

Every AI-generated document must be traceable to a version and prompt/model run.

4. User controls

Export profile data.

Delete profile and documents.

Disconnect integrations.

Disable notifications.

Disable AI personalization where practical.

Review/delete saved applications and drafts.

See which evidence supports a recommendation.

5. Security testing

Dependency scanning

Secret scanning

API authorization tests

File upload validation

Prompt injection tests for untrusted job descriptions

SSRF protection for fetched URLs

Rate limiting

Abuse monitoring

Browser extension permission review

6. Prompt-injection defense

Job descriptions, web pages and uploaded documents are untrusted input. Treat instructions found inside them as data, not system instructions. The model must not execute arbitrary commands or reveal secrets based on document text.