import { UserSchemaValues } from '@/schemas/summary.schema';
import { PmsUser } from '@/types/pms';

/**
 * Adapter that converts UserSchemaValues to PmsUser
 */
export function adaptUserSchemaToPmsUser(userSchema: UserSchemaValues): PmsUser {
  return {
    name: userSchema.name,
    lastName: userSchema.lastName,
    email: userSchema.email,
    documentID: userSchema.documentNumber,
    documentType: userSchema.documentType,
    phone: userSchema.phone,
    country: userSchema.country,
    nationality: userSchema.nationality,
    gender: userSchema.gender,
    extraData: {
      socialMediaProfile: userSchema.socialMediaProfile,
    },
  };
}

/**
 * Adapter that converts UserSchemaValues with additional phone info to PmsUser
 */
export function adaptUserSchemaWithPhoneToPmsUser(
  userSchema: UserSchemaValues,
  nationalNumber: string
): PmsUser {
  return {
    name: userSchema.name,
    lastName: userSchema.lastName,
    email: userSchema.email,
    documentID: userSchema.documentNumber,
    documentType: userSchema.documentType,
    phone: nationalNumber,
    country: userSchema.country,
    nationality: userSchema.nationality,
    gender: userSchema.gender,
    extraData: {
      socialMediaProfile: userSchema.socialMediaProfile,
    },
  };
}
