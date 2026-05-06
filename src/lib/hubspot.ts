import { Client } from "@hubspot/api-client";
import { FilterOperatorEnum } from "@hubspot/api-client/lib/codegen/crm/contacts/models/Filter";
import { requireEnv } from "@/lib/env";

let cachedClient: Client | null = null;

function getClient(): Client {
  if (!cachedClient) {
    cachedClient = new Client({ accessToken: requireEnv("HUBSPOT_ACCESS_TOKEN") });
  }
  return cachedClient;
}

export interface ContactInput {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  properties?: Record<string, string>;
}

export interface UpsertContactResult {
  id: string;
  created: boolean;
}

export async function upsertContact(input: ContactInput): Promise<UpsertContactResult> {
  const client = getClient();

  const properties: Record<string, string> = {
    email: input.email,
    ...(input.firstName ? { firstname: input.firstName } : {}),
    ...(input.lastName ? { lastname: input.lastName } : {}),
    ...(input.company ? { company: input.company } : {}),
    ...input.properties,
  };

  try {
    const created = await client.crm.contacts.basicApi.create({
      properties,
      associations: [],
    });
    return { id: created.id, created: true };
  } catch (error: unknown) {
    if (isConflictError(error)) {
      const existing = await findContactByEmail(input.email);
      if (!existing) {
        throw new Error(`HubSpot conflict for ${input.email} but contact not found`);
      }
      const updated = await client.crm.contacts.basicApi.update(existing.id, { properties });
      return { id: updated.id, created: false };
    }
    throw error;
  }
}

async function findContactByEmail(email: string): Promise<{ id: string } | null> {
  const client = getClient();
  const result = await client.crm.contacts.searchApi.doSearch({
    filterGroups: [
      {
        filters: [{ propertyName: "email", operator: FilterOperatorEnum.Eq, value: email }],
      },
    ],
    properties: ["email"],
    limit: 1,
    after: "0",
    sorts: [],
  });
  const first = result.results[0];
  return first ? { id: first.id } : null;
}

function isConflictError(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false;
  const code = (error as { code?: number }).code;
  return code === 409;
}
