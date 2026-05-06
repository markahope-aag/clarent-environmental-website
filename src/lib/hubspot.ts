import { Client as HubSpotClient } from "@hubspot/api-client";
import { FilterOperatorEnum } from "@hubspot/api-client/lib/codegen/crm/contacts/models/Filter";
import { env } from "@/lib/env";

function getClient() {
  if (!env.HUBSPOT_ACCESS_TOKEN) return null;
  return new HubSpotClient({ accessToken: env.HUBSPOT_ACCESS_TOKEN });
}

export interface LeadPayload {
  email: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  company?: string | undefined;
  phone?: string | undefined;
  state?: string | undefined;
  wasteType?: string | undefined;
  source?: string | undefined;
}

export async function upsertContact(lead: LeadPayload): Promise<void> {
  const client = getClient();
  if (!client) {
    console.warn("[hubspot] No access token — skipping upsert");
    return;
  }

  const properties: Record<string, string> = {
    email: lead.email,
    ...(lead.firstName && { firstname: lead.firstName }),
    ...(lead.lastName  && { lastname: lead.lastName }),
    ...(lead.company   && { company: lead.company }),
    ...(lead.phone     && { phone: lead.phone }),
    ...(lead.state     && { state: lead.state }),
    ...(lead.wasteType && { waste_type__c: lead.wasteType }),
    ...(lead.source    && { hs_latest_source: lead.source }),
  };

  try {
    await client.crm.contacts.basicApi.create({ properties, associations: [] });
  } catch (err: unknown) {
    // 409 = contact already exists — update instead
    const isConflict = (err as { code?: number }).code === 409;
    if (isConflict) {
      const existing = await client.crm.contacts.searchApi.doSearch({
        filterGroups: [{ filters: [{ propertyName: "email", operator: FilterOperatorEnum.Eq, value: lead.email }] }],
        properties: ["hs_object_id"],
        limit: 1,
        after: "0",
        sorts: [],
      });
      if (existing.results[0]) {
        await client.crm.contacts.basicApi.update(
          existing.results[0].id,
          { properties }
        );
      }
    } else {
      throw err;
    }
  }
}
