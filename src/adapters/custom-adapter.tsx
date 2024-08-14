import { sql } from "@vercel/postgres";

interface AdapterUser {
  id: string;
  name?: string;
  email: string;
  image?: string;
}

interface AdapterAccount {
  userId: string;
  provider: string;
  providerAccountId: string;
  type: string;
  accessToken?: string;
  expiresAt?: string;
  refreshToken?: string;
  scope?: string;
  tokenType?: string;
  idToken?: string;
  sessionState?: string;
  oauthTokenSecret?: string;
  oauthToken?: string;
}

interface AdapterSession {
  id: string;
  sessionToken: string;
  userId: string;
  expires: string;
}

interface VerificationToken {
  identifier: string;
  token: string;
  expires: string;
}

export function PgCustomAdapter() {
  return {
    async createUser(user: { name?: string; email: string; image?: string }): Promise<AdapterUser | null> {
      try {
        const result = await sql`
          INSERT INTO public.users (name, email, image) 
          VALUES (${user.name}, ${user.email}, ${user.image}) 
          RETURNING id, name, email, image`;
        return result.rows[0] as AdapterUser || null;
      } catch (error) {
        console.error("Error creando usuario:", error);
        return null;
      }
    },

    async getUser(id: string): Promise<AdapterUser | null> {
      try {
        const result = await sql`
          SELECT id, name, email, image FROM public.users WHERE id = ${id}`;
        return result.rows[0] as AdapterUser || null;
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
        return null;
      }
    },

    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      try {
        const result = await sql`
          SELECT id, name, email, image FROM public.users WHERE email = ${email}`;
        return result.rows[0] as AdapterUser || null;
      } catch (error) {
        console.error("Error obteniendo usuario por email:", error);
        return null;
      }
    },

    async getUserByAccount({ providerAccountId, provider }: { providerAccountId: string; provider: string }): Promise<AdapterUser | null> {
      try {
        const result = await sql`
          SELECT users.id, users.name, users.email, users.image
          FROM public.users
          JOIN public.accounts ON users.id = accounts."userId"
          WHERE accounts."providerAccountId" = ${providerAccountId} AND accounts.provider = ${provider}`;
        return result.rows[0] as AdapterUser || null;
      } catch (error) {
        console.error("Error obteniendo usuario por cuenta:", error);
        return null;
      }
    },

    async updateUser(user: AdapterUser): Promise<AdapterUser | null> {
      try {
        const result = await sql`
          UPDATE public.users 
          SET name = ${user.name}, email = ${user.email}, image = ${user.image} 
          WHERE id = ${user.id} 
          RETURNING id, name, email, image`;
        return result.rows[0] as AdapterUser || null;
      } catch (error) {
        console.error("Error actualizando usuario:", error);
        return null;
      }
    },

    async deleteUser(userId: string): Promise<void> {
      try {
        await sql`
          DELETE FROM public.users WHERE id = ${userId}`;
      } catch (error) {
        console.error("Error eliminando usuario:", error);
      }
    },

    async linkAccount(account: AdapterAccount): Promise<void> {
      try {
        await sql`
          INSERT INTO public.accounts ("userId", provider, "providerAccountId", type, access_token, expires_at, refresh_token, scope, token_type, id_token, session_state)
          VALUES (${account.userId}, ${account.provider}, ${account.providerAccountId}, ${account.type}, ${account.accessToken}, ${account.expiresAt}, ${account.refreshToken}, ${account.scope}, ${account.tokenType}, ${account.idToken}, ${account.sessionState})`;
      } catch (error) {
        console.error("Error vinculando cuenta:", error);
      }
    },

    async unlinkAccount({ providerAccountId, provider }: { providerAccountId: string; provider: string }): Promise<void> {
      try {
        await sql`
          DELETE FROM public.accounts WHERE "providerAccountId" = ${providerAccountId} AND provider = ${provider}`;
      } catch (error) {
        console.error("Error desvinculando cuenta:", error);
      }
    },

    async createSession({ sessionToken, userId, expires }: { sessionToken: string; userId: string; expires: string }): Promise<AdapterSession | null> {
      try {
        const result = await sql`
          INSERT INTO public.sessions ("sessionToken", "userId", expires) 
          VALUES (${sessionToken}, ${userId}, ${expires}) 
          RETURNING id, "sessionToken", "userId", expires`;
        return result.rows[0] as AdapterSession || null;
      } catch (error) {
        console.error("Error creando sesión:", error);
        return null;
      }
    },

    async getSessionAndUser(sessionToken: string): Promise<{ session: AdapterSession | null; user: AdapterUser | null }> {
      try {
        const result = await sql`
          SELECT sessions.id AS session_id, sessions."sessionToken", sessions."userId", sessions.expires,
                 users.id AS userId, users.name, users.email, users.image
          FROM public.sessions AS sessions
          JOIN public.users AS users ON sessions."userId" = users.id
          WHERE sessions."sessionToken" = ${sessionToken}`;
        const row = result.rows[0];
	console.log(row)
        return {
          session: row ? { id: row.session_id, sessionToken: row.sessionToken, userId: row.userId, expires: row.expires } : null,
          user: row ? { id: row.userId, name: row.name, email: row.email, image: row.image } : null
        };
      } catch (error) {
        console.error("Error obteniendo sesión y usuario:", error);
        return { session: null, user: null };
      }
    },

    async updateSession({ sessionToken, expires }: { sessionToken: string; expires: string }): Promise<AdapterSession | null> {
      try {
        const result = await sql`
          UPDATE public.sessions 
          SET expires = ${expires} 
          WHERE "sessionToken" = ${sessionToken} 
          RETURNING id, "sessionToken", "userId", expires`;
        return result.rows[0] as AdapterSession || null;
      } catch (error) {
        console.error("Error actualizando sesión:", error);
        return null;
      }
    },

    async deleteSession(sessionToken: string): Promise<void> {
      try {
        await sql`
          DELETE FROM public.sessions WHERE "sessionToken" = ${sessionToken}`;
      } catch (error) {
        console.error("Error eliminando sesión:", error);
      }
    },

    async createVerificationToken({ identifier, expires, token }: VerificationToken): Promise<VerificationToken | null> {
      try {
        const result = await sql`
          INSERT INTO public.verification_tokens (identifier, token, expires) 
          VALUES (${identifier}, ${token}, ${expires}) 
          RETURNING identifier, token, expires`;
        return result.rows[0] as VerificationToken || null;
      } catch (error) {
        console.error("Error creando token de verificación:", error);
        return null;
      }
    },

    async useVerificationToken({ identifier, token }: { identifier: string; token: string }): Promise<VerificationToken | null> {
      try {
        const result = await sql`
          DELETE FROM public.verification_tokens 
          WHERE identifier = ${identifier} AND token = ${token} 
          RETURNING identifier, token, expires`;
        return result.rows[0] as VerificationToken || null;
      } catch (error) {
        console.error("Error usando token de verificación:", error);
        return null;
      }
    },
  };
}


