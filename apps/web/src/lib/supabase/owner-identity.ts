export const TEMPORARY_OWNER_EMAIL = "ahmadaliofficial1155@gmail.com";

interface OwnerCandidate {
  id: string;
  email?: string | null;
}

interface OwnerConfiguration {
  ownerUserId?: string | null;
  ownerEmail?: string | null;
}

export function isConfiguredOwner(
  user: OwnerCandidate,
  configuration: OwnerConfiguration
): boolean {
  const ownerUserId = configuration.ownerUserId?.trim();
  if (ownerUserId) return user.id === ownerUserId;

  const ownerEmail = (configuration.ownerEmail || TEMPORARY_OWNER_EMAIL)
    .trim()
    .toLowerCase();
  return user.email?.trim().toLowerCase() === ownerEmail;
}
