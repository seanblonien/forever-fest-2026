/* eslint-disable @typescript-eslint/no-magic-numbers, functional/no-throw-statements -- Protocol sizes, status codes, and finite quota/time bounds are explicit policy constants. */
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { isIP } from 'node:net';
import { CHAT_ENDS_AT, ChatError } from './contracts';

export const COOKIE_NAME = 'forever-fest-chat';
const sign = (value: string, secret: string): string => createHmac('sha256', secret)
  .update(`cookie:v1:${value}`).digest('base64url');
export function resolveSession(cookie: string | null, secret: string, now: number, secure: boolean) {
  const candidate = cookie?.split(';').map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
  const pieces = candidate?.split('.') ?? [];
  const [id, issued, expiry, signature] = pieces;
  const payload = pieces.slice(0, 3).join('.');
  if (pieces.length === 4 && /^[A-Za-z0-9_-]{32}$/.test(id) &&
    /^\d+$/.test(issued) && /^\d+$/.test(expiry) && /^[A-Za-z0-9_-]{43}$/.test(signature)) {
    const expected = Buffer.from(sign(payload, secret));
    const actual = Buffer.from(signature);
    if (actual.length === expected.length && timingSafeEqual(actual, expected) &&
      Number(issued) <= now && Number(issued) < Number(expiry) &&
      Number(expiry) > now && Number(expiry) <= Date.parse(CHAT_ENDS_AT))
      return { id };
  }
  const newId = randomBytes(24).toString('base64url');
  const expires = Date.parse(CHAT_ENDS_AT);
  const newPayload = `${newId}.${now}.${expires}`;
  return {
    id: newId,
    cookie: `${COOKIE_NAME}=${newPayload}.${sign(newPayload, secret)}; HttpOnly; SameSite=Lax; Path=/; Expires=${new Date(expires).toUTCString()}${secure ? '; Secure' : ''}`,
  };
}
export function normalizeIP(address: string): string | undefined {
  if (!isIP(address))
    return undefined;
  if (isIP(address) === 4)
    return address;
  const normalized = new URL(`http://[${address}]/`).hostname.slice(1, -1);
  if (normalized.startsWith('::ffff:')) {
    const segments = normalized.slice(7).split(':');
    if (segments.length === 2) {
      const bytes = segments.flatMap((part) => [Math.floor(Number.parseInt(part, 16) / 256), Number.parseInt(part, 16) % 256]);
      return bytes.join('.');
    }
  }
  return normalized;
}
export function networkKey(request: Request, secret: string, day: string, deployed: boolean): string {
  const host = new URL(request.url).hostname;
  const local = !deployed && ['localhost', '127.0.0.1', '[::1]'].includes(host);
  const forwarded = deployed ? normalizeIP(request.headers.get('x-vercel-forwarded-for') ?? '') : undefined;
  const ip = local ? '127.0.0.1' : forwarded;
  if (!ip)
    throw new ChatError(503, 'unavailable');
  return createHmac('sha256', secret).update(`network:v1:${day}:${ip}`).digest('hex');
}
/* eslint-enable @typescript-eslint/no-magic-numbers, functional/no-throw-statements */
