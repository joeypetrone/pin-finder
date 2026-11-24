// Checks database.rules.json against the Realtime Database emulator.
// Run with: npm run test:rules   (needs Java for the emulator)
const NS = 'pin-finder-718c8';
const BASE = `http://${process.env.FIREBASE_DATABASE_EMULATOR_HOST || '127.0.0.1:9000'}`;

const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
const now = Math.floor(Date.now() / 1000);
// The emulator accepts unsigned ID tokens.
const token = (uid) => `${b64({ alg: 'none', typ: 'JWT' })}.${b64({
  sub: uid,
  user_id: uid,
  iat: now,
  exp: now + 3600,
  aud: 'pin-finder-718c8',
  iss: 'https://securetoken.google.com/pin-finder-718c8',
})}.`;

const req = async (method, path, { uid, query = '', body, admin } = {}) => {
  const params = new URLSearchParams({ ns: NS });
  if (uid) params.set('auth', token(uid));
  const url = `${BASE}/${path}.json?${params}${query ? `&${query}` : ''}`;
  const headers = admin ? { Authorization: 'Bearer owner' } : {};
  const res = await fetch(url, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return { status: res.status, data: await res.json().catch(() => null) };
};

let failures = 0;
const expect = async (name, want, promise) => {
  const r = await promise;
  const ok = want === 'ok' ? r.status === 200 : r.status === 401;
  if (!ok) failures += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}  (${r.status})`);
  return r;
};
const expectKeys = (name, r, keys) => {
  const got = Object.keys(r.data || {}).sort().join(',');
  const ok = got === keys.join(',');
  if (!ok) failures += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}  [${got}]`);
};

// Same query shape the app sends through axios.
const q = (field, val) => `orderBy=${encodeURIComponent(`"${field}"`)}&equalTo=${encodeURIComponent(`"${val}"`)}`;

await req('PUT', '', {
  admin: true,
  body: {
    properties: {
      pA: { name: 'Alice prop', uid: 'alice' },
      pA2: { name: 'Alice prop 2', uid: 'alice' },
      pB: { name: 'Bob prop', uid: 'bob' },
    },
    pins: {
      nA1: { name: 'a1', propertyId: 'pA', uid: 'alice' },
      nA2: { name: 'a2', propertyId: 'pA', uid: 'alice' },
      nA3: { name: 'a3', propertyId: 'pA2', uid: 'alice' },
      nB1: { name: 'b1', propertyId: 'pB', uid: 'bob' },
    },
    pinTypes: { t1: { title: 'Brass Disk' } },
  },
});

// properties
const list = await expect('alice lists own properties', 'ok', req('GET', 'properties', { uid: 'alice', query: q('uid', 'alice') }));
expectKeys('list holds only alice properties', list, ['pA', 'pA2']);
await expect('alice lists bob properties', 'deny', req('GET', 'properties', { uid: 'alice', query: q('uid', 'bob') }));
await expect('alice reads all properties', 'deny', req('GET', 'properties', { uid: 'alice' }));
await expect('anon lists properties', 'deny', req('GET', 'properties', { query: q('uid', 'alice') }));
await expect('alice reads own property', 'ok', req('GET', 'properties/pA', { uid: 'alice' }));
await expect('alice reads bob property', 'deny', req('GET', 'properties/pB', { uid: 'alice' }));
await expect('alice reads bob property field', 'deny', req('GET', 'properties/pB/name', { uid: 'alice' }));
await expect('alice creates property', 'ok', req('POST', 'properties', { uid: 'alice', body: { name: 'new', uid: 'alice' } }));
await expect('alice creates property as bob', 'deny', req('POST', 'properties', { uid: 'alice', body: { name: 'new', uid: 'bob' } }));
await expect('alice creates property without uid', 'deny', req('POST', 'properties', { uid: 'alice', body: { name: 'new' } }));
await expect('alice edits own property', 'ok', req('PUT', 'properties/pA', { uid: 'alice', body: { name: 'edited', uid: 'alice' } }));
await expect('alice gives property to bob', 'deny', req('PUT', 'properties/pA', { uid: 'alice', body: { name: 'edited', uid: 'bob' } }));
await expect('alice edits bob property', 'deny', req('PUT', 'properties/pB', { uid: 'alice', body: { name: 'hacked', uid: 'alice' } }));
await expect('alice deletes bob property', 'deny', req('DELETE', 'properties/pB', { uid: 'alice' }));
await expect('alice overwrites all properties', 'deny', req('PUT', 'properties', { uid: 'alice', body: {} }));

// pins
const pins = await expect('alice lists pins of own property', 'ok', req('GET', 'pins', { uid: 'alice', query: q('propertyId', 'pA') }));
expectKeys('pins list holds only pA pins', pins, ['nA1', 'nA2']);
await expect('alice lists pins of bob property', 'deny', req('GET', 'pins', { uid: 'alice', query: q('propertyId', 'pB') }));
await expect('alice lists pins of missing property', 'deny', req('GET', 'pins', { uid: 'alice', query: q('propertyId', 'nope') }));
await expect('alice lists pins by uid', 'deny', req('GET', 'pins', { uid: 'alice', query: q('uid', 'alice') }));
await expect('alice reads all pins', 'deny', req('GET', 'pins', { uid: 'alice' }));
await expect('alice reads own pin', 'ok', req('GET', 'pins/nA1', { uid: 'alice' }));
await expect('alice reads bob pin', 'deny', req('GET', 'pins/nB1', { uid: 'alice' }));
await expect('alice creates pin on own property', 'ok', req('POST', 'pins', { uid: 'alice', body: { name: 'n', propertyId: 'pA', uid: 'alice' } }));
await expect('alice creates pin on bob property', 'deny', req('POST', 'pins', { uid: 'alice', body: { name: 'n', propertyId: 'pB', uid: 'alice' } }));
await expect('alice creates pin as bob', 'deny', req('POST', 'pins', { uid: 'alice', body: { name: 'n', propertyId: 'pA', uid: 'bob' } }));
await expect('alice creates pin on missing property', 'deny', req('POST', 'pins', { uid: 'alice', body: { name: 'n', propertyId: 'nope', uid: 'alice' } }));
await expect('alice creates pin without propertyId', 'deny', req('POST', 'pins', { uid: 'alice', body: { name: 'n', uid: 'alice' } }));
await expect('alice edits own pin', 'ok', req('PUT', 'pins/nA1', { uid: 'alice', body: { name: 'e', propertyId: 'pA', uid: 'alice' } }));
await expect('alice moves pin to bob property', 'deny', req('PUT', 'pins/nA1', { uid: 'alice', body: { name: 'e', propertyId: 'pB', uid: 'alice' } }));
await expect('alice edits bob pin', 'deny', req('PUT', 'pins/nB1', { uid: 'alice', body: { name: 'e', propertyId: 'pA', uid: 'alice' } }));
await expect('alice deletes bob pin', 'deny', req('DELETE', 'pins/nB1', { uid: 'alice' }));
await expect('alice deletes own pin', 'ok', req('DELETE', 'pins/nA1', { uid: 'alice' }));

// pinTypes
await expect('alice reads pinTypes', 'ok', req('GET', 'pinTypes', { uid: 'alice' }));
await expect('anon reads pinTypes', 'deny', req('GET', 'pinTypes'));
await expect('alice writes pinTypes', 'deny', req('PUT', 'pinTypes/t2', { uid: 'alice', body: { title: 'x' } }));

// Home page delete flow: list the pins, delete them, then delete the property.
const homePins = await expect('home: list pins of pA', 'ok', req('GET', 'pins', { uid: 'alice', query: q('propertyId', 'pA') }));
for (const id of Object.keys(homePins.data || {})) {
  // eslint-disable-next-line no-await-in-loop
  await expect(`home: delete pin ${id}`, 'ok', req('DELETE', `pins/${id}`, { uid: 'alice' }));
}
await expect('home: delete property pA', 'ok', req('DELETE', 'properties/pA', { uid: 'alice' }));

// SingleProperty delete flow: delete the property, then the pins it already loaded.
await expect('single: delete property pA2', 'ok', req('DELETE', 'properties/pA2', { uid: 'alice' }));
await expect('single: delete pin nA3 after its property', 'ok', req('DELETE', 'pins/nA3', { uid: 'alice' }));

// everything else
await expect('alice reads root', 'deny', req('GET', '', { uid: 'alice' }));
await expect('alice writes outside known paths', 'deny', req('PUT', 'other', { uid: 'alice', body: 1 }));

console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
