interface OwnerCandidate {
  id: string;
  email?: string | null;
}

interface OwnerConfiguration {
  ownerUserId?: string | null | undefined;
  ownerEmail?: string | null | undefined;
}

export function isConfiguredOwner(
  user: OwnerCandidate,
  configuration: OwnerConfiguration
): boolean {
  const ownerUserId = configuration.ownerUserId?.trim();
  if (ownerUserId) return user.id === ownerUserId;

  const ownerEmail = configuration.ownerEmail?.trim().toLowerCase();
  if (!ownerEmail) return false;

  return user.email?.trim().toLowerCase() === ownerEmail;
}
