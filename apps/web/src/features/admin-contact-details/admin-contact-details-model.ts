import { CONTACT_INFORMATION } from "@/features/contact-preview/contact-information-model";
import {
  CONTACT_IMPACT_ROWS,
  getUnresolvedContactCount
} from "@/features/admin-governance-source";

export interface AdminContactDetailsModel {
  rows: typeof CONTACT_INFORMATION;
  impacts: typeof CONTACT_IMPACT_ROWS;
  unresolvedCount: number;
}

export function getAdminContactDetailsModel(): AdminContactDetailsModel {
  return {
    rows: CONTACT_INFORMATION,
    impacts: CONTACT_IMPACT_ROWS,
    unresolvedCount: getUnresolvedContactCount()
  };
}
