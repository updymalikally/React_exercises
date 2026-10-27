import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const storagePath = resolve(projectRoot, process.env.DATA_FILE || './data/users.json');
let writeQueue = Promise.resolve();

async function readUsers() {
  try {
    const contents = await readFile(storagePath, 'utf8');
    const users = JSON.parse(contents);
    if (!Array.isArray(users)) throw new Error('User data must be a JSON array.');
    return users;
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

function updateUsers(mutator) {
  const operation = writeQueue.then(async () => {
    const users = await readUsers();
    const result = await mutator(users);
    await mkdir(dirname(storagePath), { recursive: true });
    const temporaryPath = `${storagePath}.${process.pid}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify(users, null, 2)}\n`, { mode: 0o600 });
    await rename(temporaryPath, storagePath);
    return result;
  });
  writeQueue = operation.catch(() => {});
  return operation;
}

export async function findUserByEmail(email) {
  const users = await readUsers();
  return users.find((user) => user.email === email) || null;
}

export async function findUserById(id) {
  const users = await readUsers();
  return users.find((user) => user.id === id) || null;
}

export function createUser(user) {
  return updateUsers((users) => {
    if (users.some((savedUser) => savedUser.email === user.email)) {
      const error = new Error('An account with this email already exists.');
      error.status = 409;
      throw error;
    }
    users.push(user);
    return user;
  });
}

export function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt };
}
