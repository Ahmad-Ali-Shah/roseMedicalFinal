export const REVISION_POLICY_ITEMS = [
  "Publishing creates a new immutable revision.",
  "Previous revisions remain available.",
  "Rollback never edits or deletes old history.",
  "Rollback creates a new revision from restored values.",
  "Comparison shows only changed fields.",
  "Sensitive restoration requires future owner re-authentication."
] as const;

export const REVISION_SCHEMA_FIELDS = [
  "Record type",
  "Record identifier",
  "Changed fields",
  "Previous values",
  "Proposed values",
  "Save time",
  "Publish time",
  "Action",
  "Restored revision identifier",
  "Owner-session identifier"
] as const;
